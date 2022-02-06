module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      // URL to the GraphQL API
      url: 'https://f6fbs7vegjfc7gfzx2dwvav5hi.appsync-api.us-west-2.amazonaws.com/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.gql'],
  },
}