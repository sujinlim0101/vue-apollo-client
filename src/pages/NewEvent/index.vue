<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import CREATE_EVENT_QUERY from '../../graphql/createEvent.query.gql'
import { useMutation } from '@vue/apollo-composable'

const name = ref<string>()
const description = ref<string>()
const imageURL = ref<string>()
const when = ref<string>()
const where = ref<string>()
const { mutate:submit, onDone, loading, error } = useMutation(CREATE_EVENT_QUERY, () => ({
    variables: {
      name: name.value,
      description: description.value,
      when: when.value,
      imageURL: imageURL.value,
      where: where.value
    },
  }))
const submitForm = () => {
  submit()
}
</script>

<template>
<div class="new-event-wrapper">
  <form @submit.prevent="submitForm">
    <BaseInput v-model="name" label="이벤트 이름"/>
    <BaseInput v-model="description" label="description"/>
    <BaseInput v-model="imageURL" label="imageURL" />
    <BaseInput v-model="when" label="when" />
    <BaseInput v-model="where" label="where" />
    <button class="input-button" type="submit">제출</button>
  </form>
</div>
</template>
<style lang="scss" scoped>
.new-event-wrapper {
  max-width: 500px;
  padding: 1rem;
}
.input-button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  background: rgb(241, 164, 92);
  border: none;
  border-radius: 4px;
  color: white;
}
</style>