export default {
  remaining (state) {
    return state.items.filter(item => item.completed === false).length
  },
  notAnyRemaining (state, getters) {
    return getters.remaining === 0
  },
  filteredItems (state) {
    if (state.filter === 'all') {
      return state.items
    } else if (state.filter === 'active') {
      return state.items.filter(item => item.completed === false)
    } else if (state.filter === 'completed') {
      return state.items.filter(item => item.completed === true)
    }
    return state.items
  },
  itemsCleared (state) {
    return state.items.filter(item => item.completed === true).length > 0
  }
}
