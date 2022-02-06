<script setup lang="ts">
import { computed } from 'vue'
import useUniqueId from '../composables/useUniqueId'
const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue']);

const val = computed({
  get () {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val);
  }
})


const uuid = useUniqueId().getID()
</script>

<template>
  <label
    class="base-input-label"
    v-if="props.label"
    :for="uuid"
  >
    {{ label }}
  </label>
  <input
    :id="uuid"
    v-model="val"
    v-bind="{...$attrs}"
    class="base-input"
    type="text"
  />
</template>

<style lang="scss" scoped>
.base-input-label {
  display: block;
  margin: 0.3rem;
  font-size: 0.8rem;
  color: #2e2e2e;
}
.base-input {
  display: block;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  color: gray;
  font-size: 1rem;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
}
</style>