const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')


const adeptColors = {
  adeptLochmara5: ['#0878BD'],
  adeptBlue: ['#003B83'],
  adeptDepSea1: ['#008B6E'],
  adeptTropicalRainForest1: ['#005F43'],
  adeptSilverChalice: ['#999999'],
  adeptSalomie: ['#FFDC80'],
}

const definedColors = {
  menuBg: '#14293D',
  menuItemLevel1Active: 'rgba(0, 0, 0, 0.3)',
}

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  )

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': adeptColors.adeptLochmara5,
      '@layout-sider-background': definedColors.menuBg,
      '@menu-dark-bg': definedColors.menuBg,
      '@menu-item-active-bg': definedColors.menuItemLevel1Active,
      '@menu-dark-item-active-bg': definedColors.menuItemLevel1Active,
      '@menu-dark-item-selected-bg': definedColors.menuItemLevel1Active,
    },
    javascriptEnabled: true,
  })(config, env)

  return config
}
