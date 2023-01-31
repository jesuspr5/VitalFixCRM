<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="greenligth"
      icon="mdi-feature-search-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("investigation.head") }}
        </div>
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
            @click="showInvestigation(item)"
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
            @click="editInvestigation(item)"
          >
            <v-icon
              x-small
              v-text="'mdi-pencil'"
            />
          </v-btn>
          <v-btn
            :key="3"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteinvestigation(item)"
          >
            <v-icon
              small
              v-text="'mdi-delete'"
            />
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialogDelete"
        persistent
        max-width="500px"
      >
        <v-card>
          <v-card-title
            class="text-h5"
          >
            Estas seguro que deseas eliminar esta Investigación?
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
            @click="createInvestigation"
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
  import {
    investigationGetList,
    deleteinvestigation,
  } from '../../../api/modules/investigation'

  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      dialogDelete: false,
      id: null,
      headers: [
        {
          text: i18n.t('investigation.title'),
          value: 'title',
        },

        {
          text: 'Fecha',
          value: 'datePublication',
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
        result = await investigationGetList(1, 34)
        this.items = result
      },

      createInvestigation () {
        console.log('create I')
        this.$router.push({
          name: 'InvestigationForm',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showInvestigation (item) {
        console.log(item)
        this.$router.push({
          name: 'InvestigationForm',
          params: {
            option: 2, // option 2 to show
            invesData: item,
          },
        })
      },
      editInvestigation (item) {
        console.log(item)
        this.$router.push({
          name: 'InvestigationForm',
          params: {
            option: 3, // option 3 to edit
            invesData: item,
          },
        })
      },
      deleteinvestigation (item) {
        this.id = item.idResearchLanding
        this.dialogDelete = true
      },
      closeDelete () {
        this.dialogDelete = false
      },
      async deleteItemConfirm () {
        let result
        result = await deleteinvestigation(this.id)
        if (result === 'Transacción exitosa.') {
          this.snackbar = true
          this.message = 'Eliminación exitosa'
          this.data()
          this.dialogDelete = false
          setTimeout(() => {
            this.$router.push({ name: 'Investigation' })
          }, 2000)
        } else {
          this.snackbar = true
          this.message = 'Hubo un error durante la eliminación'
          setTimeout(() => {
            this.snackbar = false
          }, 1000)
        }
      },
    },
  }
</script>
