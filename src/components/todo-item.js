Vue.component('todo-item', {
  props: ['todoItem', 'todoItemIndex'],
  template: `
    <tr v-bind:class="{ 'bg-success': todoItem.checked }">
      <td width="30">
        <span
          v-bind:class="{ 'glyphicon-check': todoItem.checked, 'glyphicon-unchecked': !todoItem.checked }"
          class="glyphicon"
          v-on:click="selectTodo"
        >
        </span>
      </td>
      <td class="checked">{{todoItem.text}}</td>
      <td width="100">
        <button class="btn btn-info btn-sm" type="button" v-on:click="editTodo">
          <span class="glyphicon glyphicon-pencil"></span>
        </button>
        
        <button class="btn btn-danger btn-sm" type="button" v-on:click="removeTodo">
          <span class="glyphicon glyphicon-remove"></span>
        </button>
      </td>
    </tr>
`,
  methods: {
    selectTodo(e) {
      this.$emit('selectTodo', this.todoItemIndex);
    },
    editTodo(e) {
      this.$emit('editTodo', this.todoItemIndex);
    },
    removeTodo(e) {
      this.$emit('removeTodo', this.todoItemIndex);
    }
  },
  data: () => ({
    todo: this.todoItem
  })
});
