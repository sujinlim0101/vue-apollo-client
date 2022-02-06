<script setup lang="ts">
import { inject } from 'vue'
const searchString = inject('searchString')
const updateSearchString = inject('updateSearchString')

</script>
<template>
  <nav class="global-header">
    <div>
      <router-link to="/">홈</router-link>
      <input
        class="global-search-input"
        :value="searchString"
        @input="updateSearchString($event.target.value)"
        placeholder="이벤트를 검색해보세요."
      >
    </div>
    <router-link to="/new-event">이벤트 추가</router-link>
  </nav>
</template>
<style lang="scss" scoped>
.global-header {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
}
.global-search-input {
  padding: 5px;
  margin-left: 1rem;
  border-radius: 3px;
  border: 1px solid #afadad;
}
</style>