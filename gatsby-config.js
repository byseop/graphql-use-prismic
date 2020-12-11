require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `OMNIOUS HOMEPAGE`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    {
      //  prismic 연동 플러그인
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'toyproject',
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => page => `/${page.uid}`,
        schemas: {
          home: require('./src/schemas/home.json')
        }
      }
    },
    {
      // 다국어 홈페이지 구성 플러그인
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en-us',
        langKeyForNull: 'en-us',
        // prefixDefault: false
        useLangKeyLayout: false
      }
    },
    `gatsby-plugin-layout` // 레이아웃 적용 플러그인
  ]
};
