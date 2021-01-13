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
            type="number"
            id="name"
            v-model.trim="otp"
            label="OTP"
            required
          ></v-text-field>

          <v-btn class="mr-4" @click="submitForm" depressed color="primary"
            >Verify OTP</v-btn
          >
        </form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: null,
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;

      this.isLoading = true;

      const actionPayload = {
        otp: this.otp,
      };

      try {
        await this.$store.dispatch('verifyOtp', actionPayload);

        const redirectUrl = `/${this.$route.query.redirect || 'home'}`;
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
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
