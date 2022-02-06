<script setup lang="ts">
import GET_EVENT_QUERY from '../graphql/getEvent.query.gql'
import { useQuery, useResult } from '@vue/apollo-composable'
import { inject } from 'vue'
import EventCard from './card/EventCard.vue'

const props = defineProps<{
  events: object[]
}>()
const searchString = inject('searchString')

const { result } = useQuery(GET_EVENT_QUERY,
  () =>{
  return ({
    search: searchString.value,
  })}
)
</script>
<template>
  <ul class="cards-wrapper">
    <li v-for="event in props.events" :key="event.id " class="card-wrapper">
      <EventCard :event="event" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.cards-wrapper {
  display: flex;
  padding: 0;
}
.card-wrapper {
  list-style: none;
  padding: 0 10px;
  width: calc(100% / 3);
}
</style>