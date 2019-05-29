import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

class CreateTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }
  handleAddTodo = e => {
    e.preventDefault();
    if(this.state.name && this.state.name.length>0){
      this.props.addTodo(this.state.name)
      this.setState({name:""})
    }
    else{
      alert('Enter the Todo first')
    }
   
  };
  render() {
    console.log(this.state.name);
    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <FormControl variant="outlined">
            <TextField
              id="outlined-name"
              label="Task Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddTodo}
            >
              {" "}
              Add the task
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(CreateTodo);
