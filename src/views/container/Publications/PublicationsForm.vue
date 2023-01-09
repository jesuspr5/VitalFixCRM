<template>
  <v-container id="publications-profile" fluid tag="section">
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
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="publiData.title"
                      class="purple-input"
                      :label="$t('publications.title')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-file-input
                      v-model="filePdf"
                      accept=" "
                      placeholder="Seleccione PDF"
                      prepend-icon="mdi-file"
                      label="Archivo"
                      :disabled="option === 2 ? true : false"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                    
                  </v-col>

                  <!-- <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="publicationsData.subTitle"
                        :label="$t('publications.subtitle')"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col> -->
<!-- 
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="publiData.datePublication"
                      class="purple-input"
                      :label="$t('publications.datePublication')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col> -->

                  <v-col cols="12">
                    <v-textarea
                      v-model="publiData.description"
                      :label="$t('publications.description')"
                      class="purple-input"
                      :disabled="option === 2 ? true : false"
                    ></v-textarea>
                  </v-col>
                  <!-- <v-col
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
                        :disabled="option===2?true:false"
                        return-object
                       single-line
                        
                      >
                        <template v-slot:item="{ attrs, item, on }">
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
                        </template>
                      </v-select>
                    
                     
                    </v-col>  -->

                  <!-- <v-col
                      cols="12"
                      sm="4"
                    >
                   
                      <v-file-input
                    
                        
                        accept="image/png, image/jpeg,"
                        placeholder="Seleccione foto "
                        prepend-icon="mdi-camera"
                        label="Banner foto"
                        :disabled="option===2?true:false"
                        
                      ><template v-slot:selection="{ text }">
                          <v-chip
                            small
                            label
                            color="secondary"
                          >
                            {{ text }}
                          </v-chip>
                        </template></v-file-input>
                   
                    </v-col> -->
                  <!-- <v-col
                      cols="12"
                      sm="4"
                    >
                   
                      <v-file-input
                     
                        :rules="rules"
                        accept="image/png, image/jpeg,"
                        placeholder="Seleccione las imagenes"
                        multiple
                        prepend-icon="mdi-camera"
                        label="Galeria"
                        counter
                        :disabled="option===2?true:false"
                      > <template v-slot:selection="{ text }">
                          <v-chip
                            small
                            label
                            color="#75B768"
                          >
                            {{ text }}
                          </v-chip>
                        </template></v-file-input>
                   
                    </v-col> -->

                  <v-col cols="12" class="text-right">
                    <v-btn v-if="option !== 2" color="success" class="mr-0" @click="submit">
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
                </v-row>
                 <!-- <label for="">hola  soy bata</label>
                 <template>
                  <pdf src="https://docs.bvsalud.org/biblioref/2018/08/909258/diseno-de-un-proyecto-de-aula-para-fortalecer-el-conocimiento-s_DKpF7Yo.pdf"
                 ></pdf>
</template>
                 -->
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
import {createpublications, updatepublications , uploadpdf} from "../../../api/modules/publications";
import pdf from 'vue-pdf';

export default {
  components :{
  pdf,
 },
  data: () => ({
    tabs: 0,
    option: 0,
    title: "",
    filePdf: null,
    urlfilePdf: "",
    currentPage: 0,
			pageCount: 0,
    //   rules: [
    //   value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    // ],
    publiData: {
      idPublicationsLanding : null,
      title: "",
      description: "",
      pdf: null,
      datePublication: "",
    },
  }),
  computed: {
    getTitle() {
      if (this.option === 1) return i18n.t("publications.create");
      else if (this.option === 2) return i18n.t("publications.show");
      else if (this.option === 3) return i18n.t("publications.edit");
      else return i18n.t("publications.head");
    },
    getTitleButton() {
      if (this.option === 1) return i18n.t("crud.create");
      else if (this.option === 2) return i18n.t("crud.show");
      else if (this.option === 3) return i18n.t("crud.edit");
      else return i18n.t("publications.head");
    },
  },
  mounted() {
    // console.log($t('roles.title'))
    // this.data();
    this.initialize();
    // this.createPublications();
  },
  methods: {
    initialize() {
      this.option = this.$route.params.option;
      if (this.option === 3 || this.option === 2) {
        this.publiData = this.$route.params.publiData;
        console.log("hola soy bata")
        console.log(this.publiData);
        console.log(this.option)
      }
    },

    async submit() {
      if (this.option === 1) {
        console.log("Entra al metodo")
        await this.upload();
      //  await this.upload();
        let newPub = {
          title: this.publiData.title,
          description: this.publiData.description,
          filePdf: this.urlfilePdf,
          datePublication: new Date().toISOString(),
        };

       // newPub = await createpublications(newPub);
        // console.log(newPub)
        console.log("esta es la publicacion",newPub);
       var publications = await createpublications(newPub);
         if(publications != null){
          console.log("Tituulo de la publicacion", publications);
          alert("Publicación creada con exito")
        }
      }
      if(this.option === 3){
        console.log("Actualizar")
        let pub = {
          idPublicationsLanding : this.publiData.idPublicationsLanding,
          title: this.publiData.title,
          description: this.publiData.description
        };

       // newPub = await createpublications(newPub);
        // console.log(newPub)
        console.log("estos son los datos",pub);
       var publicationsUpdate = await updatepublications(pub);
         if(publicationsUpdate  != null){
          console.log("Tituulo de la publicacion", publicationsUpdate );
          alert("Publicación Actualizada con exito")
        }
      }
    },
    
    async upload() {
      const formData = new FormData();
      formData.append("file", this.filePdf);
      let result;
      result = await uploadpdf(formData);

      console.log("ulrPDF ", result)
      this.urlfilePdf = result;
    },


    // chooseFiles() {
    //   document.getElementById("fileUpload").click();
    // },
  }, //
};
</script>
