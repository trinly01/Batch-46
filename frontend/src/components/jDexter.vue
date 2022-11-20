<template>
  <h1>
    Hello I am {{ prop.name }}
  </h1>
</template>

<script setup>
const prop = defineProps({
  name: {
    type: String
  }
})
</script>
