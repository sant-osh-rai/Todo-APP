import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './component/TodoList';
import CreateTodo from './component/CreateTodo';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
      <CreateTodo />
      <br></br>
      <TodoList />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
