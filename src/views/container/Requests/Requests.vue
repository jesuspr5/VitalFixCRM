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
          {{ $t("requests.head") }}
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
        :sort-by="['id', 'titulo']"
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
            @click="show(item)"
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
            @click="edit(item)"
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
            @click="deleterequests(item)"
          >
            <v-icon
              small
              v-text="'mdi-delete'"
            />
          </v-btn>
        </template>
      </v-data-table>

      <div class="text-center">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="#75B768"
        >
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-dialog
        v-model="dialogDelete"
        persistent
        max-width="500px"
      >
        <v-card>
          <v-card-title
            class="text-h5"
          >
            Estas seguro que deseas eliminar este Blog?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

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
            @click="create"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

  <script>
  import i18n from '@/i18n'
  import { getlistRequest, deleterequests } from '../../../api/modules/requests'
  export default {
    name: 'DashboardDataTables',
    data: () => ({
      dialogDelete: false,
      snackbar: false,
      message: '',
      hidden: false,
      idblog: '',
      headers: [
        {
          text: i18n.t('requests.id'),
          value: 'id',
        },
        {
          text: i18n.t('requests.detailsEquip'),
          value: 'detailsEquip',
        },
        {
          text: i18n.t('requests.manufacturer'),
          value: 'manufacturer',
        },
        {
          text: i18n.t('requests.description'),
          value: 'description',
        },
        {
          text: i18n.t('requests.Name'),
          value: 'names',
        },
        {
          text: i18n.t('requests.lastName'),
          value: 'lastNames',
        },
        {
          text: i18n.t('requests.email'),
          value: 'email',
        },
        {
          text: i18n.t('requests.phone'),
          value: 'phone',
        },
        {
          text: i18n.t('requests.address'),
          value: 'address',
        },
        {
          text: i18n.t('requests.references'),
          value: 'references',
        },
        {
          sortable: false,
          text: 'Acciones',
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
        result = await getlistRequest()
        this.items = result
        console.log('EL STOREE: ', result)
      // console.log('array',this.items)
      },
      create () {
        this.$router.push({
          name: 'RequestsForm',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      show (item) {
        console.log(item)
        this.$router.push({
          name: 'RequestsForm',
          params: {
            option: 2, // option 2 to show
            requestsData: item,
          },
        })
      },
      edit (item) {
        console.log(item)
        this.$router.push({
          name: 'RequestsForm',
          params: {
            option: 3, // option 3 to edit
            requestsData: item,
          },
        })
      },
      deleterequests (item) {
        // hay que pasar un id
        this.dialogDelete = true
      },
      closeDelete () {
        this.dialogDelete = false
      },

      deleteRequestConfirm () {
        this.dialogDelete = false
      },
      async deleteRequestConfirm () {
        let result
        result = await deleterequests(this.idord)
        console.log("🚀 ~ deleteRequestConfirm ~ result:", result)
        if (result === 'OK') {
          this.snackbar = true
          this.message = 'Eliminación exitosa'
          this.data()
          this.dialogDelete = false
          setTimeout(() => {
            this.$router.push({ name: 'Request' })
          }, 1000)
        } else {
          this.snackbar = true
          this.message = 'ocurrio un error al eliminar la solicitud'
          setTimeout(() => {
            this.snackbar = false
          }, 1000)
        }
      },
    },

  }
  </script>

  <style>

  </style>