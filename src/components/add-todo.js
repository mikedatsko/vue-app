Vue.component('add-todo', {
  props: ['todoItemEdit'],
  template: `
    <div class="row">
      <div class="col-lg-12">
        <form action="javascript:void(0)" method="POST" @submit.prevent="addTodo">
          <div class="input-group">
            <input class="form-control" type="text" v-model="todoText" placeholder="Todo text...">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="submit">
                <span v-if="isEdit">Edit</span>
                <span v-else>Add</span>
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>`,
  methods: {
    addTodo() {
      this.$emit('addTodo', this.todoText);
      this.todoText = '';
    }
  },
  data: () => ({
    todoText: '',
    isEdit: false
  }),
  watch: {
    todoItemEdit(val, oldval) {
      this.isEdit = typeof val.text !== 'undefined';
      this.todoText = this.isEdit ? val.text : '';
      // this.$refs.todoText.$el.focus();
      console.log(this);
    }
  }
});
