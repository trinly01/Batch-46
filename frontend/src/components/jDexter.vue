<template>
  <h6 class="q-gutter-sm">
    Hello I am {{ prop.name }}
    <q-btn color="primary" label="eat" @click="eat" />
    <q-btn icon="remove" @click="updateAge('decrease')" /> {{ age }}  <q-btn icon="add" @click="updateAge('increase')" />
  </h6>
  Child {{ favoritFood }}
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ateFood', 'newFavorite', 'update:modelValue'])

const updateAge = (type) => {
  const newAge = type === 'decrease' ? age.value - 1 : age.value + 1
  age.value = newAge
  emit('update:modelValue', newAge)
}

function eat () {
  if (favoritFood.value.length) {
    emit('ateFood', favoritFood.value[0])

    console.log('ateFood', favoritFood.value[0])

    favoritFood.value.splice(0, 1)
  }
}

const prop = defineProps({
  modelValue: null,
  name: {
    type: String,
    default: '<no name>'
  },
  foods: {
    type: Array,
    default: () => ([])
  }
})

const age = ref(prop.modelValue)

const favoritFood = ref([...prop.foods])
</script>
