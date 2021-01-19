<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">My App</div>

      <v-spacer></v-spacer>

      <v-btn @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
     Home
    </v-main>
  </v-app>
</template>

<script>
export default {

  data: () => ({
    data: '',
  }),
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.replace('/auth');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async getData() {
      this.data = await this.$store.dispatch('getUser');
    },
  },
};
</script>
