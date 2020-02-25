<template>
  <div class="">
    <div class="item-left">
    <!-- Here original items array is manipulated -->
      <input type="checkbox" v-model="completed" @change="doneEditItem">
      <p v-if="!editing" @dblclick="editItem" :class="{'item-completed':completed }">{{ title }}</p>
      <input v-else type="text" v-model="title" v-focus @keyup.enter="doneEditItem" @blur="doneEditItem" class="todo-input" @keyup.esc="cancelEditItem">
    </div>
    <p @click="removeItem(item.id)">&times;</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'todo-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },

  watch: {
    notAnyRemaining () {
      if (this.notAnyRemaining) {
        this.completed = true
      } else {
        this.completed = this.item.completed
      }
    }
  },
  data () {
    return {
      id: this.item.id,
      title: this.item.title,
      completed: this.item.completed,
      editing: this.item.editing,
      beforeEditCache: ''
    }
  },
  computed: {
    ...mapGetters(['notAnyRemaining'])
  },
  methods: {
    editItem () {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEditItem () {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      const payload = {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      }
      this.$store.dispatch('updateItem', payload)
    },
    cancelEditItem () {
      this.title = this.beforeEditCache
      this.editing = false
    },
    removeItem (id) {
      this.$store.dispatch('removeItem', id)
    }
  }
}
</script>
