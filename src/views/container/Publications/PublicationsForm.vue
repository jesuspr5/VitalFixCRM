<template>
  <v-container
    id="publications-profile"
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
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="publiData.title"
                      class="purple-input"
                      :label="$t('publications.title')"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-file-input
                      v-if="option != 2"
                      v-model="filePdf"
                      accept=" "
                      placeholder="Seleccione PDF"
                      prepend-icon="mdi-file"
                      label="Archivo"
                      :readonly="option === 2 ? true : false"
                      @change="uploadPdf"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-file-input
                      v-if="option != 2"
                      v-model="photo"
                      accept=" "
                      placeholder="Seleccione Imagen"
                      prepend-icon="mdi-file"
                      label="Imagen"
                      :disabled="option === 2 ? true : false"
                      @change="uploadPhoto"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </v-col>

                  <v-row>
                    <v-col cols="7">
                      <v-textarea
                        v-model="publiData.description"
                        :label="$t('publications.description')"
                        class="purple-input"
                        :readonly="option === 2 ? true : false"
                        :rules="[rules.required,  rules.minDesc]"
                      />
                    </v-col>
                    <v-col cols="1" />
                    <v-col cols="4">
                      <div class="lbl">
                        <label
                          v-if="option !== 3 && option !== 1"
                          for=""
                        >Portada</label>
                      </div>
                      <v-img
                        class="img-card"
                        placeholder="Imagen de Presentación"
                        contain
                        max-height="150"
                        max-width="250"
                        :src="publiData.photo"
                      />
                    </v-col>
                  </v-row>

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
  import {
    createpublications,
    updatepublications,
    uploadpdf,
  } from '../../../api/modules/publications'

  export default {
    components: {},
    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      filePdf: null,
      urlfilePdf: '',
      currentPage: 0,
      message: '',
      timeout: 3000,
      snackbar: false,
      pageCount: 0,
      valid: true,
      photo: null,
      urlPhoto: null,
      publiData: {
        idPublicationsLanding: null,
        title: '',
        description: '',
        photo: '',
        filePdf: null,
        datePublication: '',
      },
      rules: {
        required: value => !!value || 'Debe ingresar Texto.',
        min: v => v.length >= 10 || 'El titulo debe tener un mínimo 10 caracteres',
        minDesc: v => v.length >=70 || 'La descripción debe tener un mínimo de 70 caracteres',
      },
    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('publications.create')
        else if (this.option === 2) return i18n.t('publications.show')
        else if (this.option === 3) return i18n.t('publications.edit')
        else return i18n.t('publications.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('publications.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.publiData = this.$route.params.publiData
        }
      },

      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {
            if (this.filePdf != null) {
            } else {
              this.snackbar = true
              this.message = 'Debe seleccionar un archivo Pdf'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }
            if (this.photo != null) {
            } else {
              this.snackbar = true
              this.message = 'Debe seleccionar una Imagen'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }

            let newPub = {
              title: this.publiData.title,
              description: this.publiData.description,
              photo: this.publiData.photo,
              filePdf: this.publiData.filePdf,
              datePublication: new Date().toISOString(),
            }

            var publications = await createpublications(newPub)
            if (publications != null) {
              this.snackbar = true
              this.message = 'Registro exitoso'
              setTimeout(() => {
                this.$router.push({ name: 'Publications' })
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
            this.message = 'Debe llenar todos los campos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }
        if (this.option === 3) {
          if (this.$refs.form.validate()) {
            let pub = {
              idPublicationsLanding: this.publiData.idPublicationsLanding,
              title: this.publiData.title,
              description: this.publiData.description,
              photo: this.publiData.photo,
              filePdf: this.publiData.filePdf,
            }
            var publicationsUpdate = await updatepublications(pub)
            if (publicationsUpdate != null) {
              this.snackbar = true
              this.message = 'Actualización exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'Publications' })
              }, 2000)
            } else {
              this.snackbar = true
              this.message = 'Hubo un error en la actualizacion'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }
          } else {
            this.snackbar = true
            this.message = 'Debe llenar todos los campos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }
      },
      async uploadPdf (event) {
        if (this.filePdf != null) {
          const formData = new FormData()
          formData.append('file', event)
          let result
          result = await uploadpdf(formData)
          this.publiData.filePdf = result
        }
      },
      async uploadPhoto (event) {
        if (this.photo != null) {
          const formData = new FormData()
          formData.append('file', event)

          let result
          result = await uploadpdf(formData)
          this.publiData.photo = result
        }
      },
    },
  }
</script>

<style scoped>
.img-card {
  box-shadow: 0 !important;
}

.lbl {
  padding: 0.5em;
  margin: auto;
}
</style>
