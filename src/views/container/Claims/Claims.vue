<template>
  <v-container id="data-tables" tag="section">
    <base-material-card
      color="greenligth"
      icon="mdi-truck-fast"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("claims.head") }}
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
            <v-icon
              small
              v-text="'mdi-pencil'"
            />
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
          <v-btn
            :key="3"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteclaim(item)"
          >
            <v-icon small v-text="'mdi-delete'" />
          </v-btn>
          <v-btn
            :key="5"
            color="success"
            fab
            class="px-1 ml-1"
            x-small
            @click="sendEmail(item)"
          >
            <v-icon small v-text="'mdi-check'" />
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
            Estas seguro que deseas eliminar este reclamo?
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

      <v-dialog v-model="dialogEmail" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">
            Enviar correo para el reclamo ?
          </v-card-title>
          <v-card-actions>
            <v-spacer />

            <v-btn color="blue darken-1" text @click="closeEmail">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="enviarEmail"> OK </v-btn>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <v-card-text style="height: 100px; position: relative">
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
      </v-card-text> -->
    </base-material-card>
  </v-container>
</template>

  <script>
import i18n from "@/i18n";
import { deleteClaims, GetList, sendEmail } from "../../../api/modules/claims";
export default {
  name: "DashboardDataTables",
  data: () => ({
    dialogDelete: false,
    dialogEmail: false,
    snackbar: false,
    setTimeout: 0,
    message: "",
    idClaim: "",
    hidden: false,
    email: "",
    title: "",
    description: "",
    headers: [
      // {
      //   text: i18n.t('claims.id'),
      //   value: 'id',
      // },
      {
        text: i18n.t("claims.title"),
        value: "title",
      },
      {
        text: i18n.t("claims.date"),
        value: "fecha",
      },
      {
        text: i18n.t("claims.description"),
        value: "description",
      },
      {
        text: i18n.t("claims.status"),
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
  mounted() {
    this.data();
  },
  methods: {
    data: async function () {
      let result;
      result = await GetList();
      console.log("🚀 ~ result:", result);
      if (result.status == 200) {
        this.items = result.data;
      } else {
        console.log("Error api");
      }
    },

    create() {
      this.$router.push({
        name: "ClaimsForm",
        params: {
          option: 1, // option 1 to create
        },
      });
    },
    show(item) {
      this.$router.push({
        name: "ClaimsForm",
        params: {
          option: 2, // option 2 to show
          claimsData: item,
        },
      });
    },

    edit(item) {
      this.$router.push({
        name: "ClaimsForm",
        params: {
          option: 3, // option 3 to edit
          claimsData: item,
        },
      });
    },

    viewRequest(item) {
      this.$router.push({
        name: "RequestDetails",
        params: {
          option: 4,
          request: item, // Assuming item has a request object with an id
        },
      });
    },

    deleteclaim(item) {
      this.idClaim = item.id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      let result;
      result = await deleteClaims(this.idClaim);
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
        this.dialogDelete = false;
        this.snackbar = true;
        this.message = "ocurrio un error al eliminar el reclamo";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      }
      this.dialogDelete = false;
    },
    sendEmail(item) {
      this.email = item.request.email;
      this.title = item.title;
      this.description =
        "queremos informarte que tu reclamo esta siendo revisado por nuestros operadores ,";
      this.dialogEmail = true;
    },
    closeEmail() {
      this.dialogEmail = false;
    },

    async enviarEmail() {
      // const email = this.email;
      let response;
      const data = {
        email: this.email,
        claimDetails: {
          title: this.title,
          createdAt: new Date().toISOString(),
          description:
            "Gracias por ponerte en contacto con nosotros y por informarnos sobre tu reclamo. Queremos asegurarte que hemos recibido tu solicitud y que nuestro equipo de operadores está actualmente revisando los detalles de tu caso con la mayor diligencia posible.",
        },
      };

      response = await sendEmail(data);
      console.log("🚀 ~ deleteItemConfirm ~ result:", response);
      if (response.status === 201) {
        this.dialogEmail = false;
        this.snackbar = true;
        this.message = "Correo enviado....";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
        this.data();
      } else {
        this.dialogEmail = false;
        this.snackbar = true;
        this.message = "ocurrio un error al eliminar el reclamo";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      }
      this.dialogEmail = false;
    },
  },
};
</script>

  <style>
</style>