export default {
  clearCompleted ({ commit }) {
    commit('removeCompletedItems')
  },
  addItem ({ commit }, payload) {
    commit('addItem', payload)
  },
  updateItem ({ commit }, payload) {
    commit('updateItem', payload)
  },
  removeItem ({ commit }, payload) {
    commit('removeItem', payload)
  },
  checkAllItems ({ commit }, payload) {
    commit('checkAllItems', payload)
  },
  filterChanged ({ commit }, payload) {
    commit('filterChanged', payload)
  }
}
