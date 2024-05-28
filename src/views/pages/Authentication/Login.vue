<template>
  <v-container
    id="login"
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
                Login
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
               required
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                prepend-icon="mdi-lock-outline"
                hint="minimo 8 caracteres"
                counter
              :rules="[rules.required,rules.min]"
                @click:append="show1 = !show1"
              />
              <br>
              <pages-btn
                large
                dark
                color="success"
                depressed
                class="v-btn--text white--text font-weight-bold"
                style="text-transform: capitalize;"
                @click="submit"
              >
                Iniciar sesión
              </pages-btn> 
            </v-form>
            <v-col cols="12">
              <pages-btn
                large
                dark
                color="white"
                depressed
                class="v-btn--text success--text font-weight-bold"
                style="text-transform: capitalize;"
               @click="goToRegister"
              >
               Registrar
              </pages-btn>
            </v-col>

            
            
          </v-card-text>
         
        </base-material-card>
      </v-slide-y-transition>
    </v-row>

  
      

    <v-dialog
      v-model="dialog"
      max-width="290"
      class="dialog-error"
    >
      <v-card class="card-error">
        <v-card-title class="text-h5 textt">
          {{ message }}
        </v-card-title>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="white"
            text
            @click="dialog = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  
</template>

<script>
// import { mapActions } from "vuex";
// const defaultForm = {
//   email: "",
//   password: ""
// };
  import {apiHttp} from '../../../api/axiosApi'
 
  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('../components/Btn'),
    },

    data: () => ({
      snackbar:'false',
      message2:'',
      timeout:0,
      dialog: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      message: '',
      valid: true,
      new: {},
      user: {
        email: '',
        password: '',
      },
      rules: {
        required: value => !!value || 'Debe ingresar este campo.',
        min: v => v.length >= 5 || 'Mínimo 8 caracteres',
        emailRules: v =>
          /.+@.+\..+/.test(v) || 'el correo deber ser valido. Ejemplo@gmail.com',
         // emailMatch: () => "El correo y la contraseña no coinciden"
      },
    }),
    methods: {
      
  async submit() {
    if (this.$refs.form.validate()) {
      const userToLogin = {
        email: this.user.email,
        password: this.user.password,
      };

      // Llama a la API para autenticar al usuario
      const result = await apiHttp('post', '/api/v1/auth/login', userToLogin);
      if (result.status==201) {
        // Autenticación exitosa, redirige al usuario al dashboard
        localStorage.setItem("rol",result.data.role)
       let role= localStorage.getItem("rol")
       
       if(role !== 'user'){
        localStorage.setItem("token",result.data.token)
        localStorage.setItem("rol",result.data.role)
      this.$router.push('/home/Dashboard'); 
        
          
        }else{
          this.dialog = true
        this.message= 'usuario no registrado'
        localStorage.removeItem('rol')
        }
      
      } else {
        // Muestra un mensaje de error si la autenticación falla
        this.dialog = true;
        this.message = result.message.text;
      }
     
    } else {
      // Muestra un mensaje si los campos no están completos
      this.dialog = true;
      this.message = 'Debe llenar todos los campos';
    }
  },

  
    goToRegister() {
      this.$router.push('Register');
    
  }
},

    
  }
</script>

<style scoped>
.card-error {
  background-color: rgb(57, 166, 57);
}

.dialog-error {
  margin-top: 70%;
}
.textt {
  color: white;
}
</style>


