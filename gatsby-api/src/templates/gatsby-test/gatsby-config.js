require("dotenv").config({
  path: `.env`,
})

module.exports = {
  // assetPrefix: `http://localhost:5000/api/v1/getWebsite`,
  // pathPrefix: `api/v1/sampleTest`,
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "GatsbyTest",
  },
  plugins: [`gatsby-plugin-sass`, `gatsby-plugin-react-helmet`],
};
