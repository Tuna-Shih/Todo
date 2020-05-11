import React from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import Todo from "./Todo";

class App extends React.Component {
  state = {
    todos: [],
    todoText: "",
  };
  id = 1;

  componentDidMount() {
    const todoData = document.cookie;
    if (todoData) {
      const oldTodos = JSON.parse(todoData);
      this.setState({
        todos: oldTodos,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos) {
      document.cookie = JSON.stringify(this.state.todos);
    }
  }

  addTodo() {
    const { todos, todoText } = this.state;
    if (todoText.replace(/\s*/g, "") !== "") {
      this.setState({
        todos: [...todos, { id: this.id, text: todoText }],
        todoText: "",
      });
      this.id++;
    }
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  handleChange(e) {
    this.setState({
      todoText: e.target.value,
    });
  }

  render() {
    const { todos, todoText } = this.state;
    return (
      <div className="wrapper">
        <div className="add">
          <TodoItem
            todoText={todoText}
            addTodo={this.addTodo.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>
        <h2>Todo!</h2>
        <div className="list">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={this.deleteTodo.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
