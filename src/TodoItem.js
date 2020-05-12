import React from "react";

class TodoItem extends React.Component {
  handle = (e) => {
    const { handleChange } = this.props;
    handleChange(e);
  };

  add = () => {
    const { addTodo } = this.props;
    addTodo();
  };

  render() {
    const { todoText } = this.props;
    return (
      <div className="add-item">
        <input
          type="text"
          value={todoText}
          onChange={this.handle}
          placeholder="Add Something"
        />
        <button className="add-todo" onClick={this.add}>
          New
        </button>
      </div>
    );
  }
}

export default TodoItem;
