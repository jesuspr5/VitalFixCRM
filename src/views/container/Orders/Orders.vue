<template>
  <v-container id="data-tables" tag="section">
    <base-material-card
      color="greenligth"
      icon="mdi-format-page-break"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("orders.head") }}
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
        :items="filteredRequests"
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
            <v-icon small v-text="'mdi-eye'" />
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
            @click="deleteorder(item)"
          >
            <v-icon small v-text="'mdi-delete'" />
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
            Estas seguro que deseas eliminar esta orden?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeDelete">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteOrderConfirm">
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
import { deleteorder } from "../../../api/modules/orders";

import { getlistRequest } from "../../../api/modules/requests";
import i18n from "@/i18n";
export default {
  name: "DashboardDataTables",
  data: () => ({
    dialogDelete: false,
    snackbar: false,
    message: "",
    hidden: false,
    idord: "",
    headers: [
      {
        text: i18n.t("requests.email"),
        value: "email",
      },

      {
        text: "Tecnico Asignado",
        value: "tecnico.name",
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
      return this.items.filter((request) => {
        const allowedStatuses = ["finalizada", "cancelada"];
        return allowedStatuses.includes(request.status);
      });
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

    create() {
      this.$router.push({
        name: "OrdersForm",
        params: {
          option: 1, // option 1 to create
        },
      });
    },
    show(item) {
      console.log(item);
      this.$router.push({
        name: "OrdersForm",
        params: {
          option: 2, // option 2 to show
          ordersData: item,
        },
      });
    },
    deleteorder(item) {
      this.idord = item.id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    async deleteOrderConfirm() {
      let result;
      result = await deleteorder(this.idord);
      console.log("🚀 ~ deleteItemConfirm ~ result:", result);
      if (result.status === 200) {
        this.dialogDelete = false;
        this.snackbar = true;
        this.message = "Eliminación exitosa";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
        this.data();
      } else {
        this.snackbar = true;
        this.message = "ocurrio un error al eliminar la orden";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      }
      this.dialogDelete = false;
    },
  },
};
</script>

  <style>
</style>