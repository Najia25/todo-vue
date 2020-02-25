export default {
  removeCompletedItems (state) {
    state.items = state.items.filter(item => item.completed === false) // same as item.completed === true
  },
  addItem (state, payload) {
    state.items.push(payload)
  },
  updateItem (state, payload) {
    const index = state.items.findIndex(data => data.id === payload.id)
    state.items.splice(index, 1, payload)
  },
  removeItem (state, id) {
    const index = state.items.findIndex(item => item.id === id)
    state.items.splice(index, 1)
  },
  checkAllItems (state, payload) {
    state.items.forEach(item => {
      item.completed = payload
    })
  },
  filterChanged (state, payload) {
    state.filter = payload
  }
}
