const theme = {}

const adeptColors = {
  adeptLochmara5: ['#0878BD'],
  adeptBlue: ['#003B83'],
  adeptDepSea1: ['#008B6E'],
  adeptTropicalRainForest1: ['#005F43'],
  adeptSilverChalice: ['#999999'],
  adeptSalomie: ['#FFDC80'],
}

theme.palette = {
  warning: [
    '#faad14', // 0: Warning
  ],
  success: [
    '#52c41a', // 0: Success
  ],
  error: [
    '#f5222d', // 0: Error
  ],
  grayscale: [
    '#bababa', // 0: GreyShade
    '#c1c1c1', // 1: GreyDark
    '#D8D8D8', // 2: Grey
    '#f1f1f1', // 3: GreyAlt
    '#F3F3F3', // 4: GreyLight
    '#fafafa', // 5: DarkWhite
    '#F9F9F9', // 6: DarkerWhite
    '#fcfcfc', // 7: #fff Darken 1%
    '#eeeeee', // 8:
    '#fbfbfb', // 9:
    '#f5f5f5', // 10:
    '#f7f8f9', // 11: today-highlight-bg
  ],

  ...adeptColors,
}

theme.fonts = {
  primary: 'Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
}

export default theme
