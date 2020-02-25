<template>
  <div>
    <label><input type="checkbox" :checked="notAnyRemaining" @change="checkAllItems">Check All</label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'check-all',
  computed: {
    ...mapState(['items']),
    notAnyRemaining () {
      return this.$store.getters.notAnyRemaining
    }
  },
  methods: {
    checkAllItems () {
      this.$store.dispatch('checkAllItems', event.target.checked)
    }
  }
}
</script>
