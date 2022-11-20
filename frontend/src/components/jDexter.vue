<template>
  <h6>
    Hello I am {{ prop.name }}
    <q-btn color="primary" label="eat" @click="eat" />
  </h6>
  Child {{ favoritFood }}
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ateFood', 'newFavorite'])

function eat () {
  if (favoritFood.value.length) {
    emit('ateFood', favoritFood.value[0])

    console.log('ateFood', favoritFood.value[0])

    favoritFood.value.splice(0, 1)
  }
}

const prop = defineProps({
  name: {
    type: String,
    default: '<no name>'
  },
  foods: {
    type: Array,
    default: () => ([])
  }
})

const favoritFood = ref([...prop.foods])
</script>
