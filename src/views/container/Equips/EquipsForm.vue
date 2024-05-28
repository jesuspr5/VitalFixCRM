<template>
  <v-container
    id="equips-profile"
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
          <v-tab-item :key="0">
            <v-form
              ref="form"
              lazy-validation
            >
              <v-container class="py-0">
                <v-row justify="center">
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="equip.name"
                      :label="$t('equips.name')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-textarea
                      v-model="equip.description"
                      :label="$t('equips.description')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col :hidden="option === 2" cols="12" md="8">
                    <v-file-input
                      v-model="file"
                      label="Subir Imagen"
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      class="purple-input"
                      @change="onFileChange"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="8"
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

                  <v-col :hidden="option === 1 || option === 3" cols="12" md="8">
                    <v-img :src="imagePreview" max-height="300" max-width="350" contain />
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
  import { createEquips, updateEquips } from '../../../api/modules/equips'
  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      title: '',
      snackbar: '',
      message: '',
      equip: {
        id: '',
        name: '',
        description: '',
        urlImagen:null,
       
      },
      file: null,
      imagePreview:'',

    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('equips.create')
        else if (this.option === 2) return i18n.t('equips.show')
        else if (this.option === 3) return i18n.t('equips.edit')
        else return i18n.t('equips.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('equips.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.equip = this.$route.params.equipsData;
        this.imagePreview = this.equip.urlImagen;
        }
      },
      onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
      } else {
        this.file = null;
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append('name', this.equip.name);
        formData.append('description', this.equip.description);
        if (this.file) {
          formData.append('image', this.file);
        }

        let response;
        if (this.option === 1) {
          response = await createEquips(formData);
        } else if (this.option === 3) {
          let id = this.equip.id
          console.log("🚀 ~ submit ~ id:", id)
          response = await updateEquips(id,formData);
          
        }

        if ((this.option === 1 && response.status === 201) || (this.option === 3 && response.status === 200)) {
          this.snackbar = true
          this.message = 'Operación exitosa'
          setTimeout(() => {
            this.$router.push({ name: 'Equips' })
          }, 2000)
        } else {
          this.snackbar = true
          this.message = 'Hubo un error durante la operación'
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
<style scoped>
#equips-profile .v-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#equips-profile .v-file-input,
#equips-profile .v-text-field,
#equips-profile .v-textarea {
  width: 100%;
}

#equips-profile .text-right {
  text-align: right;
}

#equips-profile .v-img {
  display: flex;
  justify-content: center;
}
</style>
