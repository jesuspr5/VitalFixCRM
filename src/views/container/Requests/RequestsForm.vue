<template>
  <v-container id="Servicios-profile" fluid tag="section">
    <v-row justify="center">
      <base-material-card icon="mdi-account-outline">
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2"> mdi-account-key </v-icon>
              Tecnicos
            </v-tab>
          </v-tabs>
        </template>

        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              small
              color="gray"
              absolute
              right
              top
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-tabs-items v-model="tabs" class="transparent">
          <v-tab-item :kei="0">
            <v-form ref="form" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="5">
                    <v-select
                      v-model="idtecnico"
                      :items="tecnicos"
                      label="Tecnicos"
                      item-text="name"
                      item-value="id"
                      class="purple-phone"
                      prepend-icon="mdi-account"
                      outlined
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      v-if="option !== 2"
                      color="success"
                      class="mr-0"
                      @click="submit"
                    >
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
                </v-row>

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
                        Cerrar
                      </v-btn>
                    </template>
                  </v-snackbar>
                </div>
              </v-container>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>



<script>
import i18n from "@/i18n";
import { asignarTecnico, sendEmail } from "../../../api/modules/requests";
import { usersGetList } from "../../../api/modules/user";
export default {
  data: () => ({
    tabs: 0,
    option: 0,
    timeout: 0,
    title: "",
    snackbar: "",
    message: "",
    tecnicos: [],
    idtecnico: "",
    id: "",
    request: {
      email: "",
    },
  }),
  computed: {
    getTitle() {
      if (this.option === 1) return i18n.t("requests.create");
      else if (this.option === 2) return "Asignar";
      else if (this.option === 3) return "Asignar";
      else return i18n.t("requests.head");
    },
    getTitleButton() {
      if (this.option === 1) return i18n.t("crud.create");
      else if (this.option === 2) return "Asignar";
      else if (this.option === 3) return "Asignar";
      else return i18n.t("requests.head");
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let response;
      response = await usersGetList();

      if (response.status == 200) {
        this.tecnicos = response.data.filter((user) => user.role === "tecnico");
      } else {
        console.log("Error api");
      }
      this.option = this.$route.params.option;
      if (this.option === 3 || this.option === 2) {
        this.id = this.$route.params.requestsData.id;
        this.request = this.$rouete.params.requestsData;
      }
    },

    async submit() {
      if (this.option === 3) {
        if (this.$refs.form.validate()) {
          let response;
          let idreq = this.id;
          let tecnico = {
            tecnicoId: this.idtecnico,
          };

          const data = {
            email: this.request.email,
            claimDetails: {
              title: "¡Tu solicitud ha sido asignada a un técnico!",
              createdAt: new Date().toISOString(),
              description:
                "Nos complace informarte que hemos asignado un técnico especialmente capacitado para atender tu solicitud. Estamos comprometidos en brindarte el mejor servicio posible y estamos seguros de que nuestro equipo resolverá tu problema de manera rápida y eficiente. Estaremos monitoreando de cerca el progreso de tu solicitud y nos mantendremos en contacto contigo para cualquier actualización adicional. ¡Gracias por confiar en nosotros para resolver tus necesidades!",
            },
          };

          response = await asignarTecnico(idreq, tecnico);

          if (response.status == 200) {
            await sendEmail(data);
            this.snackbar = true;
            this.message = "el Tecnico se registro con exitoso";
            setTimeout(() => {
              this.$router.push({ name: "Requests" });
            }, 2000);
          } else {
            this.snackbar = true;
            this.message = "Hubo un error durante el registro";
            setTimeout(() => {
              this.snackbar = false;
            }, 1000);
          }
        } else {
          this.snackbar = true;
          this.message = "Debe llenar todos los campos requeridos";
          setTimeout(() => {
            this.snackbar = false;
          }, 1000);
        }
      }
    },
  },
};
</script>

<style>
.lbl {
  padding: 0.5em;
  margin: auto;
}
</style>