<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      icon="mdi-coffee-maker"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("kitchens.kitchen-show") }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus harum
      recusandae repellat repudiandae possimus nihil iusto eligendi, ut sed
      earum.
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({}),
    computed: {},
    created () {},
  }
</script>

<style></style>
