<script setup lang="ts">
type Party = {
  id: string,
  description: string,
  name: string,
  imageURL: string
}
const props = defineProps<{
  event: Party
}>()
</script>

<template>
  <div class="card" >
    <div class="card-img-wrapper">
      <img class="card-img" :src="props.event.imageURL" />
    </div>
    <div class="text-wrapper">
      <h3 class="card-title">{{props.event.name}}</h3>
      <p class="card-desc">{{props.event.description}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  text-align: left;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
}
.card-img-wrapper {
  position: relative;
  padding-bottom: 77%;
  overflow: hidden;
}
.card-img {
  position: absolute;
  left: -100%;
  right: -100%;
  height: 100%;
  margin: auto;
  overflow: hidden;
}
.text-wrapper {
  padding: 0 5px;
}
.card-title {
  margin: 0;
  padding: 5px 0;
  font-size: 16px;
}
.card-desc {
  margin: 0;
  padding: 5px 0;
  font-size: 14px;
}
</style>