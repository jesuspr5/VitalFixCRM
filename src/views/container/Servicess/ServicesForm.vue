<template>
  <v-container
    id="inventory-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <base-material-card icon="mdi-account-outline">
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3">
              <v-icon class="mr-2">
                mdi-account-key
              </v-icon>
              {{ getTitleButton }}
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
        <v-tabs-items
          v-model="tabs"
          class="transparent"
        >
          <v-tab-item :kei="0">
            <v-form
              ref="form"

              lazy-validation
            >
              <v-container class="py-0">
                <v-row>
                  <v-col cols="7">
                    <v-text-field
                      v-model="servicesData.name"
                      :label="$t('services.name')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-select
                      v-model="servicesData.type"
                      :items="typeService"
                      label="Tipo de servicio"
                      item-text="name"
                      item-value="id"
                      class="purple-input"
                      outlined
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  
                  <v-col cols="7">
                    <v-textarea
                      v-model="servicesData.description"
                      :label="$t('services.description')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="servicesData.price"
                      :label="$t('services.price')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="servicesData.status"
                      :label="$t('services.status')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-right"
                  >
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
  import i18n from '@/i18n'
  import { createservices, updateservices,GetListtype } from '../../../api/modules/services'
  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      snackbar: '',
      message: '',
      servicesData: {
        id: '',
        name: '',
        type: '',
        description: '',
        price: '',
        status: '',
      },
      typeService:[]

    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('services.create')
        else if (this.option === 2) return i18n.t('services.show')
        else if (this.option === 3) return i18n.t('services.edit')
        else return i18n.t('services.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('services.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      async  initialize () {
        let result
        result = await GetListtype()

        if (result.status==200) {
          this.typeService = result.data
        } else {
          console.log("Error api")
        }
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.servicesData = this.$route.params.servicesData
        }
      },
      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {

            let services = {
              name: this.servicesData.name,
              type: this.servicesData.type,
              description: this.servicesData.description,
              price: parseFloat(this.servicesData.price),
              status:"Activo"

            }
            console.log("🚀 ~ submit ~ service:", services)
            services = await createservices(services)

            if (services.status == 201) {
              this.snackbar = true
              this.message = 'Registro exitoso'
              setTimeout(() => {
                this.$router.push({ name: 'Services' })
              }, 2000)
            } else {
              this.snackbar = true
              this.message = 'Hubo un error durante el registro'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }

          } else {
            this.snackbar = true
            this.message = 'Debe llenar todos los campos requeridos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }  
        if (this.option === 3) {
          if (this.$refs.form.validate()) {

            let id = this.servicesData.id
            let services = {
              name: this.servicesData.name,
              type: this.servicesData.type,
              price: parseFloat(this.servicesData.price),
              description: this.servicesData.description,
              status: this.servicesData.status,
            }

            services = await updateservices(services, id)
            if (services.status == 200) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'Services' })
              }, 2000)
            } else {
              this.snackbar = true
              this.message = 'Hubo un error durante la actualizacion'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }
          } else {
            this.snackbar = true
            this.message = 'Debe llenar todos los campos requeridos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }
      },
    },
  }
</script>

<style>
.lbl {
  padding: 0.5em;
  margin: auto;
}
</style>
