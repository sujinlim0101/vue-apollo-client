<script setup lang="ts">
import GET_EVENT_QUERY from '../graphql/getEvent.query.gql'
import { useQuery, useResult } from '@vue/apollo-composable'
import { inject } from 'vue'
import EventCard from './card/EventCard.vue'

const searchString = inject('searchString')

const { result } = useQuery(GET_EVENT_QUERY,
  () => ({
    search: searchString.value,
  })
)
const events = useResult(result, [], data => data.listEvents.items)
</script>
<template>
  <ul class="cards-wrapper">
    <li v-for="event in events" :key="event.id " class="card-wrapper">
      <EventCard :event="event" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.cards-wrapper {
  display: flex;
}
.card-wrapper {
  list-style: none;
  padding: 0 10px;
  width: 30%;
}
</style>