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
    start: 30
  };

  componentDidMount() {
    const { start } = this.state;
    this.loadData(start);

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
      const fil = todoData.filter((todo, index) => index < first + 1);
      this.setState({ todos: fil });
      if (after !== undefined) {
        const loadRange = todoData.filter(
          (todo, index) => index > first && index <= first + after
        );
        this.setState({ todos: loadRange });
      }
    }
  };

  loadMore = () => {
    const { start, todos } = this.state;
    const preTodos = todos;

    this.loadData(start, 10);
    const moreData = this.state.todos;

    const newStart = start + 10;
    const conCatData = preTodos.concat(moreData);
    this.setState({ todos: conCatData, start: newStart });
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
