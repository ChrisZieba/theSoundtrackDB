import React from 'react'
import { connect } from 'react-redux'
import { addTodo, removeTodo } from '../actions/index'
import TodoList from '../components/SoundtrackList'

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      console.log(id)
    },
    onTodoRemoveClick: id => {
      dispatch(removeTodo(id));
    }
  }
}
 
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
 
export default VisibleTodoList