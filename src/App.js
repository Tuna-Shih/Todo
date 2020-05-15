import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoItem from './TodoItem';
import Todo from './Todo';
import cookies from 'js-cookie';

class App extends React.Component {
  state = {
    todos: [],
    todoText: ''
  };

  componentDidMount() {
    const todoData = cookies.get('todoapp');
    if (todoData) {
      const oldTodos = JSON.parse(todoData);
      this.setState({
        todos: oldTodos
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      cookies.set('todoapp', JSON.stringify(this.state.todos));
    }
  }
  addTodo = () => {
    const { todos, todoText } = this.state;
    if (todoText.replace(/\s*/g, '') !== '') {
      this.setState({
        todos: [...todos, { id: uuidv4(), text: todoText }],
        todoText: ''
      });
    }
  };

  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  handleChange = e => {
    this.setState({
      todoText: e.target.value
    });
  };

  editTodo = (id, edit) => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
      )
    });
  };

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
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={this.deleteTodo}
              editTodo={this.editTodo}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
