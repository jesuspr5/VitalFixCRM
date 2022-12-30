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
          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item :kei="0">
              <v-form>
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
                        :disabled="option===2?true:false"
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
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="blogData.description"
                        :label="$t('blogs.description')"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="roleData.functions"
                        color="secondary"
                        item-color="secondary"
                        :label="$t('roles.functions')"
                        multiple
                        :items="functions"
                        :disabled="option===2?true:false"
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
                    </v-col> -->
                    <v-col
                      cols="12"
                      class="text-right"
                    >
                      <v-btn
                        v-if="option!==2"
                        color="success"
                        class="mr-0"
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
    </v-container>
  </template>
  
  <script>
    import i18n from '@/i18n'
    export default {
      data: () => ({
        tabs: 0,
        option: 0,
        title: '',
        blogData: {
            title: "",
            subTitle: "",
            description: "",
            datePublication: "2022-12-30T15:28:13.569Z",
            idCatType: 0,
            mainPhoto: "",
            bannerPhoto: ""
                    },
    //   functions: ['demo', 'demo2  '],
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
        // console.log($t('roles.title'))
        this.initialize()
      },
      methods: {
        initialize () {
          this.option = this.$route.params.option
          if (this.option === 3 || this.option === 2) {
            this.blogData = this.$route.params.blogData .blog
            console.log(this.blogData )
          }
        },
        async submit () {
          if (this.option === 1) {
            let serviceResponse = await createBlogs(this.blogData )
            if (serviceResponse.ok === 1) {
              console.log(serviceResponse)
            } else {
              console.log(serviceResponse)
              const params = { text: serviceResponse.message.text }
              window.getApp.$emit('SHOW_ERROR', params)
            }
          } else if (this.option === 3) {
            let serviceResponse = await editBlogs(this.blogData.id, this.blogData)
            if (serviceResponse.ok === 1) {
              console.log(serviceResponse)
            } else {
              console.log(serviceResponse)
              const params = { text: serviceResponse.message.text }
              window.getApp.$emit('SHOW_ERROR', params)
            }
          }
        },
      }, //
    }
  </script>
  