<template>
  <router-view />
</template>

<script>
  import Events from './events/event'
  export default {
    name: 'App',

    created () {
      Events.forEach(item => {
        this.$on(item.name, item.callback)
      })
      window.getApp = this
    },
  }
</script>
