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
            <v-form enctype="multipart/form-data">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="blogData.title"
                      class="purple-input"
                      :label="$t('blogs.title')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="blogData.subTitle"
                      :label="$t('blogs.subtitle')"
                      class="purple-input"
                      :disabled="option === 2 ? true : false"
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
                      accept="image/*"
                      placeholder="Seleccione foto "
                      prepend-icon="mdi-camera"
                      label="Banner foto"
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
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-textarea
                      v-model="blogData.reference"
                      class="purple-input"
                      :label="$t('blogs.reference')"
                      :disabled="option === 2 ? true : false"
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
    {{ $t("texts.createtext") }}

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

  <div class="text-center">
    <v-snackbar   
      v-model="snackk"
      :timeout="timeout"
      color="#75B768"
    >
    {{ $t("texts.updatetext") }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackk = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
import i18n from "@/i18n";
import { catalogsGetList } from "../../../api/modules/catalogs";
import { createblog ,uploadimg,urlgalery,updateblog,blogsGet  } from "../../../api/modules/blogs";
import axios from "axios";
export default {
  data: () => ({
    tabs: 0,
    option: 0,
    snackbar: false,
    snackk:false,
  timeout: 3000,
    title: "",
    filep: null,
    fileb: null,
    galery: [],
    urlMainPhoto: "",
    urlBannerPhoto: "",
    urlgalery: [],
    //   rules: [
    //   value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    // ],
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
    now:{},
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
    // console.log($t('roles.title'))
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
       this.blogData =  await blogsGet(1,100,id);
       console.log("json",this.blogData)
      }
    },

    async submit() {
      if (this.option === 1) {
        //  this.urlMainPhoto =   await this.upload(this.filep);
        //  this.urlBannerPhoto =   await this.upload(this.fileb);
        // let blog = {
        //   title: this.blogData.title,
        //   subTitle: this.blogData.subTitle,
        //   description: this.blogData.description,
        //   reference: this.blogData.reference,
        //   datePublication: new Date().toISOString(),
        //   idCatType: this.blogData.idCatType,
        //   mainPhoto: this.urlMainPhoto,
        //   bannerPhoto: this.urlBannerPhoto,
        //   photosGalery: this.urlgalery
        // };
       
        // blog= await createblog(blog)
       this.snackbar=true; 
     setTimeout(()=>{this.$router.push({ name: "Blogs" })},3000);

      }else 
       if (this.option === 3){

        let blog = {
          
         idBlogLanding:this.blogData.idBlogLanding,
          title: this.blogData.title,
          subTitle: this.blogData.subTitle,
          description: this.blogData.description,
          mainPhoto: this.blogData.mainPhoto,
          bannerPhoto: this.blogData.bannerPhoto,
          reference: this.blogData.reference,
          photosGalery: this.blogData.listPhotosGalery
        };
          this.now =blog;
        console.log("now",this.now)
      //   blog= await updateblog(blog);
      //  this.snackk=true;
      //   setTimeout(()=>{this.$router.push({ name: "Blogs" })},3000);

       
      }else{
          alert("blog no creado")
      }
      
    },
    async upload(img) {
      const formData = new FormData();
      formData.append("file", img);
      //  console.log("archivos = "+ formData);
      let result;
      result = await uploadimg(formData);

      //  this.urlMainPhoto = result;
      return result;

     
    },

   

  
    filechange() {
      console.log("galeria:", this.galery);
   
    this.galery.map(item => {
      var formData = new FormData();
      formData.append("file", item)
      

     axios.post(urlgalery(),formData)
      .then(data => {

        this.urlgalery.push({
               photo: data.data.data
            });
      
      
      }).catch(error => {return error.response.data})
       
    });
    }
  
   

    
    
    // filechange() {
    //   console.log("galeria:", this.galery);

    //   this.urlgalery = this.galery.map(async (item) => {
    //     return await this.upload(item);
    //     console.log("ulrFot", url);
    //     // this.urlgalery.push({
    //     //   photo: url
    //     // });
    //   });

    //   //  this.urlgalery.push({
    //   //  });
    //   console.log("array :", this.urlgalery);
    // },
    
    //  fileChangeEvent(index) {
    // this.modelData.urlImage=[]
    // this.form.value.urlImage.map(item=>{
    // console.log("index", item)
    // this.spinner.show();
    // var form_data = new FormData();
    // form_data.append('file', item)
    // })
    // this.technicalSheets.uploadPhotoTecnicalSheet(form_data).then(response => {
    //   this.spinner.hide();
    //   console.log(response);
    //   if (response.err == false) {
    //         this.modelData.urlImage.push({
    //           "urlPhoto": response.data
    //         });

    //       }
    //     })
    //   }
  
}
};
</script>
