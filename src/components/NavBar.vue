<template>
  <v-app-bar class="navbar align-center justify-space-between" color="#1f4a61">
    <v-row dense>
      <v-col cols="2" class="d-flex align-center">
        <v-icon class="ml-4">mdi-domain</v-icon>
        <h2 class="logo-enterprise ml-6">ECENG</h2>
        <h2 class="logo-name">NEXUS</h2>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar.vue",
};
</script>

<style scoped>
.logo-enterprise,
.logo-name {
  font-size: 1.1rem;
  color: #ffffff;
  justify-self: flex-start;
}

.logo-name {
  margin-left: 40px;
}
</style>
