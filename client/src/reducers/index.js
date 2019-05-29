import { ADD_TODO, UPDATE_TODO,DELETE_TODO } from "../constant";

const todoFunc = (state = [], action) => {
  let todo = null;
  switch (action.type) {
    case ADD_TODO:
      todo = [...state, action.name];
      console.log("in add todo reducer");
      return todo;

    case UPDATE_TODO:
      todo = state.map(item => {
        if (item._id === action.payload._id) {
          item.name = action.payload.name;
          item.priority = action.payload.priority;
          item.completed = action.payload.completed;
          return item;
        } else return item;
      });
      console.log("todo in reducer", todo);
      return todo;

    case DELETE_TODO:
      todo = state.filter(item => item._id !== action.payload.id);
      return todo;
  }
};

export default todoFunc;
