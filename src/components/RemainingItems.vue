<template>
  <div>
    {{ remaining }} Items left
  </div>
</template>

<script>
export default {
  name: 'remaining-items',
  computed: {
    remaining () {
      return this.$store.getters.remaining
    }
  }
}
</script>
