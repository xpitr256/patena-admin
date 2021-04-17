<template>
  <div class="pa-6">
    <h1>Tasks</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col
              cols="12"
              sm="4"
          >
            <v-text-field
                outlined
                label="Order number"
                prepend-inner-icon="mdi-magnify"
            ></v-text-field>

          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table
        :headers="headers"
        :items="tasks"
        class="elevation-5 table-cursor"
        @click:row="showDetails"
    >
      <template v-slot:item.status="{ item }">
        <v-chip
            :color="getColor(item.status)"
            dark
            label
            class="font-weight-bold"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.email }}
        <v-icon left small color="green" v-if="item.emailSent" >
          mdi-check-bold
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn  :to="{name:'Task', params: {id: item.id, task: item}}"
               fab
               x-small
                color="info"
                class="ma-2"
        >
          <v-icon>
            mdi-file-find
          </v-icon>
        </v-btn>
        <v-btn v-if="item.status === 'Cancelled'" :to="{name:'Task', params: {id: item.id, task: item}}"
            class="mx-2 white--text"
            fab
            x-small
            color="amber darken-3"
        >
          <v-icon>
            mdi-reload
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>

  </div>
</template>

<script>


export default {
  name: 'Tasks',
  data: () => ({
    headers: [
        { text: 'Order Number', value: 'id', sortable: false},
        { text: 'Status', value: 'status' },
        { text: 'Creation Date', value: 'date' },
      { text: 'Email', value: 'email' },
      { text: 'Type', value: 'type' },
      { text: 'Duration (min)', value: 'duration' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      tasks: [],
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.tasks = [
        {
          id: '7da10fc2-ad51-451c-b491-09a653de8fe0',
          date: '11-02-2021 18:44 hs',
          status: 'In Progress',
          duration: '-',
          type: 'Initial Sequence',
          email: 'test@patena.com.ar',
          attempts: 1,
          emailSent: false
        },
        {
          id: 'f8e8033e-f04f-4dc0-b5eb-4117a8e6974d',
          date: '11-02-2021 19:44 hs',
          status: 'In Progress',
          duration: '-',
          type: 'Only flanking',
          email: 'test2@patena.com.ar',
          attempts: 1,
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e8',
          date: '14-02-2021 04:44 hs',
          status: 'Waiting',
          duration: '-',
          type: 'No initial data',
          email: 'test3@patena.com.ar',
          attempts: 0,
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e7',
          date: '15-02-2021 12:00 hs',
          status: 'Waiting',
          duration: '-',
          type: 'Flanking + initial sequence',
          email: 'test3@patena.com.ar',
          attempts: 0,
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e6',
          date: '18-02-2021 19:45 hs',
          status: 'Waiting',
          duration: '-',
          type: 'Initial sequence',
          email: 'test3@patena.com.ar',
          attempts: 0,
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a1AAAAAAAAAA',
          date: '28-02-2021 19:45 hs',
          status: 'Finished',
          duration: '18',
          type: 'Initial sequence',
          data: {
            initialSequence: '>sp|P60844|AQPZ_ECOLI Aquaporin Z OS=Escherichia coli (strain K12) OX=83333 GN=aqpZ PE=1 SV=1\n' +
                'AMAIYLTAGVSGAHLNPAVTIALWLFACFDKRKVIPFIVSQVAGAFCAAALVYGLYYNL',
            initialScore: 348,
            result: 'NNLGEEKGECVGVGTKGRQKAMGRCPVLGEALDEYPINHPCKIGHHLGHLALGPIPLGL',
            finalScore: 0
          },
          email: 'test_finished@patena.com.ar',
          attempts: 1,
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e4',
          date: '24-02-2021 19:45 hs',
          status: 'Finished',
          duration: '220',
          type: 'Initial sequence',
          email: 'help@patena.com.ar',
          attempts: 2,
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e3',
          date: '16-02-2021 19:45 hs',
          status: 'Finished',
          duration: '96',
          type: 'Initial sequence',
          email: 'support@patena.com.ar',
          attempts: 3,
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e2',
          date: '13-02-2021 19:45 hs',
          status: 'Finished',
          duration: '18',
          type: 'Initial sequence',
          email: 'test_finished@patena.com.ar',
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496e1',
          date: '01-02-2021 10:00 hs',
          status: 'Cancelled',
          duration: '-',
          type: 'Initial sequence',
          email: 'cancelled@patena.com.ar',
          attempts: 3,
          emailSent: true
        }
      ]
    },
    showDetails (item) {
      this.$router.push({name:'Task', params: {id: item.id, task: item}})
    },
    getColor (status) {
      if (status === 'In Progress') return 'blue'
      if (status === 'Waiting') return 'blue-grey'
      if (status === 'Finished') return 'green'
      return 'red'
    },
  },
}
</script>
<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
