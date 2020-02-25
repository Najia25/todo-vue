<template>
  <div>
    <input type="text" class="todo-input" placeholder="To what you have to do" v-model="itemTitle" @keyup.enter="addItem">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="item in filteredItems"
      :key="item.id"
      class="flex-container"
      :item="item">
      </todo-item>
    </transition-group>
      <div class="bottom-part flex-container">
        <check-all></check-all>
        <remaining-items></remaining-items>
      </div>
      <div class="bottom-part flex-container">
        <filter-buttons></filter-buttons>
        <transition name="fade">
          <clear-completed :itemsCleared="itemsCleared"></clear-completed>
        </transition>
      </div>
  </div>
</template>

<script>

import TodoItem from './TodoItem.vue'
import RemainingItems from './RemainingItems.vue'
import CheckAll from './CheckAll.vue'
import ClearCompleted from './ClearCompleted.vue'
import FilterButtons from './FilterButtons.vue'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    RemainingItems,
    CheckAll,
    ClearCompleted,
    FilterButtons
  },
  data () {
    return {
      itemTitle: '',
      beforeEditCache: ''
    }
  },
  computed: {
    ...mapState(['items', 'filter']),
    ...mapGetters(['remaining', 'notAnyRemaining', 'filteredItems', 'itemsCleared'])
  },
  methods: {
    addItem () {
      const title = this.itemTitle.trim()
      if (title) {
        const id = this.items.length + 1
        this.$store.dispatch('addItem',
          {
            id,
            title,
            completed: false
          })
        this.itemTitle = ''
      }
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
.slideInUp {
  animation-duration: .3s;
  animation-delay: 0s;
}
.fadeInUp, .fadeOutDown {
  animation-duration: .3s;
  animation-delay: 0s;
}
@media (max-width: 575px) {
  .filter-buttons button {
    display: block;
    margin-bottom: 5px;
  }
}
</style>
