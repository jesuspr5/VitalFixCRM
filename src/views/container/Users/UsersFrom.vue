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
              <v-icon class="mr-2"> mdi-account-tie</v-icon>
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
              color="secondary"
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
                      :label="$t('users.name')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="publiData.title"
                      class="purple-input"
                      :label="$t('users.lastname')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="publiData.title"
                      class="users.email"
                      :label="$t('users.')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="publiData.title"
                      class="purple-input"
                      :label="$t('users.datebird')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  
                
                  <v-col cols="12" class="text-right">
                    <v-btn v-if="option !== 2" color="success" class="mr-0" @click="submit">
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
  </v-container>
</template>

<script>
import i18n from "@/i18n";

export default {
  data: () => ({
    tabs: 0,
    option: 0,
    title: "",
    filePdf: null,
    urlfilePdf: "",
    //   rules: [
    //   value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    // ],
    publiData: {
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
      else return i18n.t("users.title");
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
        console.log(this.publiData);
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
