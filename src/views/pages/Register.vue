<template>
 
  <v-container
    id="register"
    class="fill-height"
    tag="section"
  >
  <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="gray"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-3 font-weight-bold mb-1">
                Registrar
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-text-field
                v-model="user.name"
                color="secondary"
                label="Nombre"
                prepend-icon="mdi-pencil"
                :rules="[rules.required]"
               
              />
              <v-text-field
                v-model="user.lastname"
                color="secondary"
                label="Apellido"
                prepend-icon="mdi-pencil"
               
                :rules="[rules.required]"
              />
             
              <v-text-field
                v-model="user.email"
                color="secondary"
                label="Correo electrónico"
                prepend-icon="mdi-email"
                required
                :rules="[rules.required,rules.emailRules]"
               
              />

              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
                :rules="[rules.required,rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                prepend-icon="mdi-lock-outline"
                hint="At least 6 characters"
                counter
              
                @click:append="show1 = !show1"
              />

              <v-text-field
                v-model="user.address"
                color="secondary"
                label="Direcciom"
                prepend-icon="mdi-map-marker"
                :rules="[rules.required]"
               
              />

              <v-text-field
                v-model="user.reference"
                color="secondary"
                label="Reference"
                prepend-icon="mdi-feather"
                :rules="[rules.required]"
               
              />
             

              <v-row>
    <!-- Código de Área Select -->
    <v-col cols="5">
      <v-select
        v-model="code"
        :items="codes"
        label="Código de Área"
        item-text="name"
        item-value="id"
        class="purple-phone"
        prepend-icon="mdi-cellphone"
        outlined
        :rules="[rules.required]"
      />
    </v-col>

    <!-- Número de Teléfono Input -->
    <v-col cols="7">
      <v-text-field
        v-model="user.phone"
        color="secondary"
        label="Teléfono"
      
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
             
              <!-- <v-text-field
               v-model="user.confirmPass"
                :append-icon="show2 ? 'mdi-eye' : ' mdi-eye-off'"
                :rules="[rules.required,rules.min,rules.passwordMatch]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirmar contraseña"
                prepend-icon="mdi-lock-outline"
                hint="At least 8 characters"
                counter
              
                @click:append="show2 = !show2"
              /> -->
              <br>

              <br>

              <v-select
                    v-model="user.role"
                    :items="roles"
                    label="Rol"
                    item-text="name"
                    item-value="id"
                    class="purple-input"
                    outlined
                    :rules="[rules.required]"
                  />

              <v-checkbox
              :rules="[rules.required]"
                    :input-value="true"
                    color="secondary"
                  >
                    <template v-slot:label>
                      <span class="text-no-wrap">Yo Acepto los&nbsp;</span>

                      <a
                        class="secondary--text ml-6 ml-sm-0"
                        href="#"
                      >
                        terms and conditions </a>.
                    </template>
                  </v-checkbox>
              <pages-btn
                large
                dark
                color="blue"
                depressed
                class="v-btn--text white--text font-weight-bold"
                style="text-transform: capitalize;"
                @click="submit"
              >
                REGISTRAR
              </pages-btn>

            </v-form>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
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
</template>

<script>

import {apiHttp} from '../../api/axiosApi'
  export default {
    name: 'PagesRegister',

    components: {
      PagesBtn: () => import('./components/Btn'),
      PagesHeading: () => import('./components/Heading'),
    },

    data: () => ({
      Timeout:0,
      snackbar: false,
      message:'',
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      valid: true,
      user:{
        name:'',
        lastname:'',
        role:'',
        email:'',
        password:'',
        reference:'',
        address:'',
        phone:'',
        code:''
       
      },
      roles: [
        {
          name:'admin',
        },
        {
          name:"tecnico"
        },
       
      ],
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

      rules: {
        required: value => !!value || 'este dato es obligatorio.',
        min: v => v.length >= 6 || 'Mínimo 6 caracteres',
        emailRules: v => /.+@.+\..+/.test(v) || 'el correo deber ser valido. Ejemplo@email.com',
        // passwordMatch: v => v === this.user.password || 'Las contraseñas deben coincidir'
      
        // emailMatch: () => "El correo y la contraseña no coinciden"
      },
     
    }),

    methods: {
    async submit() {
      if (this.$refs.form.validate()) {

        let user = {
        name:this.user.name,
        lastname:this.user.lastname,
        role: this.user.role,
        email: this.user.email,
        password: this.user.password,
        address: this.user.address,
        reference : this.user.reference,
        phone : this.code+this.user.phone

      };
    const   result = await apiHttp('post', '/api/v1/auth/register',user)

        if (result.status==201) {
       
        this.snackbar = true;
        this.message = "Registro exitoso";
        setTimeout(() => {
                this.$router.push({ name: 'Login' })
              }, 2000)
              
      
      } else {
        // Muestra un mensaje de error si la autenticación falla
        this.dialog = true;
        this.message = result.message.text;
      }
      }else{
        this.snackbar = true;
      this.message = 'Debe llenar todos los campos';
      }
    }
  }
  }
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
