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
              v-model="valid"
              lazy-validation
            >
              <v-container class="py-0">
                <v-row>
                  <v-col cols="7">
                    <v-text-field
                      v-model="invesData.name"
                      :label="$t('inventory.Name')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="invesData.quantity"
                      :label="$t('inventory.quantity')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col cols="7">
                    <v-textarea
                      v-model="invesData.description"
                      :label="$t('inventory.description')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="inventoryData.status"
                      :label="$t('inventory.status')"
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
  import { createinventario, updateinventario } from '../../../api/modules/inventario'
  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      snackbar: '',
      message: '',
      valid: true,
      invesData: {
        id: '',
        name: '',
        quantity: '',
        description: '',
        status: '',

      },
      rules: {

        required: value => !!value || 'Debe ingresar Texto.',
        min: v => v.length >= 10 || 'El titulo debe tener un mínimo 10 caracteres',
      },

    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('inventory.create')
        else if (this.option === 2) return i18n.t('inventory.show')
        else if (this.option === 3) return i18n.t('inventory.edit')
        else return i18n.t('inventory.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('inventory.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.invesData = this.$route.params.invesData
        }
      },
      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {

            let inventario = {
              name: this.invesData.name,
              quantity: this.invesData.quantity,
              description: this.invesData.description,

            }
            console.log("🚀 ~ submit ~ inventario:", inventario)
            inventario = await createinventario(inventario)

            if (inventario.status == 201) {
              this.snackbar = true
              this.message = 'Registro exitoso'
              setTimeout(() => {
                this.$router.push({ name: 'Inventory' })
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

            let inventario = {
              id: this.invesData.id,
              name: this.invesData.name,
              quantity: this.invesData.quantity,
              description: this.invesData.description,
            }
            console.log('inventario que se envia ', inventario)
            inventario = await updateinventario(inventario)
            if (inventario != null) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'Inventory' })
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
