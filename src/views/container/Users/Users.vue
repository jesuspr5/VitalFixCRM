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
         
        </template>
      </v-data-table>
     
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
    
      this.data()
    },
    methods: {
      data: async function(){
      let result;
      result = await usersGetList();
      this.items = result;
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
      }
    },
  }
</script>
