<template>
  <v-container
    id="Servicios-profile"
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
              <v-icon class="mr-2">mdi-account-key</v-icon>
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
          <v-tab-item :key="0">
            <v-form ref="form" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.name"
                      :label="$t('users.Name')"
                      class="purple-input"
                      :readonly="option === 2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.lastname"
                      :label="$t('Apellido')"
                      class="purple-input"
                      :readonly="option === 2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.email"
                      :label="$t('users.email')"
                      class="purple-input"
                      :readonly="option === 2 || option === 3"
                      :rules="[rules.required,rules.emailRules]"
                    />
                  </v-col>
                  <v-col :hidden="option==3 || option==2" cols="12"  md="6">
                    <v-text-field
                      v-model="user.password"
                      :type="show1 ? 'text' : 'password'"
                      :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
                      :label="$t('users.password')"
                      prepend-icon="mdi-lock-outline"
                      class="purple-input"
                      hint="At least 6 characters"
                      :readonly="option === 3"
                      counter
                      @click:append="show1 = !show1"
                      :rules="[rules.required,rules.min]"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.address"
                      label="Direccion"
                      class="purple-input"
                      :readonly="option === 2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.reference"
                      label="Referencia"
                      class="purple-input"
                      :readonly="option === 2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col
                      :hidden="option==2" cols="4">
                        <v-select
                          v-model="code"
                          :items="codes"
                          label="Código de Área"
                          item-text="name"
                          item-value="name"
                          class="purple-phone"
                          prepend-icon="mdi-cellphone"
                          outlined
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="user.phone"
                          color="secondary"
                          label="Teléfono"
                          :rules="[rules.required]"
                          :readonly="option === 2"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="user.role"
                      :items="roles"
                      :label="$t('users.rol')"
                      item-text="name"
                      item-value="id"
                      class="purple-input"
                      outlined
                      :readonly="option === 2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      v-if="option !== 2"
                      color="success"
                      class="mr-0"
                      @click="submit"
                    >
                      {{ getTitleButton }}
                    </v-btn>
                  </v-col>
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
                        Cerrar
                      </v-btn>
                    </template>
                  </v-snackbar>
                </div>
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
  import {createUser,updateUser} from '../../../api/modules/user'

  export default {

    data: () => ({
      tabs: 0,
      option: 0,
      setTimeout:0,
      show1: false,
      title: '',
      snackbar: '',
      message: '',
      code:'',
      user: {
        id: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        role: '',
        urlAvatar: '',
        reference:'',
        address:'',
        phone:''
      },
      roles:[
        {
          name:"admin"
        },
        {
          name:"tecnico"
        },
        {
          name:"user"
        }
      ],
      rules: {
        required: value => !!value || 'este dato es obligatorio.',
        min: v => v.length >= 6 || 'Mínimo 6 caracteres',
        emailRules: v => /.+@.+\..+/.test(v) || 'el correo deber ser valido. Ejemplo@email.com',
        // passwordMatch: v => v === this.user.password || 'Las contraseñas deben coincidir'
      
        // emailMatch: () => "El correo y la contraseña no coinciden"
      },
      codes:[
        {
          name:'0412'
        },
        {
          name:'0414'
        },
        {
          name:'0424'
        },
        {
          name:'0416'
        },
        {
          name:'0426'
        },
        {
          name:'0251'
        }
      ],

     


    }),
    computed: {
      getTitle () {
        if (this.option === 1) return i18n.t('users.create')
        else if (this.option === 2) return i18n.t('users.show')
        else if (this.option === 3) return i18n.t('users.edit')
        else return i18n.t('users.head')
      },
      getTitleButton () {
        if (this.option === 1) return i18n.t('crud.create')
        else if (this.option === 2) return i18n.t('crud.show')
        else if (this.option === 3) return i18n.t('crud.edit')
        else return i18n.t('users.head')
      },
    },
    mounted () {
      this.initialize()
    },

    watch: {
  option(newVal) {
    if (newVal === 3 && this.user.phone.length > 11) {
      this.user.phone = this.user.phone.substring(4);
    }
  }
},
    methods: {
      initialize () {
        this.option = this.$route.params.option
        if (this.option === 3 || this.option === 2) {
          this.user = this.$route.params.usersData;
        }
       
         
      },

     async  submit () {
        if (this.option === 1) {
          if (this.$refs.form.validate()) {

            let user = {
              name: this.user.name,
              lastname: this.user.lastname,
              email: this.user.email,
              password : this.user.password,
              role: this.user.role,
              reference:this.user.reference,
              address: this.user.address,
              phone: this.code+this.user.phone,
              urlAvatar:""

            }
           
             user = await createUser(user)

            if (user.status==201) {
              this.snackbar = true
              this.message = 'Registro exitoso'
            
               setTimeout(() => {
                 this.$router.push({ name: 'Users' })
               }, 2000)
            } else {
              this.snackbar = true
              this.message = 'Hubo un error durante el registro'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }

          } else {
            this.snackbar = true
            this.message = 'Debe llenar todos los campos requeridos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }  
        if (this.option === 3) {
          if (this.$refs.form.validate()) {

            let id = this.user.id
            console.log("🚀 ~ submit ~ id:", id)
            let user = {
              name: this.user.name,
              lastname: this.user.lastname,
              reference:this.user.reference,
              address: this.user.address,
              phone: this.code+this.user.phone,
            }
            console.log("🚀 ~ submit ~ user:", user)
            user = await updateUser(user,id)
            if (user.status == 200) {
              this.snackbar = true
              this.message = 'Actualizacion exitosa'
              setTimeout(() => {
                this.$router.push({ name: 'Users' })
              }, 2000)
            } else {
              this.snackbar = true
              this.message = 'Hubo un error durante la actualizacion'
              setTimeout(() => {
                this.snackbar = false
              }, 1000)
            }
          } else {
            this.snackbar = true
            this.message = 'Debe llenar todos los campos requeridos'
            setTimeout(() => {
              this.snackbar = false
            }, 1000)
          }
        }
      },
    },
  }
</script>

<style>
.lbl {
  padding: 0.5em;
  margin: auto;
}
</style>