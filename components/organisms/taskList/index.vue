<template lang="pug">
ul.o-task-list
  li.o-task-list__item(v-for='(task, index) in tasks')
    span.o-task-list__checkbox(@click='setTaskDone(index)')
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
    async setTaskDone(index) {
      this.tasks[index].setDoneAt()
      const id = this.taskIds[index]
      try {
        await updateDoc(doc(db, 'dailyNotes', id), {
          doneAt: this.tasks[index].doneAt,
        })
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
    border: 1px solid $color-main-dark;
    background: rgba(#fff, 0.3);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: rgba($color-main-dark, 0.6);
    }

    &::before {
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      content: '';
      width: 5px;
      height: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: 0;
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