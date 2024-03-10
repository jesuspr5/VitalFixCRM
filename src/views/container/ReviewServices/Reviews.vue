<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="greenligth"
      icon="mdi-format-page-break"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("reviews.head") }}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Buscar"
        hide-details
        single-line
        style="max-width: 250px;"
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
              v-text="'mdi-check'"
            />
          </v-btn>
          <!--<v-btn
            :key="3"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteorders(item)"
          >
            <v-icon
              small
              v-text="'mdi-delete'"
            />
          </v-btn>-->
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
            Estas seguro que deseas eliminar esta orden?
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
      idblog: '',
      headers: [
        {
          text: i18n.t('reviews.id'),
          value: 'id',
        },

        {
          text: i18n.t('reviews.type'),
          value: 'type',
        },
        {
          text: i18n.t('reviews.amount'),
          value: 'amount',
        },
        {
          text: i18n.t('reviews.status'),
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
          type: 'Mantenimiento',
          amount: '50',
          status: 'Pendiente',

        },

        {

          id: '2',
          type: 'Reparacion',
          amount: '50',
          status: 'Completada',

        },

        {

          id: '3',
          type: 'Reparacion',
          amount: '50',
          status: 'En revision',

        },
      ],
      search: undefined,

    }),
    methods: {
      create () {
        this.$router.push({
          name: 'Reviews',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      show (item) {
        console.log(item)
        this.$router.push({
          name: 'ReviewsForm',
          params: {
            option: 2, // option 2 to show
            reviewsData: item,
          },
        })
      },
      deleteequips (item) {
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