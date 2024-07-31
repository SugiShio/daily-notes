<template lang="pug">
ul.o-task-list
  li.o-task-list__item(v-for='(task, index) in tasks')
    span.o-task-list__checkbox(
      @click='toggleTaskDone(index)',
      :class='{ isDone: task.isDone }'
      :style='styleCheckbox({ isDone: task.isDone })'
    )
    .o-task-list__content
      h3.o-task-list__title {{ task.title }}
      time.o-task-list__time(v-if='task.limit')
        i.el-icon-warning-outline
        | {{ task.limitDateText }}
        | {{ task.limitTimeText }}
</template>

<script>
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Task } from '~/models/task'
import { convertDateIdToDate } from '~/scripts/dateHelper'

export default {
  name: 'OrganismsTaskList',
  data() {
    return {
      tasks: [],
      taskIds: [],
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
      await this.fetchTasksToDo()
      await this.fetchTasksDone()
    },
    async fetchTasksToDo() {
      const q = query(
        collection(db, 'dailyNotes'),
        where('uid', '==', this.uid),
        where('type', '==', 'task'),
        where('doneAt', '==', null)
      )

      const snapShots = await getDocs(q)
      snapShots.forEach((snapShot) => {
        this.tasks.push(new Task(snapShot.data()))
        this.taskIds.push(snapShot.id)
      })
    },
    async fetchTasksDone() {
      const dateId = this.$store.state.dailyId
      const startAt = convertDateIdToDate(dateId)
      const endAt = new Date(
        startAt.getFullYear(),
        startAt.getMonth(),
        startAt.getDate() + 1
      )

      const q = query(
        collection(db, 'dailyNotes'),
        where('uid', '==', this.uid),
        where('type', '==', 'task'),
        where('doneAt', '>=', startAt),
        where('doneAt', '<', endAt)
      )
      const snapShots = await getDocs(q)
      snapShots.forEach((snapShot) => {
        this.tasks.push(new Task(snapShot.data()))
        this.taskIds.push(snapShot.id)
      })
    },

    styleCheckbox({ isDone }) {
      const colorConfig = this.$store.state.colorConfig
      return {
        borderColor: colorConfig.mainDark,
        backgroundColor: isDone ? colorConfig.mainDark : null,
      }
    },

    async toggleTaskDone(index) {
      const task = this.tasks[index]
      task.isDone ? task.resetDoneAt() : task.setDoneAt()
      const id = this.taskIds[index]
      try {
        await updateDoc(doc(db, 'dailyNotes', id), {
          doneAt: this.tasks[index].doneAt,
        })
        this.tasks = []
        this.taskIds = []
        this.fetchTasks()
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.o-task-list {
  padding: 15px 20px;

  &__item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    line-height: 1;
  }

  &__checkbox {
    position: relative;
    display: block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid;
    background: rgba(#fff, 0.3);
    cursor: pointer;
    top: -2px;
    transition: 0.3s;

    &:hover {
      opacity: 0.5;
    }

    &.isDone ::before {
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      content: '';
      width: 5px;
      height: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: -2px;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }

  &__title {
    line-height: 1;
  }

  &__content {
    align-self: center;
  }

  &__time {
    font-size: 11px;
  }
}
</style>
