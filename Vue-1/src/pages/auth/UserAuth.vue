<template>
  <div>
    <div
      style="z-index: 10000; position: fixed; left: 40%; top: 30%"
      v-if="isLoading"
      title="Authenticating..."
      fixed
    >
      <v-progress-circular
        :size="150"
        :width="15"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-if="error">
      <v-alert
        dense
        dismissible
        elevation="7"
        outlined
        prominent
        type="error"
        >{{ error }}</v-alert
      >
    </div>
    <v-card class="d-flex pa-5 justify-center mb-6" flat tile>
      <v-card elevation="2">
        <form>
          <v-text-field
            v-if="mode != 'login'"
            type="text"
            id="name"
            v-model.trim="name"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            type="email"
            id="email"
            v-model.trim="email"
            required
            label="Email"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            type="password"
            id="password"
            v-model.trim="password"
            label="Password"
            required
          ></v-text-field>

          <v-btn class="mr-4" @click="submitForm" depressed color="primary">{{
            submitButtonCaption
          }}</v-btn>
          <v-btn @click="switchAuthMode"> {{ switchModeButtonCaption }} </v-btn>
        </form>
      </v-card>
    </v-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      }
      return 'Signup';
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      }
      return 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === ''
        || !this.email.includes('@')
        || this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
          const redirectUrl = `/${this.$route.query.redirect || 'home'}`;
          this.$router.replace(redirectUrl);
        } else {
          await this.$store.dispatch('signup', actionPayload);
          const redirectUrl = `/${this.$route.query.redirect || 'verifyOtp'}`;
          this.$router.replace(redirectUrl);
        }
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
