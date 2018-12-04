module.exports = {
  siteMetadata: {
    title: 'When To Chat',
    subtitle: 'Reconcile time zone differences, so that chatting is easy',
    email: "contact@nathanwillson.com"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        short_name: 'starter',
        start_url: '/',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
     {
             resolve: `gatsby-plugin-google-analytics`,
       options: {
         trackingId: "UA-130460716-1",
         anonymize: true,
       },
     },
  ],
}
