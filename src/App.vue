<script setup lang="ts">
import { provide, ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import SaerchContent from './components/SearchContent.vue'

const searchString = ref<string>()
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
  <SaerchContent />
  <router-view />
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
