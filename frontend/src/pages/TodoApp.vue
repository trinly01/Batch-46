<template>
  <q-toolbar class="bg-teal text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch 46</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <q-input outlined modelValue="text" label="Outlined" />
  <q-list bordered separator>
    <q-item clickable v-ripple >
      <q-item-section avatar>
        <q-checkbox color="teal" :modelValue="true" />
      </q-item-section>
      <q-item-section>Active</q-item-section>
      <q-item-section side>
        <q-btn icon="delete" round dense color="red" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple active-class="text-orange">
      <q-item-section avatar>
        <q-checkbox :modelValue="false" />
      </q-item-section>
      <q-item-section>Active, Active class</q-item-section>
      <q-item-section side>
        <q-btn icon="delete" round dense color="red" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple active-class="bg-teal-1 text-grey-8">
      <q-item-section avatar>
        <q-checkbox :modelValue="true" />
      </q-item-section>
      <q-item-section>Active, Active class</q-item-section>
      <q-item-section side>
        <q-btn icon="close" round dense color="red" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style>
.header {
  color: pink;
}
</style>
