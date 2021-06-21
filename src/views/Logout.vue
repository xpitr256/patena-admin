<template> </template>

<script>
export default {
  name: "Logout",
  created() {
    localStorage.removeItem("user-token");
    this.$router.push("/login");
  }
};
</script>

<style scoped></style>
