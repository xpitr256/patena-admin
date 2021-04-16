<template>
  <div class="pa-6">
    <h1>Task details</h1>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-subheader>Order number</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
              disabled
              v-model="task.id"
              solo
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-subheader>Creation Date</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
              disabled
              v-model="task.date"
              solo
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </div>
</template>

<script>
export default {
  name: "Task",
  data : () => ({
    task : {}
  }),
  async created() {
    this.task = this.$route.params.task
    if (!this.task) {
      console.log("loading task...")
    }
  }
}
</script>

<style scoped>

</style>