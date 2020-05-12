import React from "react";
import uuid from "react-uuid";
import "./App.css";
import TodoItem from "./TodoItem";
import Todo from "./Todo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoText: "",
    };
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem("todoapp");
    if (todoData) {
      const oldTodos = JSON.parse(todoData);
      this.setState({
        todos: oldTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      window.localStorage.setItem("todoapp", JSON.stringify(this.state.todos));
    }
  }
  addTodo() {
    const { todos, todoText } = this.state;
    if (todoText.replace(/\s*/g, "") !== "") {
      this.setState({
        todos: [...todos, { id: uuid(), text: todoText }],
        todoText: "",
      });
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
            addTodo={this.addTodo}
            handleChange={this.handleChange}
          />
        </div>
        <h2>Todo!</h2>
        <div className="list">
          {todos.map((todo) => (
            <Todo key={uuid()} todo={todo} deleteTodo={this.deleteTodo} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
