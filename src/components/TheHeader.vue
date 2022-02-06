<script setup lang="ts">
import { inject } from 'vue'
const searchString = inject('searchString')
const updateSearchString = inject('updateSearchString')

</script>
<template>
  <input
    class="global-search-input"
    :value="searchString"
    @input="updateSearchString($event.target.value)"
    placeholder="이벤트를 검색해보세요."
  >
</template>
<style lang="scss" scoped>
.global-search-input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #afadad;
}
</style>