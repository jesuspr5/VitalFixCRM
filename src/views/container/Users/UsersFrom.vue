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
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="userData.names"
                      class="purple-input"
                      :label="$t('users.name')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="userData.lastNames"
                      class="purple-input"
                      :label="$t('users.lastname')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="userData.email"
                      class="users.email"
                      :label="$t('users.')"
                      :disabled="option === 2 ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="userData.phone"
                      class="purple-input"
                      :label="$t('users.phone')"
                      :disabled="option === 2 ? true : false"
                    />
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
    userData: {
      idUserLanding: null,
      names: "",
      lastNames: "",
      email: "",
      phone: "",
      photo: "",
    },
  }),
  computed: {
    getTitle() {
   if (this.option === 2) return i18n.t("users.show");
    
      else return i18n.t("users.head");
    },
    getTitleButton() {
      if (this.option === 2) return i18n.t("crud.show");
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
        this.userData = this.$route.params.userData;
        console.log(this.userData);
      }
    },

   


  }, 
};
</script>
