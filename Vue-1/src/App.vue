<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    name: '',
  }),
  methods: {
    async checklogin() {
      await this.$store.dispatch('tryLogin');
    },
  },
  mounted() {
    this.checklogin();
  },
};
</script>
