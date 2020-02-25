<template>
  <div class="filter-buttons">
    <button :class="{active: filter === 'all'}" @click="filterChanged('all')">All</button>
    <button :class="{active: filter === 'active'}" @click="filterChanged('active')">Active</button>
    <button :class="{active: filter === 'completed'}" @click="filterChanged('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: 'filter-buttons',
  computed: {
    filter () {
      return this.$store.state.filter
    }
  },
  methods: {
    filterChanged (filter) {
      this.$store.dispatch('filterChanged', filter)
    }
  }
}
</script>
