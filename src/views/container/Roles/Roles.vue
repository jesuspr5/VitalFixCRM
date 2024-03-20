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
          {{ $t("roles.title") }}
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
            @click="deleteservice(item)"
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
            Estas seguro que deseas eliminar este servicio?
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
            color="primary"
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
  export default {
    name: 'DashboardDataTables',
    data: () => ({
      dialogDelete: false,
      snackbar: false,
      message: '',
      hidden: false,
      headers: [
        {
          text: i18n.t('roles.id'),
          value: 'id',
        },
        {
          text: i18n.t('roles.name'),
          value: 'name',
        },

        {
          text: i18n.t('roles.status'),
          value: 'status',
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'actions',
        },
      ],
      items: [
        // agrega aqui json para llenar las tablas

        {
          id: '1',
          name: 'Administrador',
          status: 'Activo',

        },

        {

          id: '2',
          name: 'Cliente',
          status: 'Activo',

        },
      ],
      search: undefined,

    }),
    methods:
      {
        create () {
          this.$router.push({
            name: 'RolesForm',
            params: {
              option: 1, // option 1 to create
            },
          })
        },
        show (item) {
          this.$router.push({
            name: 'RolesForm',
            params: {
              option: 2, // option 2 to show
              roleData: item,
            },
          })
        },

        edit (item) {
          this.$router.push({
            name: 'RolesForm',
            params: {
              option: 3, // option 3 to edit
              roleData: item,
            },
          })
        },
        deleteservice (item) {
          // hay que pasar un id
          this.dialogDelete = true
        },
        closeDelete () {
          this.dialogDelete = false
        },

        deleteItemConfirm () {
          this.dialogDelete = false
        },
      },
  }
  </script>

  <style>

  </style>