import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import '../App.css';

import { setInitialTodo, updateTodo, deleteTodo } from "../actions/index";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      openName: false,
      openPriority: false,
      currentId: "",
      currentName: "",
      currentPriority: "",
      currentCompleted: ""
    };
  }


  handleDelete = id => {
    this.props.deleteTodo(id);
  };

  handleUpdateTask = e => {
    e.preventDefault();
    console.log("in handle task...");
    console.log(
      this.state.currentId,
      this.state.currentName,
      this.state.currentPriority,
      this.state.currentCompleted
    );
    this.props.updateTodo(
      this.state.currentId,
      this.state.currentName,
      this.state.currentCompleted,
      this.state.currentPriority
    );
    this.setState({
      currentId: "",
      currentName: "",
      currentPriority: "",
      openName: false
    });
  };
  handleUpdatePriority = e => {
    e.preventDefault()
    this.props.updateTodo(
      this.state.currentId,
      this.state.currentName,
      this.state.currentCompleted,
      this.state.currentPriority
    );
    this.setState({
      currentId: "",
      currentName: "",
      currentPriority: "",
      openPriority: false
    });
  };
  handleUpdate = obj => {
    console.log(obj);
    var completed = !obj.completed;
    this.props.updateTodo(obj._id, obj.name, completed, obj.priority);
  };
  componentDidMount() {
    this.props.setInitialTodo();
  }
  render() {
    console.log(this.state);
    // console.log(this.props.todos);
    var todos = [];
    if (this.props.todos) {
      todos = this.props.todos;
    } else todos = [];
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Task Name</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
              <CustomTableCell align="right">Change Status</CustomTableCell>
              <CustomTableCell align="right">Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(todo => (
              <TableRow key={todo._id}>
                <CustomTableCell
                  component="th"
                  scope="row"
                  className="item-hover"
                >
                  {todo.name}
                    <i
                      className="fas  item-show-icon"
                      style={{ cursor: "pointer" }}
                      onClick={e =>
                        this.handleModalName(
                          todo._id,
                          todo.name,
                          todo.priority,
                          todo.completed
                        )
                      }
                    />
                </CustomTableCell>
                <CustomTableCell align="right">
                  {todo.completed === true ? "Completed" : "Pending"}
                </CustomTableCell>
                {todo.completed === true ? (
                  <CustomTableCell align="right">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-check-circle"
                      onClick={e => this.handleUpdate(todo)}
                    />
                  </CustomTableCell>
                ) : (
                  <CustomTableCell align="right">
                    <i
                      style={{ cursor: "pointer" }}
                      className="far fa-check-circle"
                      onClick={e => this.handleUpdate(todo)}
                    />
                  </CustomTableCell>
                )}
                <CustomTableCell align="right">
                  <i
                    style={{ cursor: "pointer" }}
                    className="fas fa-trash-alt"
                    onClick={e => this.handleDelete(todo._id)}
                  />
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state
  };
}

export default connect(
  mapStateToProps,
  { setInitialTodo, updateTodo, deleteTodo }
)(TodoList);
