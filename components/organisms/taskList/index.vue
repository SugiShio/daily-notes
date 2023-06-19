<template lang="pug">
.o-task-list
  ul
    li(v-for='task in tasks') {{ task.title }}
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Task } from '~/models/task'

export default {
  name: 'OrganismsTaskList',
  data() {
    return {
      tasks: [],
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
  watch: {
    uid(uid) {
      if (uid) this.fetchTasks()
    },
  },
  created() {
    if (this.uid) {
      this.fetchTasks()
    }
  },
  methods: {
    async fetchTasks() {
      const q = query(
        collection(db, 'dailyNotes'),
        where('uid', '==', this.uid),
        where('type', '==', 'task'),
        where('doneAt', '==', null)
      )
      const snapShots = await getDocs(q)
      snapShots.forEach((snapShot) => {
        this.tasks.push(new Task(snapShot.data()))
      })
    },
  },
}
</script>
