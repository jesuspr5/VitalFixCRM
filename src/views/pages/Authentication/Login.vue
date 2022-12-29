<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              v-model="form.email"
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              prepend-icon="mdi-lock-outline"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click="submit"
            >
              Let's Go
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  const defaultForm = {
    email: '',
    password: '',
  }
  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('../components/Btn'),
    },

    data: () => ({
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      form: Object.assign({}, defaultForm),
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min  characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },

    }),
    methods: {
      ...mapActions(['loginAction']),
      submit () {
        console.log()
        this.loginAction({ email: this.form.email, password: this.form.password })
      },
    },

  }
</script>
