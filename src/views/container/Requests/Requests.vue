<template>
  <v-container id="data-tables" tag="section">
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
        :items="filteredRequests"
        :search.sync="finalizada"
        :sort-by="['id', 'titulo']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            :key="2"
            color="four"
            fab
            class="px-1 ml-1"
            x-small
            @click="edit(item)"
          >
            <v-icon small v-text="'mdi-account'" />
          </v-btn>
          <!-- 
          <v-btn
            :key="1"
            color="gray"
            fab
            class="px-1 ml-1"
            x-small
            @click="show(item)"
          >
            <v-icon small v-text="'mdi-eye'" />
          </v-btn> -->
          <v-btn
            :key="4"
            color="blue"
            fab
            class="px-1 ml-1"
            x-small
            @click="viewRequest(item)"
          >
            <v-icon small v-text="'mdi-file-document'" />
          </v-btn>
          <!-- <v-btn
            :key="2"
            color="four"
            fab
            class="px-1 ml-1"
            x-small
            @click="edit(item)"
          >
            <v-icon small v-text="'mdi-check'" />
          </v-btn> -->
          <v-btn
            :key="3"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleterequests(item)"
          >
            <v-icon small v-text="'mdi-cancel'" />
          </v-btn>
        </template>
      </v-data-table>

      <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="timeout" color="#75B768">
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-dialog v-model="dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">
            Estas seguro que deseas cancelar esta solicitud?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeDelete">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-text style="height: 100px; position: relative">
        <v-fab-transition>
          <!-- <v-btn
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
          </v-btn> -->
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

  <script>
import i18n from "@/i18n";
import {
  getlistRequest,
  cancelRequest,
  asignarTecnico,
} from "../../../api/modules/requests";

export default {
  name: "DashboardDataTables",
  data: () => ({
    idReq: "",
    dialogDelete: false,
    snackbar: false,
    timeout: 0,
    message: "",
    hidden: false,
    idblog: "",
    headers: [
      {
        text: i18n.t("requests.email"),
        value: "email",
      },

      {
        text: "Direcciom",
        value: "address",
      },
      {
        text: i18n.t("requests.details"),
        value: "details",
      },
      {
        text: i18n.t("requests.service.name"),
        value: "service.name",
      },
      {
        text: i18n.t("requests.service.price"),
        value: "service.price",
      },
      {
        text: "status",
        value: "status",
      },

      {
        sortable: false,
        text: "Acciones",
        value: "actions",
      },
    ],
    items: [],
    search: undefined,
  }),
  async mounted() {
    this.data();
  },

  computed: {
    filteredRequests() {
      return this.items.filter((request) => request.status === "pendiente");
    },
  },
  methods: {
    data: async function () {
      let result;

      result = await getlistRequest();
      this.items = result.data;
      console.log("EL STOREE: ", result);
      // console.log('array',this.items)
    },

    show(item) {
      console.log(item);
      this.$router.push({
        name: "RequestsForm",
        params: {
          option: 2, // option 2 to show
          requestsData: item,
        },
      });
    },
    asignarTecnico(item) {
      console.log(item);
      this.$router.push({
        name: "RequestsForm",
        params: {
          option: 3, // option 2 to show
          requestsData: item,
        },
      });
    },

    edit(item) {
      this.$router.push({
        name: "RequestsForm",
        params: {
          option: 3, // option 3 to edit
          requestsData: item,
        },
      });
    },

    viewRequest(item) {
      this.$router.push({
        name: "DetailsService",
        params: {
          option: 4,
          requestsData: item, // Assuming item has a request object with an id
        },
      });
    },

    deleterequests(item) {
      this.idReq = item.id;

      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    async deleteItemConfirm() {
      let result;
      result = await cancelRequest(this.idReq);

      if (result.status === 200) {
        this.dialogDelete = false;
        this.snackbar = true;
        this.message = "Solicitud cancelada ";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
        this.data();
      } else {
        this.snackbar = true;
        this.message = "ocurrio un error al eliminar la solicitud";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      }
    },
  },
};
</script>

  <style>
</style>