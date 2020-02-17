<template>
  <div>
    <input type="text" class="todo-input" placeholder="To what you have to do" v-model="itemTitle" @keyup.enter="addItem">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div v-for="(item, index) in filteredItems" :key="item.id" class="flex-container">
        <div class="item-left">
          <!-- Here original items array is manipulated -->
          <input type="checkbox" v-model="item.completed">
          <p v-if="!item.editing" @dblclick="editItem(item)" :class="{'item-completed':item.completed}">{{ item.title }}</p>
          <input v-else type="text" v-model="item.title" v-focus @keyup.enter="doneEditItem(item)" @blur="doneEditItem(item)" class="todo-input" @keyup.esc="cancelEditItem(item)">
        </div>
        <p @click="removeItem(index)">&times;</p>
      </div>
    </transition-group>
    <div class="bottom-part flex-container">
      <div>
        <label><input type="checkbox" :checked="notAnyRemaining" @change="checkAllItems">Check All</label>
      </div>
      <div>
        {{ remaining }} Items left
      </div>
    </div>
    <div class="bottom-part flex-container">
      <div class="filter-buttons">
        <button :class="{active: filter === 'all'}" @click="filter = 'all'">All</button>
        <button :class="{active: filter === 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{active: filter === 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>
      <transition name="fade">
        <button class="clear" @click="clearCompleted" v-if="itemsCleared">Clear completed</button>
      </transition>
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
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'To take over world',
          completed: false,
          editing: false
        }
      ],
      beforeEditCache: '',
      filter: 'all'
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    remaining () {
      return this.items.filter(item => !item.completed).length
    },
    notAnyRemaining () {
      return this.remaining === 0
    },
    filteredItems () {
      if (this.filter === 'all') {
        return this.items
      } else if (this.filter === 'active') {
        return this.items.filter(item => item.completed === false)
      } else if (this.filter === 'completed') {
        return this.items.filter(item => item.completed === true)
      }
      return this.items
    },
    itemsCleared () {
      return this.items.filter(item => item.completed === true).length > 0
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
    },
    editItem (item) {
      this.beforeEditCache = item.title
      item.editing = true
    },
    doneEditItem (item) {
      if (item.title.trim() === '') {
        item.title = this.beforeEditCache
      }
      item.editing = false
    },
    cancelEditItem (item) {
      item.title = this.beforeEditCache
      item.editing = false
    },
    checkAllItems () {
      this.items.forEach(item => {
        item.completed = event.target.checked
      })
    },
    clearCompleted () {
      this.items = this.items.filter(item => item.completed === false)
    }
  }
}
</script>

<style lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
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
.item-left {
  align-self: center;
}

.item-left input[type="checkbox"] {
  margin-right: 20px;
}

.item-left p {
  display: inline;
}
.item-left .todo-input {
  width: 80%;
}
.item-completed {
  text-decoration: line-through;
  color:rgba(128, 128, 128, 0.603);
}
.bottom-part {
  border-top:1px solid rgba(161, 159, 159, 0.493);
  font-size:14px;
  padding: 10px 0px;
}
.filter-buttons button {
  margin-right: 5px
}
.active {
  background: rgb(65, 184, 131);
  color:#fff;
  border:none;
}
.filter-buttons button{
  padding:5px 10px;
}
button.clear {
  align-self: baseline;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadeInUp, .fadeOutDown {
  animation-duration: .3s;
  animation-delay: .3s;
}
@media (max-width: 575px) {
  .filter-buttons button {
    display: block;
    margin-bottom: 5px;
  }
}
</style>
