<template>
  <q-toolbar class="bg-teal text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch {{ batch }}</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <div class="row">
    <q-input class="col" outlined v-model="task" label="Task" @keyup.enter="add" />
    <q-btn label="add" @click="add" />
  </div>
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(todo, i) in filteredTodos" :key="todo._id">
      <q-item-section avatar>
        <q-checkbox color="teal" v-model="todo.isDone" />
      </q-item-section>
      <q-item-section>
        {{ i }} {{ todo.task }}
        <q-popup-edit v-model="todo.task" auto-save v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="delete" round dense color="red" @click="remove(i)" />
      </q-item-section>
    </q-item>
  </q-list>
  <div class="q-pa-lg row">
    <div>
      {{ itemsLeft }} item{{ itemsLeft !== 1 ? 's' : '' }} left
    </div>
    <q-space/>
    <div>
      <q-btn-toggle
        dense
        size="sm"
        v-model="view"
        toggle-color="primary"
        flat
        :options="[
          {label: 'All', value: 'all'},
          {label: 'Active', value: 'active'},
          {label: 'Completed', value: 'completed'}
        ]"
      />
    </div>
    <q-space/>
    <q-btn flat dense size="sm">clear completed</q-btn>
  </div>
</template>

<style>
.header {
  color: pink;
}
</style>

<script setup>

import { ref, reactive, computed } from 'vue'

const task = ref('')

const view = ref('all')

const filteredTodos = computed(() => {
  switch (view.value) {
    case 'active':
      return data.todos.filter(t => !t.isDone)
    case 'completed':
      return data.todos.filter(t => t.isDone)
    default:
      return data.todos
  }
})

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

  data.todos.unshift({
    _id: Date.now(),
    isDone: false,
    task: task.value
  })

  task.value = ''

  console.log(sum(2, '2'))
}

const sum = (num, num2) => num + +num2

</script>
