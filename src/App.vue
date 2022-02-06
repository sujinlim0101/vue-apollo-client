<script setup lang="ts">
import { provide, ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import SaerchContent from './components/SearchContent.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import GET_EVENT_QUERY from './graphql/getEvent.query.gql'

const searchString = ref<string>()
const { result } = useQuery(GET_EVENT_QUERY,
  () =>{
  return ({
    search: searchString.value,
  })}
)
const events = useResult(result, [], data => data.listEvents.items)
const updateSearchString = (newVal: string) => {
  searchString.value = newVal
}
provide('searchString', searchString)
provide('updateSearchString', updateSearchString)
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <TheHeader />
  <SaerchContent :events="events"/>
  <router-view />
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
