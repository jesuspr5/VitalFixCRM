<template>
  <v-container id="data-tables" tag="section">
    <base-material-card
      color="greenligth"
      icon="mdi-post-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t("blogs.head") }}
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
            @click="showBlogs(item)"
          >
            <v-icon small v-text="'mdi-eye'" />
          </v-btn>
          <v-btn
            :key="2"
            color="four"
            fab
            class="px-1 ml-1"
            x-small
            @click="editBlogs(item)"
          >
            <v-icon small v-text="'mdi-pencil'" />
          </v-btn>
          <v-btn
            :key="3"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteBlogs(item)"
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
            Estas seguro que deseas eliminar este Blog?
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
          <v-btn
            fab
            dark
            large
            color="grenndark"
            fixed
            right
            bottom
            @click="createBlogs"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
import i18n from "@/i18n";
import { blogsGetList, deleteblog } from "../../../api/modules/blogs";
export default {
  name: "DashboardDataTables",

  data: () => ({
    hidden: false,
    idblog: null,
    dialogDelete: false,
    snackbar: false,
    message: "",
    headers: [
      {
        text: i18n.t("blogs.title"),
        value: "title"
      },

      {
        text: i18n.t("blogs.subtitle"),
        value: "subTitle"
      },
      {
        text: "Fecha_de_publicacion",
        value: "datePublication"
      },
      {
        sortable: false,
        text: "Acciones",
        value: "actions"
      }
    ],
    items: [],
    search: undefined
  }),
  async mounted() {
    this.data();
  },
  methods: {
    data: async function() {
      let result;
      result = await blogsGetList(1, 100);
      this.items = result;
      console.log("EL STOREE: ", result);
      // console.log('array',this.items)
    },

    createBlogs() {
      this.$router.push({
        name: "BlogsForm",
        params: {
          option: 1 // option 1 to create
        }
      });
    },
    showBlogs(item) {
      console.log(item);
      this.$router.push({
        name: "BlogsForm",
        params: {
          option: 2, // option 2 to show
          blogData: item
        }
      });
    },
    editBlogs(item) {
      this.$router.push({
        name: "BlogsForm",
        params: {
          option: 3, // option 3 to edit
          blogData: item
        }
      });
    },
    deleteBlogs(item) {
      this.idblog = item.idBlogLanding;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      let result;
      result = await deleteblog(this.idblog);
      console.log("respuesta", result);
      if (result === "Transacción exitosa.") {
        this.snackbar = true;
        this.message = "Eliminación exitosa";
        this.data();
        this.dialogDelete = false;
        setTimeout(() => {
          this.$router.push({ name: "Blogs" });
        }, 1000);
      } else {
        this.snackbar = true;
        this.message = "ocurrio un error al eliminar el Blog";
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      }
    }
  }
};
</script>
