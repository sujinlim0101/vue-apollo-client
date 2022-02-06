import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { setContext } from "@apollo/client/link/context";
import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'

const httpLink = createHttpLink({
  uri: 'https://f6fbs7vegjfc7gfzx2dwvav5hi.appsync-api.us-west-2.amazonaws.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = `da2-bxugsqjcozfxvcdkbyehuicwrq`
  return {
    headers: {
      ...headers,
      'X-api-key': token,
    }
  }
});


const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
app.mount('#app')
