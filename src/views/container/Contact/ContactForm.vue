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
                    sm="6"
                  >
                    <v-text-field
                      v-model="contactData.names"
                      class="purple-input"
                      :label="$t('contact.names')"
                      readonly
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="contactData.email"
                      :label="$t('contact.email')"
                      class="purple-input"
                      readonly
                      :rules="[rules.required, rules.min]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-textarea
                      v-model="contactData.message"
                      :label="$t('contact.message')"
                      class="purple-input"
                      readonly
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
  import i18n from '@/i18n'
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
      urlMainPhoto: '',
      urlBannerPhoto: '',
      urlgalery: [],
      photos: [],
      rules: {
        sise: value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        required: value => !!value || 'Debe ingresar Texto.',
        min: v => v.length >= 5 || 'Mínimo 5 caracteres',
      },
      contactData: {
        idContactLanding: '',
        names: '',
        email: '',
        message: '',
      },
      selcatalog: [],
    }),
    computed: {
      getTitle () {
        if (this.option === 2) return i18n.t('contact.show')
        else return i18n.t('contact.head')
      },
      getTitleButton () {
        if (this.option === 2) return i18n.t('crud.show')
        else return i18n.t('blogs.head')
      },
    },
    mounted () {
      this.initialize()
    },
    methods: {
      async initialize () {
        this.option = this.$route.params.option
        if (this.option === 2) {
          this.contactData = this.$route.params.contactData
          console.log('estos es lo que trae', this.$route.params.contactData)
        }
      },
    },
  }
</script>

<style></style>
