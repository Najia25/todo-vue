<template>
  <div>
    <input type="text" class="todo-input" placeholder="To what you have to do" v-model="itemTitle" @keyup.enter="addItem">
    <div v-for="(item, index) in items" :key="item.id" class="flex-container">
      <p>{{ item.title }}</p>
      <p @click="removeItem(index)">&times;</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemTitle: '',
      items: [
        {
          id: 1,
          title: 'Finish vue screencast',
          completed: false
        },
        {
          id: 2,
          title: 'To take over world',
          completed: false
        }
      ]
    }
  },
  methods: {
    addItem () {
      const title = this.itemTitle.trim()
      if (title) {
        const id = this.items.length + 1
        this.items.push({
          id,
          title,
          completed: false
        })
        this.itemTitle = ''
      }
    },
    removeItem (index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">

.todo-input {
  width:100%;
  margin-bottom:30px;
  padding:8px 15px;
  font-size:18px;

  &:focus {
    outline: 0;
  }
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-container p:nth-child(2) {
  &:hover {
    color: red;
  }
}

</style>
