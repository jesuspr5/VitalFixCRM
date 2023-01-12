<template>
  <v-container id="blog-profile" fluid tag="section">
    <v-row justify="center">
      <base-material-card icon="mdi-account-outline">
        <template v-slot:heading>
          <v-tabs
            v-model="tabs"
            background-color="transparent"
            slider-color="white"
          >
            <v-tab class="mr-3" color="primary">
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
        <v-tabs-items v-model="tabs" class="transparent">
          <v-tab-item :kei="0">
            <v-form enctype="multipart/form-data" ref="form" v-model="valid" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="blogData.title"
                      class="purple-input"
                      :label="$t('blogs.title')"
                      :disabled="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="blogData.subTitle"
                      :label="$t('blogs.subtitle')"
                      class="purple-input"
                      :disabled="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="blogData.idCatType"
                      color="secondary"
                      item-color="secondary"
                      :label="$t('blogs.Catalogs')"
                      :items="selcatalog"
                      item-text="name"
                      item-value="id"
                      :disabled="option === 2 ? true : false"
                      single-line
                      :rules="[rules.required]"
                    >
                      <!-- <template v-slot:item="{ attrs, item, on }">
                          <v-list-item
                            v-bind="attrs"
                            active-class="secondary elevation-4 white--text"
                            class="mx-3 mb-2 v-sheet"
                            elevation="0"
                            v-on="on"
                          >
                            <v-list-item-content>
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
  
                            <v-scale-transition>
                              <v-list-item-icon
                                v-if="attrs.inputValue"
                                class="my-3"
                              >
                                <v-icon>mdi-check</v-icon>
                              </v-list-item-icon>
                            </v-scale-transition>
                          </v-list-item>
                        </template> -->
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-file-input
                      v-model="filep"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione foto"
                      prepend-icon="mdi-camera"
                      label="Foto principal"
                      @change="upload"
                      
                      :disabled="option === 2 ? true : false"
                      name="imagen"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                          {{ text }}
                        </v-chip>
                      </template></v-file-input
                    >
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-file-input
                      v-model="fileb"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione foto "
                      prepend-icon="mdi-camera"
                      label="Banner foto"
                      @change="upload"
                      :disabled="option === 2 ? true : false"
                      ><template v-slot:selection="{ text }">
                        <v-chip small label color="secondary">
                          {{ text }}
                        </v-chip>
                      </template></v-file-input
                    >
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-file-input
                      v-model="galery"
                      type="file"
                      accept="image/*"
                      placeholder="Seleccione las imagenes"
                      multiple
                      prepend-icon="mdi-camera"
                      label="Galeria"
                      counter
                      @change="filechange"
                      :disabled="option === 2 ? true : false"
                     
                    >
                      <template v-slot:selection="{ text }" >
                        <v-chip small label color="#75B768">
                          {{ text }}
                        </v-chip>
                      </template></v-file-input
                    >
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-textarea
                      v-model="blogData.description"
                      :label="$t('blogs.description')"
                      class="purple-input"
                      :disabled="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-textarea
                      v-model="blogData.reference"
                      class="purple-input"
                      :label="$t('blogs.reference')"
                      :disabled="option === 2 ? true : false"
                      :rules="[rules.required, rules.min]"
                    ></v-textarea>
                  </v-col>
                  
                  <v-col cols="12" class="text-right">
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
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
/* eslint-disable */
import i18n from "@/i18n";
import { catalogsGetList } from "../../../api/modules/catalogs";
import { createblog ,uploadimg,url,updateblog,blogsGet  } from "../../../api/modules/blogs";
import axios from "axios";
export default {
  data: () => ({
    tabs: 0,
    option: 0,
    snackbar: false,  
    message: "",
  timeout: 3000,
    title: "",
    filep: null,
    fileb: null,
    galery: [],
    valid: true,
    id: 0,
    urlMainPhoto: "",
    urlBannerPhoto: "",
    urlgalery: [],
      rules: {
        sise: value=> !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      required: value => !!value || "Debe ingresar Texto.",
      min: v => v.length >= 5 || "Mínimo 8 caracteres",
    },
    blogData: {
      idBlogLanding:"",
      title: "",
      subTitle: "",
      description: "",
      reference: "",
      idCatType: "",
      mainPhoto: "",
      bannerPhoto: "",
      listPhotosGalery:[]
    },
    selcatalog: [],
   
  }),
  computed: {
    getTitle() {
      if (this.option === 1) return i18n.t("blogs.create");
      else if (this.option === 2) return i18n.t("blogs.show");
      else if (this.option === 3) return i18n.t("blogs.edit");
      else return i18n.t("blogs.head");
    },
    getTitleButton() {
      if (this.option === 1) return i18n.t("crud.create");
      else if (this.option === 2) return i18n.t("crud.show");
      else if (this.option === 3) return i18n.t("crud.edit");
      else return i18n.t("blogs.head");
    }
  },
  mounted() {
    this.cata();
    this.initialize();
  },
  methods: {
    cata: async function() {
      let result;
      result = await catalogsGetList(1, 100);
      this.selcatalog = result;
    },

   async initialize() {
      this.option = this.$route.params.option;
      if (this.option === 3 || this.option === 2) {
       var id = this.$route.params.blogData.idBlogLanding
       this.id = id;
       this.blogData =  await blogsGet(1,100,id);
      }
    },

    async submit() {
      if (this.option === 1) {
        if (this.$refs.form.validate()) {

          this.urlMainPhoto =   await this.upload(this.filep);
         this.urlBannerPhoto =   await this.upload(this.fileb);
        let blog = {
          title: this.blogData.title,
          subTitle: this.blogData.subTitle,
          description: this.blogData.description,
          reference: this.blogData.reference,
          datePublication: new Date().toISOString(),
          idCatType: this.blogData.idCatType,
          mainPhoto: this.urlMainPhoto,
          bannerPhoto: this.urlBannerPhoto,
          photosGalery: this.urlgalery
        };
       
        blog= await createblog(blog)

        if (blog != null) {
            console.log("Tituulo del blog", blog);
            this.snackbar = true;
        this.message = "Registro exitoso";
     setTimeout(()=>{this.$router.push({ name: "Blogs" })},3000);
          } else {
            this.snackbar = true;
            this.message = "Hubo un error durante el registro";
            setTimeout(() => {
              this.snackbar = false;
            }, 3000);
          }
        }else{ 
          this.snackbar = true;
          this.message = "Debe llenar todos los campos";
          setTimeout(() => { this.snackbar = false;}, 3000);
        }
        
      }
       if (this.option === 3){
        if (this.$refs.form.validate()) {
          this.blogData.listPhotosGalery =this.urlgalery
        console.log(this.blogData)
        if(this.filep !=null){
         
          this.urlMainPhoto =  await this.upload(this.filep);
          this.blogData.mainPhoto = this.urlMainPhoto
        }else{
          this.blogData.mainPhoto =this.blogData.mainPhoto
        }
        if(this.fileb!=null){
          this.urlBannerPhoto =  await this.upload(this.fileb);
          this.blogData.bannerPhoto = this.urlBannerPhoto

        }
        let blog = {
         
         idBlogLanding:this.id,
          title: this.blogData.title,
          subTitle: this.blogData.subTitle,
          description: this.blogData.description,
          mainPhoto: this.blogData.mainPhoto ,
          bannerPhoto: this.blogData.bannerPhoto,
          idCatType: this.blogData.idCatType,
          reference: this.blogData.reference
          // photosGalery: this.blogData.listPhotosGalery
        };
        blog= await updateblog(blog);
        if (blog != null) {
            console.log("Titulooo del blog", blog);
            this.snackbar = true;
        this.message = "Actualizacion exitosa";
        setTimeout(()=>{this.$router.push({ name: "Blogs" })},3000);
          } else {
            this.snackbar = true;
            this.message = "Hubo un error durante el registro";
            setTimeout(() => {
              this.snackbar = false;
            }, 3000);
          }

        }else{
          this.snackbar = true;
          this.message = "Debe llenar todos los campos";
          setTimeout(() => {this.snackbar = false;}, 3000);
        }
       
       
      }
       
      
    },
    // async upload(img) {
    //   const formData = new FormData();
    //   formData.append("file", img);
    //   //  console.log("archivos = "+ formData);
    //   let result;
    //   result = await uploadimg(formData);

    //   //  this.urlMainPhoto = result;
    //   return result;

     
    // },

 async  upload(event) {
      console.log(event);
        const formData = new FormData();
      formData.append("file", event);
      //  console.log("archivos = "+ formData);
      let result;
      result = await uploadimg(formData);
      return result;
    },

   

  
    filechange() {
      console.log("galeria:", this.galery);
   
    this.galery.map(item => {
      var formData = new FormData();
      formData.append("file", item)
      

     axios.post(url(),formData)
      .then(data => {

        this.urlgalery.push({
               photo: data.data.data
             
            });
        
      
      }).catch(error => {return error.response.data})
       
    });

    }
  
  
}
};
</script>
