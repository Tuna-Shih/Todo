import React from "react";

class Todo extends React.Component {
  state = {
    isEdit: false,
  };

  delete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  edit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleChange = (e) => {
    this.setState({
      editText: e.target.value,
    });
  };

  submit = () => {
    const { todo, handleSubmit } = this.props;
    const { editText } = this.state;
    const editTodo = { id: todo.id, text: editText };
    handleSubmit(todo.id, editTodo);
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  render() {
    const { todo } = this.props;
    const { isEdit } = this.state;

    return (
      <div className="list-item">
        <div className="list-item__content">{todo.text}</div>
        <div className="list-item__state">
          <button className="delete" onClick={this.delete}>
            Delete
          </button>
          <button className="edit" onClick={this.edit}>
            {isEdit ? "Editing" : "Edit"}
          </button>
          <input
            type="text"
            style={isEdit ? {} : { display: "none" }}
            onChange={this.handleChange}
            placeholder={todo.text}
          />
          <button
            className="submit"
            style={isEdit ? {} : { display: "none" }}
            onClick={this.submit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
