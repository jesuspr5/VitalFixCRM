<template>
    <v-container
      id="data-tables"
      tag="section"
    >
      <base-material-card
        color="indigo"
        icon="mdi-vuetify"
        inline
        class="px-5 py-3"
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
            {{ $t('blogs.head') }}
          </div>
        </template>
  
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          label="Buscar"
          hide-details
          single-line
          style="max-width: 250px;"
        />
  
        <v-divider class="mt-3" />
  
        <v-data-table
          :headers="headers"
         :items="items"
          :search.sync="search"
          :sort-by="['id', 'titulo']"
          :sort-desc="[false, true]"
          multi-sort
          class="elevation-1"
        
        >
       
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
  
              :key="1"
              color="blue"
              fab
              class="px-1 ml-1"
              x-small
              @click="showBlogs(item)"
            >
              <v-icon
                small
                v-text="'mdi-eye'"
              />
            </v-btn>
            <v-btn
  
              :key="2"
              color="primary"
              fab
              class="px-1 ml-1"
              x-small
              @click="editBlogs(item)"
            >
              <v-icon
                small
                v-text="'mdi-pencil'"
              />
            </v-btn>
            <v-btn
  
              :key="3"
              color="secondary"
              fab
              class="px-1 ml-1"
              x-small
              @click="deleteBlogs(item)"
            >
              <v-icon
                small
                v-text="'mdi-delete'"
              />
            </v-btn>
          </template>
        </v-data-table>
        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              large
              color="primary"
              fixed
              right
              bottom
              @click="createBlogs"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </base-material-card>
    </v-container>
  </template>
  
  <script>
  
    import i18n from '@/i18n'
  import { blogsGetList} from '../../../api/modules/blogs'
    export default {
      name: 'DashboardDataTables',
  
      data: () => ({
        hidden: false,
        headers: [
        {
            text: i18n.t('blogs.title'),
            value: 'title',
          },
  
          {
            text: i18n.t('blogs.subtitle'),
            value: 'subTitle',
          },
          {
            text: 'Fecha',
            value: 'datePublication',
          },
          {
            sortable: false,
            text: 'Acciones',
            value: 'actions',
          },
        ],
        items: [],
        search: undefined,
      }),
      async mounted () {
        // window.getApp.$emit("SHOW_ERROR", "34534535")
       this.data();
      
      },
      methods: {
  
        data: async function(){
      let result;
      result = await blogsGetList (1,34)
      this.items = result
      // console.log('EL STOREE: ', result)
      // console.log('array',this.items)
    
    },

        // async loadRolesData () {
        //   console.log('mounted')
        //   let serviceResponse = await getRoles(1,5)
        //   if (serviceResponse.ok === 1) {
        //     console.log(serviceResponse)
        //     this.items = serviceResponse.data.data
        //     console.log(this.items)
        //   } else {
        //     console.log(serviceResponse)
        //     const params = { text: serviceResponse.message.text }
        //     window.getApp.$emit('SHOW_ERROR', params)
        //   }
        // },
        createBlogs () {
          console.log('create')
          this.$router.push({
            name: 'BlogsForm',
            params: {
              option: 1, // option 1 to create
            
            },
          })
        },
        showBlogs (item) {
          console.log(item)
          this.$router.push({
            name: 'BlogsForm',
            params: {
              option: 2, // option 2 to show
              blogData: item,
            },
          })
        },
        editBlogs (item) {
          console.log(item)
          this.$router.push({
            name: 'BlogsForm',
            params: {
              option: 3, // option 3 to edit
              blogData: item,
             
            },
          })
        },
        deleteBlogs (item) {
          console.log(item)
          console.log('Delete')
        },
      },
    }
  </script>
  