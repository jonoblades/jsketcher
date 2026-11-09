import * as ActionHelpers from './actionHelpers'
import {AiOutlineExport} from "react-icons/ai";

export default [
  {
    id: 'EditFace',
    appearance: {
      materialIcons: ['file-picture-o'],
      label: 'sketch',
      icon96: 'img/cad/face-edit96.png',
      info: 'open sketcher for a face/plane',
    },
    listens: ctx => ctx.streams.selection.face,
    update: ActionHelpers.checkForSelectedFaces(1),
    invoke: ({services}) => services.sketcher.sketchFace(services.selection.face.single)
  },

  {
    id: 'ReassignSketch',
    appearance: {
      materialIcons: ['share'],
      label: 'reassign sketch',
      icon96: 'img/cad/face-edit96.png',
      info: 'open sketcher for a face/plane',
    },
    listens: ctx => ctx.streams.selection.face,
    update: ActionHelpers.checkForSelectedFaces(1),
    invoke: ctx => ctx.services.sketcher.reassignSketchMode.enter(ctx.services.selection.face.single.id)
  },

  {
    id: 'Save',
    appearance: {
      materialIcons: ['floppy-o'],
      label: 'save',
      info: 'save project to storage',
    },
    invoke: (context) => context.projectService.save()
  },

  {
    id: 'StlExport',
    appearance: {
      materialIcons: ['upload', 'flip-vertical'],
      label: 'STL Export',
      info: 'export model to STL file',
    },
    invoke: (context) => context.services.export.stlAscii()
  },
  
  {
    id: 'ImagePngExport',
    appearance: {
      materialIcons: ['image'],
      label: 'PNG Export',
      info: 'export model as png image/render a snapshot',
    },
    invoke: (context) => context.services.export.imagePng()
  },

  {
    id: 'NativeFormatExport',
    appearance: {
      materialIcons: ['book'],
      label: 'Download Project',
      info: 'export model and its sketches as a json bundle',
    },
    invoke: (context) => context.services.export.nativeFormat()
  },

  {
    id: 'NativeFormatImport',
    appearance: {
      materialIcons: ['download', 'flip-vertical'],
      label: 'Import Project',
      info: 'empty current project and import replacing with native format json(model and its sketches)',
    },
    invoke: (context) => context.services.projectManager.importProject()
  },
  
  {
    id: 'NativeFormatImportAs',
    appearance: {
      materialIcons: ['download', 'flip-vertical'],
      label: 'Import Project as...',
      info: 'import native format json(model and its sketches) as a new project',
    },
    invoke: (context) => context.services.projectManager.importProjectAs()
  },

  {
    id: 'NewProject',
    appearance: {
      materialIcons: ['file-o'],
      label: 'New Project...',
      info: 'create new project and open in a new tab',
    },
    invoke: (context) => context.services.projectManager.newProject()
  },
  
  {
    id: 'CloneCurrentProject',
    appearance: {
      materialIcons: ['copy'],
      label: 'Clone Project...',
      info: 'clone current project and open in a new tab',
    },
    invoke: (context) => context.services.projectManager.cloneProject(context.projectService.id)
  },

  {
    id: 'RefreshSketches',
    appearance: {
      materialIcons: ['refresh'],
      label: 'Refresh Sketches',
      info: 'refresh all visible sketches',
    },
    invoke: (context) => context.services.sketcher.updateAllSketches()
  },

  {
    id: 'DeselectAll',
    appearance: {
      materialIcons: ['square-o'],
      label: 'deselect all',
      info: 'deselect everything',
    },
    invoke: (context) => context.services.pickControl.deselectAll()
  },

  {
    id: 'ToggleCameraMode',
    appearance: {
      materialIcons: ['video-camera'],
      label: 'toggle camera',
      info: 'switch camera mode between perspective and orthographic',
    },
    invoke: context => {
      const viewer = context.services.viewer;
      viewer.toggleCamera();
      viewer.render();
    }
  },

  {
    id: 'Info',
    appearance: {
      materialIcons: ['info-circle'],
      label: 'info',
      info: 'opens help dialog',
    },
    invoke: (context) => context.services.help.showInfo()
  },

  {
    id: 'Donate',
    appearance: {
      materialIcons: ['paypal'],
      label: 'donate',
      info: 'open paypal donate page',
    },
    invoke: (context) => window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WADW7V7CC32CY&lc=US&item_name=web%2dcad%2eorg&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted', '_blank')
  },

  {
    id: 'GitHub',
    appearance: {
      materialIcons: ['github'],
      label: 'GitHub',
      info: 'open GitHub project page',
    },
    invoke: (context) => window.open('https://github.com/xibyte/jsketcher', '_blank')
  },

  {
    id: 'ShowSketches',
    type: 'binary',
    property: 'showSketches',
    appearance: {
      materialIcons: ['image'],
      label: 'show sketches',
      info: 'toggle whether to show sketches on a solid face'
    }
  },
  {
    id: 'noIcon',
    appearance: {
      label: 'no icon'
    }
  },

  {
    id: 'ExportFaceToDXF',
    appearance: {
      icon: AiOutlineExport,
      label: 'export face DXF',
      info: 'export a selected face to a DXF file',
    },
    listens: ctx => ctx.streams.selection.face,
    update: ActionHelpers.checkForSelectedFaces(1),
    invoke: ({services}) => services.sketcher.exportFaceToDXF(services.selection.face.single)
  },
]

