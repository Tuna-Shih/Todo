import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  render() {
    const { todo } = this.props;
    return (
      <div className="list-item">
        <div className="list-item__content">{todo.text}</div>
        <div className="list-item__state">
          <button className="delete" onClick={this.delete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
