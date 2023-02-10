<template>
  <v-container
    id="blog-profile"
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
            <v-tab
              class="mr-3"
              color="primary"
            >
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
              enctype="multipart/form-data"
              lazy-validation
            >
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="blogData.title"
                      class="purple-input"
                      :label="$t('blogs.title')"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      v-model="blogData.subTitle"
                      :label="$t('blogs.subtitle')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      v-model="blogData.idCatType"
                      color="secondary"
                      item-color="secondary"
                      :label="$t('blogs.Catalogs')"
                      :items="selcatalog"
                      item-text="name"
                      item-value="id"
                      :readonly="option === 2 ? true : false"
                      single-line
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <div class="lbl">
                      <label
                        v-if="option !== 3 && option !== 1"
                        for=""
                      >Foto principal</label>
                    </div>
                    <v-file-input
                      v-if="option !== 2"
                      v-model="filep"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione foto"
                      prepend-icon="mdi-camera"
                      label="Foto principal"
                      :disabled="option === 2 ? true : false"
                      name="imagen"
                      @change="upload"
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
                    <v-img
                      contain
                      max-height="150"
                      max-width="250"
                      :src="blogData.mainPhoto"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <div class="lbl">
                      <label
                        v-if="option !== 3 && option !== 1"
                        for=""
                      >Banner foto</label>
                    </div>
                    <v-file-input
                      v-if="option !== 2"
                      v-model="fileb"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione foto "
                      prepend-icon="mdi-camera"
                      label="Banner foto"
                      :disabled="option === 2 ? true : false"
                      @change="uploadb"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="secondary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                    <v-img
                      cover
                      max-height="150"
                      max-width="250"
                      :src="blogData.bannerPhoto"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <div class="lbl">
                      <label
                        v-if="option !== 3 && option !== 1"
                        for=""
                      >Galeria</label>
                    </div>
                    <v-file-input
                      v-if="option !== 2"
                      v-model="galery"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione las imágenes"
                      multiple
                      prepend-icon="mdi-camera"
                      label="Galeria"
                      counter
                      :disabled="option === 2 ? true : false"
                      @change="filechange"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="#75B768"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>

                    <div
                      v-for="(logo, index) of photos"
                      :key="index"
                      class="rowfoto"
                    >
                      <v-img
                        cover
                        max-height="100"
                        max-width="50"
                        :src="logo.photo"
                        :hidden="option === 3 ? true : false"
                      />
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-textarea
                      v-model="blogData.description"
                      :label="$t('blogs.description')"
                      class="purple-input"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.required, rules.minDesc]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-textarea
                      v-model="blogData.reference"
                      class="purple-input"
                      :label="$t('blogs.reference')"
                      :readonly="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
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
                      @click="submit()"
                    >
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </base-material-card>
    </v-row>

    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
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
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
  import i18n from '@/i18n'
  import { catalogsGetList } from '../../../api/modules/catalogs'
  import {
    createblog,
    uploadimg,
    url,
    updateblog,
    blogsGet,
  } from '../../../api/modules/blogs'
  import axios from 'axios'
  export default {
    data: () => ({
      tabs: 0,
      option: 0,
      snackbar: false,
      message: '',
      title: '',
      filep: null,
      fileb: null,
      galery: [],
      valid: true,
      id: 0,
      urlgalery: [],
      photos: [],
      rules: {
        sise: value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        required: value => !!value || 'Debe ingresar Texto.',
        min: v => v.length >= 10 || 'El titulo debe tener un mínimo 10 caracteres',
        minDesc: v => v.length >=70 || 'La descripción debe tener un mínimo de 70 caracteres',
      },
      blogData: {
        idBlogLanding: '',
        title: '',
        subTitle: '',
        description: '',
        reference: '',
        idCatType: '',
        mainPhoto: '',
        bannerPhoto: '',
        listPhotosGalery: [],
      },
      selcatalog: [],
    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('blogs.create')
        else if (this.option === 2) return i18n.t('blogs.show')
        else if (this.option === 3) return i18n.t('blogs.edit')
        else return i18n.t('blogs.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('blogs.head')
      },
    },
    mounted () {
      this.cata()
      this.initialize()
    },
    methods: {
      cata: async function () {
        let result
        result = await catalogsGetList(1, 100)
        this.selcatalog = result
      },

      async initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          var id = this.$route.params.blogData.idBlogLanding
          this.id = id
          this.blogData = await blogsGet(1, 100, id)

          this.photos = this.blogData.listPhotosGalery.items
          console.log('phots', this.photos)
        }
      },

      async submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {
            console.log('filep', this.filep)
            console.log('fileb', this.fileb)
            console.log('galeria', this.galery.length)
            if (
              this.filep != null &&
              this.fileb != null &&
              this.galery.length != 0
            ) {
              let blog = {
                title: this.blogData.title,
                subTitle: this.blogData.subTitle,
                description: this.blogData.description,
                reference: this.blogData.reference,
                datePublication: new Date().toISOString(),
                idCatType: this.blogData.idCatType,
                mainPhoto: this.blogData.mainPhoto,
                bannerPhoto: this.blogData.bannerPhoto,
                photosGalery: this.urlgalery,
              }
              console.log('blog', blog)
              blog = await createblog(blog)

              if (blog != null) {
                this.snackbar = true
                this.message = 'Registro exitoso'
                setTimeout(() => {
                  this.$router.push({ name: 'Blogs' })
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
              this.message = 'Debe seleccionar las imagenes del blog'
              setTimeout(() => {
                this.snackbar = false
              }, 2000)
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
            // galeria

            if (this.galery.length > 0) {
              this.blogData.listPhotosGalery = this.urlgalery
            } else {
              let ar_empty = []
              this.photos.map(item => {
                ar_empty.push({ photo: item.photo })
                return item
              })
              this.blogData.listPhotosGalery = ar_empty
            }

            let blog = {
              idBlogLanding: this.id,
              title: this.blogData.title,
              subTitle: this.blogData.subTitle,
              description: this.blogData.description,
              mainPhoto: this.blogData.mainPhoto,
              bannerPhoto: this.blogData.bannerPhoto,
              idCatType: this.blogData.idCatType,
              reference: this.blogData.reference,
              photosGalery: this.blogData.listPhotosGalery,
            }

            console.log('blog update', blog)
            blog = await updateblog(blog)
            if (blog != null) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'Blogs' })
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

      async upload (event) {
        console.log(event)
        const formData = new FormData()
        formData.append('file', event)
        //  console.log("archivos = "+ formData);
        let result
        result = await uploadimg(formData)
        this.blogData.mainPhoto = result
      },

      async uploadb (event) {
        console.log(event)
        const formData = new FormData()
        formData.append('file', event)
        //  console.log("archivos = "+ formData);
        let result
        result = await uploadimg(formData)
        this.blogData.bannerPhoto = result
      },

      filechange () {
        console.log('galeria:', this.galery)

        this.galery.map(item => {
          var formData = new FormData()
          formData.append('file', item)

          axios
            .post(url(), formData)
            .then(data => {
              this.urlgalery.push({
                photo: data.data.data,
              })
            })
            .catch(error => {
              return error.response.data
            })
        })
        console.log('evento galeria', this.urlgalery)
      },

    //      formatoFecha(fecha, formato) {
    //     const map = {
    //         dd: fecha.getDate(),
    //         mm: fecha.getMonth() + 1,
    //         yyyy: fecha.getFullYear()
    //     }

    //     return formato.replace(/yyyy|mm|dd|/gi, matched => map[matched])
    // }
    },
  }
</script>
<style scoped>
.rowfoto {
  display: flex;
  margin: auto;
  padding: 0.5em;
}
.lbl {
  padding: 0.5em;
  margin: auto;
}
</style>
