<template>
  <v-container
    id="Servicios-profile"
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
                      v-model="requestsData.detailsEquip"
                      :label="$t('requests.detailsEquip')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.manufacturer"
                      :label="$t('requests.manufacturer')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.model"
                      :label="$t('requests.model')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.numberSerial"
                      :label="$t('requests.numberSerial')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.description"
                      :label="$t('requests.description')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.names"
                      :label="$t('requests.Name')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.lastNames"
                      :label="$t('requests.lastName')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.email"
                      :label="$t('requests.email')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.phone"
                      :label="$t('requests.phone')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.country"
                      :label="$t('requests.country')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.address"
                      :label="$t('requests.address')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.references"
                      :label="$t('requests.references')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.city"
                      :label="$t('requests.city')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.state"
                      :label="$t('requests.state')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.zip"
                      :label="$t('requests.zip')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="requestsData.status"
                      :label="$t('requests.status')"
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
  import { createrequest, updaterequest } from '../../../api/modules/requests'
  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      snackbar: '',
      message: '',
      requestsData: {
        detailsEquip: '',
        manufacturer: '',
        model: '',
        numberSerial: '',
        description: '',
        name: '',
        lastNames: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        references: '',
        city: '',
        state: '',
        zip: '',
        status: '',

      },

    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('requests.create')
        else if (this.option === 2) return i18n.t('requests.show')
        else if (this.option === 3) return i18n.t('requests.edit')
        else return i18n.t('requests.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('requests.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.requestsData = this.$route.params.requestsData
        }
      },
      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {

            let requests = {
              detailsEquip: this.requestsData.detailsEquip,
              manufacturer: this.requestsData.manufacturer,
              model: this.requestsData.model,
              numberSerial: this.requestsData.numberSerial,
              description: this.requestsData.description,
              name: this.requestsData.name,
              lastNames: this.requestsData.lastNames,
              email: this.requestsData.email,
              phone: this.requestsData.phone,
              country: this.requestsData.country,
              address: this.requestsData.address,
              references: this.requestsData.references,
              city: this.requestsData.city,
              state: this.requestsData.state,
              zip: this.requestsData.zip,

            }
            console.log("🚀 ~ submit ~ requests:", requests)
            requests = await createresquest(requests)

            if (requests != null) {
              this.snackbar = true
              this.message = 'Registro exitoso'
              setTimeout(() => {
                this.$router.push({ name: 'requests' })
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

            let requests = {
              detailsEquip: this.requestsData.detailsEquip,
              manufacturer: this.requestsData.manufacturer,
              model: this.requestsData.model,
              numberSerial: this.requestsData.numberSerial,
              description: this.requestsData.description,
              name: this.requestsData.name,
              lastNames: this.requestsData.lastNames,
              email: this.requestsData.email,
              phone: this.requestsData.phone,
              country: this.requestsData.country,
              address: this.requestsData.address,
              references: this.requestsData.references,
              city: this.requestsData.city,
              state: this.requestsData.state,
              zip: this.requestsData.zip,
            }
            console.log('request que se envia ', requests)
            requests = await updaterequest(requests)
            if (requests != null) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'requests' })
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