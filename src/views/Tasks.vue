<template>
  <div class="home pa-6">
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
        class="elevation-5"
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
        <v-icon left small color="green" v-if="item.emailSent">
          mdi-check-bold
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            class="mr-2"
            @click="showItem(item)"
        >
          mdi-file-find
        </v-icon>
        <v-icon v-if="item.status === 'Cancelled'"
            class="mr-2"
            @click="showItem(item)"
        >
          mdi-reload
        </v-icon>
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
        { text: 'Creation Date', value: 'date' },
        { text: 'Status', value: 'status' },
        { text: 'Duration (min)', value: 'duration' },
        { text: 'Email', value: 'email' },
        { text: 'Type', value: 'type' },
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
          emailSent: false
        },
        {
          id: 'f8e8033e-f04f-4dc0-b5eb-4117a8e6974d',
          date: '11-02-2021 19:44 hs',
          status: 'In Progress',
          duration: '-',
          type: 'Only flanking',
          email: 'test2@patena.com.ar',
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '14-02-2021 04:44 hs',
          status: 'Waiting',
          duration: '-',
          type: 'No initial data',
          email: 'test3@patena.com.ar',
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '15-02-2021 12:00 hs',
          status: 'Waiting',
          duration: '-',
          type: 'Flanking + initial sequence',
          email: 'test3@patena.com.ar',
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '18-02-2021 19:45 hs',
          status: 'Waiting',
          duration: '-',
          type: 'Initial sequence',
          email: 'test3@patena.com.ar',
          emailSent: false
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '28-02-2021 19:45 hs',
          status: 'Finished',
          duration: '18',
          type: 'Initial sequence',
          email: 'test_finished@patena.com.ar',
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '24-02-2021 19:45 hs',
          status: 'Finished',
          duration: '220',
          type: 'Initial sequence',
          email: 'help@patena.com.ar',
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '16-02-2021 19:45 hs',
          status: 'Finished',
          duration: '96',
          type: 'Initial sequence',
          email: 'support@patena.com.ar',
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '13-02-2021 19:45 hs',
          status: 'Finished',
          duration: '18',
          type: 'Initial sequence',
          email: 'test_finished@patena.com.ar',
          emailSent: true
        },
        {
          id: '5a11baea-ba3e-422a-92cc-a167c71496eb',
          date: '01-02-2021 10:00 hs',
          status: 'Cancelled',
          duration: '-',
          type: 'Initial sequence',
          email: 'cancelled@patena.com.ar',
          emailSent: true
        }
      ]
    },
    showItem (item) {
      //go to item detail page
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
