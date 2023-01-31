<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="greenligth"
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
                label="Correo Electronico"
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.emailRules]"
                required
              />

              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                prepend-icon="mdi-lock-outline"
                hint="At least 8 characters"
                counter
                required
                @click:append="show1 = !show1"
              />

              <pages-btn
                large
                dark
                color=""
                depressed
                class="v-btn--text success--text"
                style="text-transform: capitalize;"
                @click="submit"
              >
                Iniciar sesión
              </pages-btn>
            </v-form>
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

  import { loginUser } from '../../../api/modules/user'
  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('../components/Btn'),
    },

    data: () => ({
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
        required: value => !!value || 'Debe ingresar su contraseña.',
        min: v => v.length >= 5 || 'Mínimo 8 caracteres',
        emailRules: v =>
          /.+@.+\..+/.test(v) || 'el correo deber ser valido. Ejemplo@gmail.com',
      //    emailMatch: () => "El correo y la contraseña no coinciden"
      },
    }),
    methods: {
      async submit () {
        if (this.$refs.form.validate()) {
          let userToLogin = {
            email: this.user.email,
            password: this.user.password,
            rememberMe: true,
          }
          // this.new = userToLogin;
          console.log('usuario' + userToLogin)
          console.log(userToLogin)

          let result
          result = await loginUser(userToLogin)
          console.log('token' + result)
          console.log(result.message)
          var mess = result.message
          var token = result.data
          switch (mess) {
            case 'Input string was not in a correct format.':
              this.dialog = true
              this.message = 'El usuario no esta registrado'
              break
            case 'Contraseña inválida':
              this.dialog = true
              this.message = 'La contraseña es invalida'
              break
            case '':
              localStorage.setItem('token', token)
              this.$router.push('/home/users/users')
              break
            default:
              this.dialog = true
              this.message = 'Hubo un error.!'

              break
          }
        } else {
          this.dialog = true
          this.message = 'Debe llenar todos los campos'
        }
      },
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


