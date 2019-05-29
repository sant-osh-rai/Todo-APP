import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../constant";
import axios from "axios";

export const addTodo = name => {
  return dispatch => {
    axios
      .post("/api/post_todo", { name: name })
      .then(res => {
        if (res.status === 200) {
          dispatch(addTodoSuccess(res.data.todo));
        } else if (res.status === 301) {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
};

const addTodoSuccess = name => {
  const action = {
    type: ADD_TODO,
    name
  };
  console.log("addTodo is called...");
  return action;
};

export const setInitialTodo = () => {
  return dispatch => {
    axios
      .get("/api/get_todo")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          res.data.todo.map(item => {
            dispatch(setInitialTodoSuccess(item));
          });
        }
      })
      .catch(err => console.log(err));
  };
};

const setInitialTodoSuccess = name => {
  const action = {
    type: ADD_TODO,
    name
  };
  return action;
};

export const updateTodo = (id, name, completed, priority) => {
  return dispatch => {
    axios
      .put("/api/update_todo", {
        id,
        name,
        completed,
        priority
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(updateTodoState(id, name, completed, priority));
        }
      }).catch(err=>alert('something wrong'));
  };
};

const updateTodoState = (id, name, completed, priority) => {
  const action = {
    type: UPDATE_TODO,
    payload: {
      completed,
      priority,
      _id: id,
      name
    }
  };
  return action;
};

export const deleteTodo = id => {
  return dispatch => {
    axios.delete("/api/delete_todo", {data:{id:id}}).then(res => {
      if (res.status === 200) {
        dispatch(deleteTodoState(id))
      }
    });
  };
};

const deleteTodoState = id => {
  const action = {
    type: DELETE_TODO,
    payload: {
      id
    }
  };
  return action;
};
