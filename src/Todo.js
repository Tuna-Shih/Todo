import React from "react";

class Todo extends React.Component {
  state = {
    isEdit: false,
    editText: this.props.todo.text,
  };

  delete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  toggle = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleChange = e => {
    this.setState({
      editText: e.target.value,
    });
  };

  submit = () => {
    const { todo, editTodo } = this.props;
    const { editText } = this.state;
    const edit = { id: todo.id, text: editText };
    editTodo(todo.id, edit);
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  render() {
    const { todo } = this.props;
    const { isEdit, editText } = this.state;

    return (
      <div className="list-item">
        <div className="list-item__content">{todo.text}</div>
        <div>
          <div className="list-item__state">
            <button className="delete" onClick={this.delete}>
              Delete
            </button>
            <button className="edit" onClick={this.toggle}>
              {isEdit ? "Editing" : "Edit"}
            </button>
          </div>
          <div className="edit-input">
            {isEdit ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={this.handleChange}
                />
                <button className="submit" onClick={this.submit}>
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
