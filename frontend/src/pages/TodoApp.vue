<template>
  <q-toolbar class="bg-teal text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch {{ batch }}</q-toolbar-title>

    <q-btn v-if="store.user" :label="store.user.email" @click="wingsApp.logout" flat dense icon="logout" />
    <q-btn v-else flat round dense icon="login" @click="login" />
    <q-btn flat round dense icon="print" @click="createPdf('print')" />
  </q-toolbar>
  <div class="row">
    <q-input class="col" outlined v-model="task" label="Task" @keyup.enter="add" />
    <q-btn label="add" @click="add" />
  </div>
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(todo, i) in filteredTodos" :key="todo._id">
      <q-item-section avatar>
        <q-checkbox color="teal" :modelValue="todo.isDone" @click="toggleStatus(todo)" />
      </q-item-section>
      <q-item-section>
        {{ i }} {{ todo.task }}
        <q-popup-edit v-model="todo.task" auto-save v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="updateTask(todo, scope.value, scope)" />
        </q-popup-edit>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="delete" round dense color="red" @click="remove(todo._id)" />
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
  <pie-chart :donut="true" :data="[['Active', itemsLeft], ['Completed', data.todos.length - itemsLeft]]"></pie-chart>
  Parent {{ foods }} age {{ age }}
  <j-dexter :name="'John'" :foods="foods" @ateFood="anoKinainNiya" v-model="age" />
</template>

<style>
.header {
  color: pink;
}
</style>

<script setup>

import pdfMake from 'src/libs/pdfmake'

import { ref, reactive, computed } from 'vue'
import jDexter from 'src/components/jDexter.vue'

import wingsApp from 'src/libs/wings4.js'

import store from 'src/store/store.js'

const login = () => {
  wingsApp.authenticate({
    email: 'trin@pogi.com',
    password: 'gwaping',
    strategy: 'local'
  })

  // console.log('user', user)
}

const createPdf = (mode) => {
  const dd = {
    content: [
      {
        style: 'tableExample',
        table: {
          body: [
            ['Task', 'isDone'],
            // ['One value goes here', true],
            // ['One value goes here', true],
            ...data.todos.map(todo => [todo.task, todo.isDone])
          ]
        }
      }
    ]
  }
  pdfMake.createPdf(dd)[mode]()
}

function anoKinainNiya (data) {
  console.log('kinain', data)

  const index = foods.value.findIndex(food => food === data)
  foods.value.splice(index, 1)
}

const age = ref(3)

const foods = ref(['adobo', 'burger', 'pancit'])

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

const todosSrvc = wingsApp.wingsService('todos')

todosSrvc.on('dataChange', todos => {
  console.log('changed', todos)
  data.todos = [...todos]
})

todosSrvc.init()

const itemsLeft = computed(() => data.todos.filter(t => !t.isDone).length)

const batch = 46

function toggleStatus (todo) {
  console.log('toggled')
  todosSrvc.patch(todo._id, {
    isDone: !todo.isDone
  })
}

const remove = async (i) => await todosSrvc.remove(i)

async function updateTask (todo, update, scope) {
  await todosSrvc.patch(todo._id, {
    task: update
  })
  scope.cancel()
  console.log('scope', scope)
}

async function add () {
  console.log('task', task.value)

  console.log('todos', data.todos)

  // data.todos.unshift({
  //   _id: Date.now(),
  //   isDone: false,
  //   task: task.value
  // })

  await todosSrvc.create({
    isDone: false,
    task: task.value
  })

  task.value = ''

  console.log(sum(2, '2'))
}

const sum = (num, num2) => num + +num2

</script>
