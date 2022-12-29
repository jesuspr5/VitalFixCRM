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
          {{ $t("kitchens.kitchens") }}
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

      <v-data-table
        :headers="headers"
        :items="person"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1 text-right"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            v-for="(action, i) in actions"
            :key="i"
            :color="action.color"
            class="ml-1 text-right"
            fab
            icon
            x-small
            @click="onHandlerAction(action.router)"
          >
            <v-icon
              small
              v-text="action.icon"
            />
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-btn
            :key="activeFab.icon"
            :color="activeFab.color"
            dark
            fab
            large
            bottom
            left
            class="v-btn--example"
            v-on="on"
          >
            <v-icon>{{ activeFab.icon }}</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <span>Add a new Kitchen</span>
    </v-tooltip>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      actions: [
        {
          color: 'info',
          icon: 'mdi-information-outline',
          router: 'kitchens-show',
        },
        {
          color: 'success',
          icon: 'mdi-pencil',
          router: 'kitchens-edit',
        },
        {
          color: 'error',
          icon: 'mdi-close',
        },
      ],
      headers: [
        // Por definir
        {
          text: 'id',
          value: 'id',
        },
        {
          text: 'name',
          value: 'fullname',
        },
        {
          text: 'email',
          value: 'email',
        },
        {
          text: 'phone',
          value: 'phone_number',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
          align: 'right',
        },
      ],
      person: [
        {
          id: '1111',
          fullname: 'Carlos',
          email: 'asdas',
          phone_number: '123123',
        },
        {
          id: '222',
          fullname: 'Vic',
          email: 'asdas',
          phone_number: '123123',
        },
      ],
      fab: null,
      hidden: false,
      tabs: 'one',
    }),
    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one':
            return { color: 'success', icon: 'mdi-plus' }
          case 'two':
            return { color: 'red', icon: 'edit' }
          case 'three':
            return { color: 'green', icon: 'keyboard_arrow_up' }
          default:
            return {}
        }
      },
    },
    created () {
      console.log(this.person)
    },
    methods: {
      onHandlerAction (router) {
        this.$router.push(router)
      },
    },
  }
</script>

<style>
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
