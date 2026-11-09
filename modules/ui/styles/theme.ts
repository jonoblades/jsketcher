interface Theme {

  huePrim: string;
  saturation: string;

  bgColor0: string;
  bgColor1: string;
  bgColor2: string;
  bgColor3: string;
  bgColor4: string;
  bgColor5: string;
  bgColor6: string;
  bgColor7: string;
  bgColor8: string;
  bgColor9: string;

  bgBaseColor: string;

  fontColorEmpph: string;
  fontColor: string;
  fontColorMinor: string;
  fontColorSuppressed: string;
  fontColorDisabled: string;

  borderColor: string;

  controlColorNumber: string;
  controlColorText: string;
  controlBg: string;

  workAreaColor: string;

  workAreaControlBarBgColor: string;
  workAreaControlBarBgColorActive: string;
  workAreaControlBarFontColor: string;

  colorDanger: string;
  colorAccent: string;

  colorNeutral: string;
  colorHighlight: string;

  colorBtnSelected: string;

  onColorHighlight: string;
  onColorHighlightVariantYellow: string;
  onColorHighlightVariantPink: string;
  onColorHighlightVariantRed: string;
  onColorHighlightVariantGreen: string;
  onColorHighlightVariantBlue: string;

}

const theme: Theme = {
  huePrim: '200',
  saturation: '6%',
  bgColor0: 'hsl(200, 6%, 7%)',
  bgColor1: 'hsl(200, 6%, 12%)',
  bgColor2: 'hsl(200, 6%, 17%)',
  bgColor3: 'hsl(200, 6%, 23%)',
  bgColor4: 'hsl(200, 6%, 28%)',
  bgColor5: 'hsl(200, 6%, 33%)',
  bgColor6: 'hsl(200, 6%, 38%)',
  bgColor7: 'hsl(200, 6%, 43%)',
  bgColor8: 'hsl(200, 6%, 48%)',
  bgColor9: 'hsl(200, 6%, 53%)',
  bgBaseColor: 'hsl(200, 6%, 12%)',
  fontColorEmpph: '#fff',
  fontColor: 'hsl(0, 0%, 90%)',
  fontColorMinor: 'hsl(0, 0%, 80%)',
  fontColorSuppressed: 'hsl(0, 0%, 65%)',
  fontColorDisabled: 'hsl(0, 0%, 55%)',
  borderColor: 'hsl(200, 6%, 38%)',
  controlColorNumber: '#2fa1d6',
  controlColorText: '#9cdaf7',
  controlBg: '#303030',
  workAreaColor: '#808080',
  workAreaControlBarBgColor: 'rgba(0, 0, 0, 0.5)',
  workAreaControlBarBgColorActive: '#555',
  workAreaControlBarFontColor: 'hsl(0, 0%, 80%)',
  colorDanger: '#b00',
  colorAccent: '#2B7D2B',
  colorNeutral: '#66727d',
  colorHighlight: '#003f5d',
  colorBtnSelected: '#285f7a',
  onColorHighlight: '#5A93BBFF',
  onColorHighlightVariantYellow: 'bisque',
  onColorHighlightVariantPink: 'hotpink',
  onColorHighlightVariantRed: 'tomato',
  onColorHighlightVariantGreen: 'springgreen',
  onColorHighlightVariantBlue: 'aquamarine'
};

export default theme;