<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="greenligth"
      icon="mdi-file-chart-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("publications.head") }}
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
            @click="showPublications(item)"
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
            @click="editPublications(item)"
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
            @click="deletepublications(item)"
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
            Estas seguro que deseas eliminar esta Publicación?
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
            @click="createPublications"
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
    publicationsGetList,
    deletepublications,
  } from '../../../api/modules/publications'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      hidden: false,
      dialogDelete: false,
      id: null,
      headers: [
        {
          text: i18n.t('publications.title'),
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
        result = await publicationsGetList(1, 100)
        this.items = result
      },

      createPublications () {
        this.$router.push({
          name: 'PublicationsForm',
          params: {
            option: 1, // option 1 to create
          },
        })
      },
      showPublications (item) {
        this.$router.push({
          name: 'PublicationsForm',
          params: {
            option: 2, // option 2 to show
            publiData: item,
          },
        })
      },
      editPublications (item) {
        this.$router.push({
          name: 'PublicationsForm',
          params: {
            option: 3, // option 3 to edit
            publiData: item,
          },
        })
      },
      deletepublications (item) {
        this.id = item.idPublicationsLanding
        this.dialogDelete = true
      },
      closeDelete () {
        this.dialogDelete = false
      },
      async deleteItemConfirm () {
        let result
        result = await deletepublications(this.id)
        if (result === 'Transacción exitosa.') {
          this.snackbar = true
          this.message = 'Eliminación exitosa'
          this.data()
          this.dialogDelete = false
          setTimeout(() => {
            this.$router.push({ name: 'Publications' })
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
