<template>
    <v-container>
      <v-row justify="center">
        <base-material-card icon="mdi-file-document">
          <template v-slot:heading>
            <div>{{ ("Servicio") }}</div>
          </template>
          
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="request.name" label="Nombre del servicio" readonly />
              </v-col>
          
              <v-col cols="12">
                <v-text-field v-model="request.price" label="Precio" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="request.description" label="Description" readonly />
              </v-col>
              
              <v-col cols="12">
                <v-text-field v-model="service.name" label="Tipo" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="service.warrantyDays" label="Dias de Garantias" readonly />
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
      name: 'DetailsService',
      data: () => ({

          request: {
              name: '',
              price: '',
              description: ''
          },
          service:{
            name:'',
             warrantyDays: 0,
          }
        
      }),
      mounted() {
        this.getRequestDetails();
      },
      methods: {
        getRequestDetails() {   
         this.option = this.$route.params.option
        if (this.option === 4 ) {
          this.request = this.$route.params.requestsData.service
          this.service= this.$route.params.requestsData.service.type
          
          
          
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
  