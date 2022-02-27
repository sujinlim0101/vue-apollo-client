### server

서버를 구성하기 위해서 이 강의에서는 아래 graphql-server 레포지토리를 다운로드하고 `npm install` 하여 사용할것을 말한다. `npm run apollo` 해서 [http://localhost:4000/graphql](http://localhost:4000/graphql) 로 서버를 띄운다.

### client

필요한 패키지들을 설치해줍니다.

`npm install graphql@15 graphql-tag @apollo/client @vue/apollo-composable`

이 패키지들이 뭔지 살펴봅시다.

- `graphql` - GraphQL 쿼리 언어에 대한 JavaScript reference implementation입니다.
- `graphql-tag` - template literal인데, Graphql 쿼리 문장들을 “parse”하도록 돕습니다. 이것은 웹팩 로더를 포함하고 있습니다.
- `@apollo/client` -  Graphql을 위한 Apollo 클라이언트는 Grapqhl 서버에게 리퀘스트를 보내고, 로딩과 캐시, 결과를 받는다.
- `@vue/apollo-composable` - Vue Composition API에서 apollo client를 쓰기위해서 설치하는 패키지이다.

### **main.js**

```jsx
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
```

`createHttpLink`를 사용하면, 우리는 GrapqhQL API를 연결할수 있습니다. 우리 케이스의 경우엔 [http://localhost:4000/graphql](http://localhost:4000/graphql) 이겠죠.

`cache`는 Apollo Client cache인데, 쿼리를 하고 저장도 하는 곳입니다.

### ****Adding Apollo to the Vue app****

**main.js 파일에서,** DefaultApolloClient를 VueApollo에서 가져옵니다. 이것은 VueApollo helper인데, Apollo client 인스턴스를 뷰 애플리케이션에 제공하는 기능을 합니다.

```jsx
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
```

### ****Improving Developer Experience****

우선 `vue.config.js` 에서, webpack configuration을 추가하면:

## **For Vite apps**

먼저 필요한 플러그인은 rollup plugin입니다. 

```
npm install @rollup/plugin-graphql@1
```

rollup plugin이 Vite와 호환가능하기 때문에, Vite plugin으로써 씁니다..

이 새로운 plugin을 쓰기 위해, 우리는 `vite.config.js` 를 수정해야합니다. 플러그인을 가져오고, 플러그인 배열에 넣어줍니다.

📃 **vite.config.js**

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'// ADD
export default defineConfig({
  plugins: [
    vue(),
    graphql()// ADD
  ]
})

```

그럼 이제 Vite를 위한 세팅이 끝났습니다.

📃 **vue.config.js**

```jsx
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
}
```

### ****Extracting the query to its own file****

grapqhl폴더를 만들어두고, allBooks.query.gql 파일을 만들어보면 다음과 같다.

📃  **graphql/allBooks.query.gql**

```
query AllBooks {
  allBooks {
    id
    title
    rating
  }
}
```

📃  **App.vue**

```
import { useQuery } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'

export default {
  name: 'App',
  setup() {
    const { result } = useQuery(ALL_BOOKS_QUERY)

    return { result }
  },
}
```

### ****Code Highlighting and Autocompletion****

코드가 하이라이트되고, auto completion 되면 더 좋다. [Apollo GraphQL for Visual Studio code](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
 or [JS GraphQL plugin for WebStorm](https://plugins.jetbrains.com/plugin/8097-js-graphql/) 를 설치하면 된다.

plugin의 풀 파워를 이용하기 위해서, `apollo.config.js`를 VSCode를 위해서 작성해주자. WebStorm은 `.graphqlconfig`이다.

📃  **apollo.config.js**

```jsx
// VSCode
module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      // URL to the GraphQL API
      url: 'http://localhost:4000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.gql'],
  },
}
```

📃  **.graphqlconfi**

```
// WebStorm
{
  "name": "My GraphQL Schema",
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "My GraphQL Endpoint": {
        "url": "http://localhost:3000/api/graphql",
        "introspect": true
      }
    }
  }
}
```

그럼 이제 GraphQL file validation 이 가능하다.

### ****Browser Developer Tools for Easier Debugging****

![3.1640889453418.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a1ab3de-6aa3-4263-9b1b-ae9ba29d6371/3.1640889453418.jpg)

Firefox와 Chrome에서 사용가능한 Apollo DevTools를 설치하자. 설치한 이후부터는 브라우저에서 애플리케이션을 돌릴떄, Apollo라는 탭이 더 생겨보일것이다. playground에서 쿼리를 런할수도 있고, 캐시까지 가져올수 있다.

### ****Query variables, handling loading and errors****

```jsx
query AllBooks($search: String) {
  allBooks(search: $search) { # now search is dynamic, accepting an external value
    id
    title
    rating
  }
}
```

### ****Adding search to the application****

📃  **App.vue**

```jsx
 setup() {
    const { result } = useQuery(ALL_BOOKS_QUERY, { search: 'the' })

    return { result }
  },

```

### ****Making it interactive****

search에 대한 값을 ref를 만들어주고, search argument를 펑션으로 만들어주고, 리턴으로 오브젝트를 variable로써 만들어줍니다.

```jsx
const { result } = useQuery(ALL_BOOKS_QUERY, () => ({ search: searchTerm.value }))
```

### ****Handling loading state****

📃  **App.vue**

```jsx
const { result, loading } = useQuery(ALL_BOOKS_QUERY, () => ({
  search: searchTerm.value,
}))

return { result, searchTerm, loading }
```

```jsx
<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <template v-else>
      <p v-for="book in result.allBooks" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

```

전에 전송했던 같은 쿼리를 날리면, 캐시때문에 로딩 상태가 안보인다.

### ****Debouncing a query****

운이 좋게도, Apollo에서는 우리는 다른 라이브러리를 쓰지않고도 디바운스를 사용할수 있습니다.

📃 **App.vue**

```jsx
// App.vue
const { result, loading, error } = useQuery(
// query string
  ALL_BOOKS_QUERY,
// query variables
() => ({
    search: searchTerm.value,
  }),
// query options() => ({
    debounce: 500,
  })
)
```

### ****Disabling a query****

📃 **App.vue**

```jsx
setup() {
  const searchTerm = ref('')
  const { result, loading, error } = useQuery(
    ALL_BOOKS_QUERY,
    () => ({
      search: searchTerm.value,
    }),
    () => ({
      debounce: 500,
			// 두글자 이상일 때 검사
      enabled: searchTerm.value.length > 2,
    })
  )

  return { result, searchTerm, loading, error }
},
```

### ****Extracting the query result****

가끔은, default value로 쿼리 결과를 갖는게 좋을수 있습니다. undefined가 나올때 에러가 발생할수 있으니까요.

결과가 없는경우 빈 배열을 줍니다.

📃  **App.vue**

```
import { useQuery, useResult } from '@vue/apollo-composable'

export default {
  setup() {
    const searchTerm = ref('')
    const { result, loading, error } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      () => ({
        debounce: 500,
        enabled: searchTerm.value.length > 2,
      })
    )

    const books = useResult(result, [], data => data.allBooks)

    return { books, searchTerm, loading, error }
  },
}
```

---

[https://github.com/Code-Pop/graphql-client](https://github.com/Code-Pop/graphql-client)

[https://github.com/Code-Pop/graphql-server](https://github.com/Code-Pop/graphql-server)