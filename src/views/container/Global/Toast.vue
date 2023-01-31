<template>
  <base-material-snackbar
    v-model="snackbar"
    :type="color"
    v-bind="{
      center: true,
      top: true
    }"
  >
    Welcome to
    <span class="font-weight-bold">&nbsp;MATERIAL DASHBOARD PRO&nbsp;</span> — a
    beautiful admin panel for every web developer.
  </base-material-snackbar>
</template>
<script>
  export default {
    name: 'Toast',

    data: () => ({
      color: 'info',
      snackbar: false,
    }),

    computed: {},

    methods: {
      open () {
        this.snackbar = true
      },
    },
  }
</script>
