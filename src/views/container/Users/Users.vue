<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="greenligth"
      icon="mdi-vuetify"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{$t("users.title")}}
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn

            :key="1"
            color="gray"
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
            color="four"
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
            color="primary"
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
            color="grenndark"
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
  import { usersGetList } from '../../../api/modules/user'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      title: userjson.title,
      users: [],
      headers: [
        // {
        //   text: i18n.t('users.id'),
        //   value: 'person.id',
        // },
        {
          text: i18n.t('users.name'),
          value: 'names',
        },
        {
          text: ('apellidos'),
          value: 'lastNames',
        },
        {
          text: i18n.t('users.email'),
          value: 'email',
        },
        {
          text: i18n.t('users.phone'),
          value: 'phone',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [],
      search: undefined,
      searchLabel: 'undefined',
    }),
    async mounted () {
      // console.log('cczxcsdc')
      // this.getUsersList()
    //  this.loadUsersData
      // window.getApp.$emit("SHOW_ERROR", "34534535")

      this.data()
    },
    methods: {
      data: async function(){
      let result;
      result = await usersGetList();
      this.items = result;
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
