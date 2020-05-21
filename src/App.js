import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoItem from './TodoItem';
import Todo from './Todo';
import cookies from 'js-cookie';

class App extends React.Component {
  state = {
    todos: [],
    todoText: '',
    start: 10
  };

  componentDidMount() {
    const { start } = this.state;
    this.loadData(start);

    this.autoLoad();

    document.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.loadMore();
      }
    });
  }

  addTodo = () => {
    const { todos, todoText } = this.state;
    if (todoText.replace(/\s*/g, '') !== '') {
      const todo = { id: uuidv4(), text: todoText };
      const newTodos = [todo, ...todos];

      this.setState({
        todos: newTodos,
        todoText: ''
      });
      cookies.set('todoapp', JSON.stringify(newTodos));
    }
  };

  deleteTodo = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);

    this.setState({
      todos: newTodos
    });
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  editTodo = (id, edit) => {
    const { todos } = this.state;
    const newTodos = todos.map(todo =>
      todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
    );

    this.setState({
      todos: newTodos
    });
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  handleChange = e => {
    this.setState({
      todoText: e.target.value
    });
  };

  loadData = (first, after) => {
    const getData = cookies.get('todoapp');

    if (getData) {
      const todoData = JSON.parse(getData);
      let fil = todoData.filter((todo, index) => index < first);

      if (after !== undefined) {
        const ind = todoData.findIndex(todo => todo.id === after);
        fil = todoData.filter(
          (todo, index) => index > ind && index <= ind + first
        );
      }

      this.setState({ todos: fil });
    }
  };

  loadMore = () => {
    const { start } = this.state;
    const newStart = start + 10;

    this.loadData(newStart);

    this.setState({ start: newStart });
  };

  autoLoad = () => {
    if (window.innerHeight >= document.body.scrollHeight) {
      this.loadMore();
      setTimeout(() => {
        return this.autoLoad();
      }, 1000);
    }
  };

  render() {
    const { todos, todoText } = this.state;

    return (
      <div className="wrapper">
        <button onClick={this.loadMore}>XD</button>
        <div className="add">
          <TodoItem
            todoText={todoText}
            addTodo={this.addTodo}
            handleChange={this.handleChange}
          />
        </div>
        <h2> {todos.length} Todo! </h2>
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
