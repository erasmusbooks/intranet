module.exports = {
  plugins: [
    require("postcss-import"),
    // require('postcss-nested'),
    require("postcss-cssnext")({ features: { customProperties: false } }),
    require("cssnano"),
    require("postcss-banner")({
      banner:
        "Theme Name: Nausikaä \nTheme URI: http://mibdw.club/nausikaa \nAuthor: MIBDW \n Author URI: http://turbo.church"
    })
  ]
};
