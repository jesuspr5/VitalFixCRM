<template>
  <v-container
    id="TypesServices-profile"
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
                      v-model="dataType.name"
                      :label="$t('typeservice.name')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.onlyText]"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field

                      v-model="dataType.warrantyDays"
                      :label="$t('typeservice.garantia')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.onlyNumbers]"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="dataType.status"
                      :label="$t('typeservice.status')"
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
  import { createTypeServicio, updateTypeService } from '../../../api/modules/typeServices'
  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      snackbar: '',
      timeout:'',
      message: '',
      dataType: {
        id: '',
        name: '',
        warrantyDays:0,
        status:''
      },
      rules: {
        required: value => !!value || 'este dato es obligatorio.',
        min: v => v.length >= 1|| 'Mínimo 1 caracteres',
        emailRules: v => /.+@.+\..+/.test(v) || 'el correo deber ser valido. Ejemplo@email.com',
        onlyNumbers: v => /^[0-9]+$/.test(v) || 'Solo se permiten números.',
        onlyText: v => /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(v) || 'Solo se permiten letras.'
        // passwordMatch: v => v === this.user.password || 'Las contraseñas deben coincidir'
      
        // emailMatch: () => "El correo y la contraseña no coinciden"
      },

    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('typeservice.create')
        else if (this.option === 2) return i18n.t('typeservice.show')
        else if (this.option === 3) return i18n.t('typeservice.edit')
        else return i18n.t('typeservice.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('typeservice.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.dataType = this.$route.params.typeData
          
        }
      },
      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {

            let typeService = {
              name: this.dataType.name,
              warrantyDays: parseInt(this.dataType.warrantyDays),
              status: "Activo"

            }
            console.log("🚀 ~ submit ~ typeService:", typeService)

            typeService = await createTypeServicio(typeService)

            if (typeService.status == 201) {
              this.snackbar = true
              this.message = 'Registro exitoso'
              setTimeout(() => {
                this.$router.push({ name: 'TypeServices' })
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

            let id = this.dataType.id
            console.log("🚀 ~ submit ~ id:", id)
           
            let typeService = {
              name: this.dataType.name,
              warrantyDays :parseInt(this.dataType.warrantyDays),
              status:this.dataType.status,
            }

            typeService = await updateTypeService(typeService, id)
            console.log('que trae ', typeService)
            
            if (typeService.status == 200) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'TypeServices' })
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
