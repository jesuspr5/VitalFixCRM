<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ title }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        :label="searchLabel"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn

            :key="1"
            color="blue"
            fab
            class="px-1 ml-1"
            x-small
            @click="showUser(item)"
          >
            <v-icon
              small
              v-text="'mdi-eye'"
            />
          </v-btn>
          <v-btn

            :key="2"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="editUser(item)"
          >
            <v-icon
              small
              v-text="'mdi-pencil'"
            />
          </v-btn>
          <v-btn

            :key="3"
            color="secondary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteUser(item)"
          >
            <v-icon
              small
              v-text="'mdi-delete'"
            />
          </v-btn>
        </template>
      </v-data-table>
      <v-card-text style="height: 100px; position: relative">
        <v-fab-transition>
          <v-btn
            fab
            dark
            large
            color="primary"
            fixed
            right
            bottom
            @click="createUser"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getUsers } from '@/api/modules'
  import i18n from '@/i18n'
  import userjson from './user.json'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      title: userjson.title,
      headers: [
        {
          text: i18n.t('users.id'),
          value: 'person.id',
        },
        {
          text: i18n.t('users.name'),
          value: 'person.fullname',
        },
        {
          text: i18n.t('users.email'),
          value: 'person.email',
        },
        {
          text: i18n.t('users.phone'),
          value: 'person.phone_number',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [
        {
          person: {
            id: 1,
            fullname: 'algo',
            email: 'este@gmail.com',
            phone_number: '2323232323',
          },
        },
        {
          person: {
            id: 1,
            fullname: 'algo',
            email: 'este@gmail.com',
            phone_number: '2323232323',
          },
        },
      ],
      search: undefined,
      searchLabel: 'undefined',
    }),
    async mounted () {
      // window.getApp.$emit("SHOW_ERROR", "34534535")
    },
    methods: {
      async loadUsersData () {
        console.log('mounted')
        let serviceResponse = await getUsers()
        if (serviceResponse.ok === 1) {
          console.log(serviceResponse)
          this.items = serviceResponse.data
        } else {
          console.log(serviceResponse)
          const params = { text: serviceResponse.message.text }
          window.getApp.$emit('SHOW_ERROR', params)
        }
      },
      createUser () {
        console.log('create')
        this.$router.push({
          name: 'UsersFrom',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showUser (item) {
        console.log(item)
        this.$router.push({
          name: 'UsersFrom',
          params: {
            option: 2, // option 2 to show
            userData: item,
          },
        })
      },
      editUser (item) {
        console.log(item)
        this.$router.push({
          name: 'UsersFrom',
          params: {
            option: 3, // option 3 to edit
            userData: item,
          },
        })
      },
      deleteUser (item) {
        console.log(item)
        console.log('Delete')
      },
    },
  }
</script>
