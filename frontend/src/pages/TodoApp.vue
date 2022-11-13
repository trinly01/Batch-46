<template>
  <q-toolbar class="bg-teal text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch {{ batch }} {{ task }}</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <div class="row">
    <q-input class="col" outlined v-model="task" label="Task" @keyup.enter="add" />
    <q-btn label="add" @click="add" />
  </div>
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(todo, i) in data.todos" :key="todo._id">
      <q-item-section avatar>
        <q-checkbox color="teal" v-model="todo.isDone" />
      </q-item-section>
      <q-item-section>{{ i }} {{ todo.task }}</q-item-section>
      <q-item-section side>
        <q-btn icon="delete" round dense color="red" @click="remove(i)" />
      </q-item-section>
    </q-item>
  </q-list>
  <div class="q-pa-lg">
    {{ itemsLeft }} item{{ itemsLeft !== 1 ? 's' : '' }} left
  </div>
</template>

<style>
.header {
  color: pink;
}
</style>

<script setup>

import { ref, reactive, computed } from 'vue'

const task = ref('hello world')

const data = reactive({
  something: 'valuable',
  num: 123,
  todos: [
    {
      _id: 1,
      isDone: false,
      task: 'Create add button'
    },
    {
      _id: 2,
      isDone: false,
      task: 'Create add button'
    }
  ]
})

const itemsLeft = computed(() => data.todos.filter(t => !t.isDone).length)

const batch = 46

const remove = (i) => data.todos.splice(i, 1)

function add () {
  console.log('task', task.value)

  console.log('todos', data.todos)

  data.todos.push({
    _id: Date.now(),
    isDone: false,
    task: task.value
  })

  task.value = ''

  console.log(sum(2, '2'))
}

const sum = (num, num2) => num + +num2

</script>
