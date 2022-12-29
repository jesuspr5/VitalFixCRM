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
          {{ $t('roles.title') }}
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
            @click="showRole(item)"
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
            @click="editRole(item)"
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
            @click="deleteRole(item)"
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
            @click="createRole"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getRoles } from '@/api/modules'
  import i18n from '@/i18n'

  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      headers: [
        {
          text: i18n.t('id'),
          value: 'role.id',
        },
        {
          text: i18n.t('roles.name'),
          value: 'role.name',
        },

        {
          text: i18n.t('roles.status'),
          value: 'role.status',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [
        {
          role: {
            id: 1,
            name: 'admin',
            status: 'Activo',
          },
        },
      ],
      search: undefined,
    }),
    async mounted () {
      // window.getApp.$emit("SHOW_ERROR", "34534535")
    },
    methods: {
      async loadRolesData () {
        console.log('mounted')
        let serviceResponse = await getRoles()
        if (serviceResponse.ok === 1) {
          console.log(serviceResponse)
          this.items = serviceResponse.data
        } else {
          console.log(serviceResponse)
          const params = { text: serviceResponse.message.text }
          window.getApp.$emit('SHOW_ERROR', params)
        }
      },
      createRole () {
        console.log('create')
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showRole (item) {
        console.log(item)
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 2, // option 2 to show
            roleData: item,
          },
        })
      },
      editRole (item) {
        console.log(item)
        this.$router.push({
          name: 'RolesFrom',
          params: {
            option: 3, // option 3 to edit
            roleData: item,
          },
        })
      },
      deleteRole (item) {
        console.log(item)
        console.log('Delete')
      },
    },
  }
</script>
