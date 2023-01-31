<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      icon="mdi-account-group"
      color="greenligth"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <!-- <v-img
          :src="logo"
          class="img-Logo"
        > -->

        <div class="display-2 font-weight-light">
          {{ $t("users.title") }}
        </div>
        <!-- </v-img> -->

        <!-- <v-img :src="logo" class="img-Logo"></v-img> -->
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Buscar"
        hide-details
        single-line
        style="max-width: 250px"
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
  import i18n from '@/i18n'
  import userjson from './user.json'
  import { usersGetList } from '../../../api/modules/user'
  import logo from '../../../assets/logoHumedal.png'
  // import ico from "../../../assets/logohumedal.ico"
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      title: userjson.title,
      users: [],
      logo,
      //    ico,
      headers: [
        {
          text: i18n.t('users.name'),
          value: 'names',
        },
        {
          text: 'apellidos',
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
    }),
    async mounted () {
      this.data()
    },
    methods: {
      data: async function () {
        let result
        result = await usersGetList()
        this.items = result
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
    },
  }
</script>
<style scoped>
.img-Logo {
  width: 20vw;
  height: 10vh;
  display: flex;
  justify-items: flex-end;
  /* background-image: url("../../../assets/logoHumedal.png"); */
}
</style>
