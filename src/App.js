import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import axios from 'axios';

class App extends React.Component {
  state = {
    todos: [],
    todoText: '',
    count: 25
    // autoRenderMore: true
  };

  componentDidMount() {
    // const { autoRenderMore } = this.state;

    axios.get('http://localhost:3003/todos').then(res => {
      res.data.reverse();
      this.setState({
        jsonLength: res.data.length,
        todos: res.data.filter((todo, index) => index < this.state.count)
      });
    });

    // if (autoRenderMore) {
    //   if (window.innerHeight >= document.body.scrollHeight) {
    //     this.loadMore();
    //   } else {
    //     this.setState({ autoRenderMore: !autoRenderMore });
    //   }
    // }

    document.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.loadMore();
      }
    });
  }

  addTodo = () => {
    const { todos, todoText, count, jsonLength } = this.state;
    if (todoText.replace(/\s*/g, '') !== '') {
      const todo = { id: uuidv4(), text: todoText };
      this.setState({
        todos: [todo, ...todos],
        todoText: '',
        count: count + 1,
        jsonLength: jsonLength + 1
      });
      axios.post('http://localhost:3003/todos', todo);
      console.log(
        window.innerHeight,
        window.scrollY,
        document.body.scrollHeight
      );
    }
  };

  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
      count: this.state.count - 1,
      jsonLength: this.state.jsonLength - 1
    });
    axios.delete(`http://localhost:3003/todos/${id}`);
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
    axios.patch(`http://localhost:3003/todos/${id}`, edit);
  };

  loadMore = () => {
    const { count } = this.state;
    axios.get('http://localhost:3003/todos').then(res => {
      res.data.reverse();
      this.setState({
        count: count + 10,
        todos: res.data.filter((todo, index) => index < count + 10)
      });
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
        <button onClick={this.loadMore}>XD</button>
        <div className="add">
          <TodoItem
            todoText={todoText}
            addTodo={this.addTodo}
            handleChange={this.handleChange}
          />
        </div>
        <h2> {todos.length} Todo! </h2>
        <div className="list" ref={this.myscroll}>
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
