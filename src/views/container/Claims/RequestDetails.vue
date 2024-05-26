<template>
    <v-container>
      <v-row justify="center">
        <base-material-card icon="mdi-file-document">
          <template v-slot:heading>
            <div>{{ $t("requests.head") }}</div>
          </template>
          
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="request.details" label="Details" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.maker" label="Maker" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.model" label="Model" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.serial" label="Serial" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.description" label="Description" readonly />
              </v-col>
              
              <v-col cols="12">
                <v-text-field v-model="request.name" label="Name" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.lastname" label="Lastname" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.email" label="Email" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.phone" label="Phone" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.address" label="Address" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.reference" label="Reference" readonly />
              </v-col>
             
              <v-col cols="6">
                <v-img :src="request.urlAvatar" max-height="300"  max-width="350" contain />
               
              </v-col>
              <br>
              <v-col cols="12">
                <v-btn color="primary" @click="goBack()">Atras</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
         
        </base-material-card>
       
      </v-row>
    </v-container>
  </template>
  
  <script>
    export default {
      name: 'RequestDetails',
      data: () => ({
       
          request: {
            details: '',
            maker: '',
            model: '',
            serial: '',
            description: '',
            urlAvatar: '',
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            reference: ''
          }
        
      }),
      mounted() {
        this.getRequestDetails();
      },
      methods: {
        getRequestDetails() {   
         this.option = this.$route.params.option
        if (this.option === 4 ) {
          this.request = this.$route.params.request.request
          
          
        } 
          },
          goBack() {
        this.$router.go(-1);
      }
        },
      
      }
  </script>
  
  <style>
  </style>
  