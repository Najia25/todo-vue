<template>
  <button class="clear" @click="clearCompleted" v-if="itemsCleared">Clear completed</button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'clear-completed',
  computed: {
    ...mapGetters(['itemsCleared'])
  },
  methods: {
    clearCompleted () {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>
