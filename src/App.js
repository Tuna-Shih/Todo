import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import cookies from 'js-cookie';

class App extends React.Component {
  state = {
    todos: [],
    todoText: '',
    items: 10,
    oldTodos: [],
    loading: false
  };

  componentDidMount() {
    const todoData = cookies.get('todoapp');
    if (todoData) {
      const old = JSON.parse(todoData);
      this.setState({
        oldTodos: old,
        todos: old.filter((todo, index) => index < this.state.items),
        items: 10
      });
    }

    this.refs.myscroll.addEventListener('scroll', () => {
      if (
        this.refs.myscroll.scrollTop + 1 + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        const { oldTodos } = this.state;
        if (this.state.items <= oldTodos.length) {
          this.loadMore();
        }
      }
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos) {
      cookies.set('todoapp', JSON.stringify(this.state.oldTodos));
    }
  }

  addTodo = () => {
    const { oldTodos, todos, todoText, items } = this.state;
    if (todoText.replace(/\s*/g, '') !== '') {
      this.setState({
        todos: [{ id: uuidv4(), text: todoText }, ...todos],
        todoText: '',
        items: items + 1,
        oldTodos: [{ id: uuidv4(), text: todoText }, ...oldTodos]
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

  loadMore = () => {
    const { oldTodos, todos } = this.state;
    this.setState({ items: this.state.items + 10, loading: true });
    setTimeout(() => {
      this.setState({
        todos: todos.concat(
          oldTodos.filter(
            (todo, index) =>
              index >= this.state.items - 10 && index < this.state.items
          )
        ),
        loading: false
      });
    }, 100);
  };

  render() {
    const { todos, todoText, loading } = this.state;

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
        <div className="list" ref="myscroll">
          {todos.map(todo => (
            <TodoList
              key={todo.id}
              todo={todo}
              deleteTodo={this.deleteTodo}
              editTodo={this.editTodo}
            />
          ))}
          {loading ? <p className="App-intro">loading ...</p> : ''}
        </div>
      </div>
    );
  }
}
export default App;
