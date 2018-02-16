Vue.component('app', {
  template: `
    <div class="container">
      <add-todo v-on:addTodo="saveTodoItem" v-bind:todoItemEdit="todoItemEdit"></add-todo>
  
      <table id="todo_items" class="table table-striped table-hover">
        <tbody>
          <todo-item
            v-for="(todoItem, index) in todoList"
            v-bind:todoItem="todoItem"
            v-bind:todoItemIndex="index"
            v-bind:key="todoItem.id"
            v-on:editTodo="editTodoItem"
            v-on:removeTodo="removeTodoItem"
            v-on:selectTodo="selectTodoItem"
          >
          </todo-item>
        </tbody>
      </table>
    </div>
  `,
  methods: {
    saveTodoItem(todoText) {
      const isEdit = typeof this.todoItemEdit.text !== 'undefined' && this.todoItemEditIndex > -1;

      if (isEdit) {
        this.todoList[this.todoItemEditIndex].text = todoText;
        this.todoItemEdit = {};
        this.todoItemEditIndex = -1;
      } else {
        this.todoList.push({
          text: todoText,
          checked: false
        });
      }

      data.update('todos', this.todoList);
    },
    selectTodoItem(e) {
      this.todoList[e].checked = !this.todoList[e].checked;
      data.update('todos', this.todoList);
    },
    getTodoList() {
      const todoList = data.read('todos');
      this.todoList = todoList || [];
    },
    editTodoItem(e) {
      this.todoItemEdit = this.todoList[e];
      this.todoItemEditIndex = e;
    },
    removeTodoItem(e) {
      if (confirm('Remove?')) {
        this.todoList.splice(e, 1);
        data.update('todos', this.todoList);
      }
    }
  },
  data: () => ({
    todoList: [],
    todoText: '',
    todoItemEdit: {},
    todoItemEditIndex: -1
  }),
  mounted: () => {
    window.parent.postMessage('FRAME_LOADED', (new URL(document.location.href)).searchParams.get('host_url') || 'http://jsmeasure.surge.sh');

    this.getTodoList();
  }
})