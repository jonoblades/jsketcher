import {ApplicationContext} from "cad/context";
import {OperationDescriptor} from "cad/craft/operationBundle";
import {LocalFileAdapter} from "ui/components/controls/FileControl";
import CadError from "utils/errors";
import {importStepFile} from "cad/craft/e0/interact";
import JSZip from "jszip/dist/jszip.min";

interface ImportModelParams {
  file: LocalFileAdapter;
}

function parseFreeCADXml(xml: string): Element[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  const parseError = document.getElementsByTagName('parsererror')[0];
  if (parseError) {
    throw new Error(`Invalid FreeCAD document XML: ${parseError.textContent}`);
  }

  const objectData = document.getElementsByTagName('ObjectData')[0];
  if (!objectData) {
    throw new Error('FreeCAD document XML does not contain ObjectData');
  }

  return Array.from(objectData.children).filter(element => element.tagName === 'Object');
}

export const ImportModelOperation: OperationDescriptor<ImportModelParams> = {
  id: 'IMPORT_MODEL',
  label: 'Import',
  icon: 'img/cad/import',
  info: 'Imports BREP, STEP, IGES or FCStd file',
  path:__dirname,
  paramsInfo: () => `()`,
  run: async (params: ImportModelParams, ctx: ApplicationContext) => {
    const occ = ctx.occService;
    const oci = occ.commandInterface;

    const returnObject = { created: [], consumed: [] };


    const FileName = params.file.fileName.toUpperCase();
    let rawContent = params.file.rawContent();

    if (FileName.endsWith("BRP") || FileName.endsWith("BREP")) {
      //FreeCAD some times omits this text from the top of BRP files
      //as part of the brp files stored in the .FCStf file archive format
      if (!rawContent.startsWith("DBRep_DrawableShape")) {
        rawContent = `DBRep_DrawableShape\n` + rawContent;
      }

      FS.writeFile("newBREPobject", rawContent);
      oci.readbrep("newBREPobject", "newBREPobject");
      returnObject.created.push(occ.io.getShell("newBREPobject"));
    } else if (FileName.endsWith("FCSTD")) {

      const zipContents = (await JSZip.loadAsync(params.file.base64Content(), { base64: true })).files;
      const xmlFreeCADData = await zipContents["Document.xml"].async("string");

      const objects = parseFreeCADXml(xmlFreeCADData);
      for (const object of objects) {
        const importBrepShapeName = object.querySelector('Part[file]')?.getAttribute('file');
        const isVisible = Array.from(object.getElementsByTagName('Property')).some(property =>
          property.getAttribute('name') === 'Visibility' && property.querySelector('Bool[value="true"]')
        );
        if (!importBrepShapeName || importBrepShapeName === 'PartShape.brp' || !isVisible) {
          continue;
        }

        try {
          const zipBrepContent = zipContents[importBrepShapeName];
          if (!zipBrepContent) {
            continue;
          }
          const zipContent = await zipBrepContent.async("string");
          FS.writeFile(importBrepShapeName, `DBRep_DrawableShape\n` + zipContent);
          oci.readbrep(importBrepShapeName, importBrepShapeName);
          returnObject.created.push(occ.io.getShell(importBrepShapeName));
        } catch (e) {
          console.warn(e)
        }
      }

    } else if (FileName.endsWith("STEP") || FileName.endsWith("STP")) {

      //step Import
      FS.writeFile("newStepFile", rawContent);
      importStepFile("newStepObject", "newStepFile", true);
      returnObject.created.push(occ.io.getShell("newStepObject"));

    } else if (FileName.endsWith("IGES") || FileName.endsWith("IGS")) {

      throw new CadError({
        kind: CadError.KIND.INVALID_INPUT,
        code: 'IGES is not supported yet'
      });

      // //IGES import
      // FS.writeFile("newIgesObject", rawContent);
      // oci.readbrep()igesread("newIgesObject", "newIgesObject");
      // returnObject.created.push(occ.io.getShell("newIgesObject"));

    } else {
      throw new CadError({
        kind: CadError.KIND.INVALID_INPUT,
        code: 'File type not supported at this time'
      });
    }

    return returnObject;
  },

  form: [
    {
      type: 'file',
      name: 'file',
      label: 'Select File',

    },
  ],
}
