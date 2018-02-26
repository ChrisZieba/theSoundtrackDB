import React from 'react';
import Soundtrack from './Soundtrack';

const SoundtrackList = ({ todos, onTodoClick, onTodoRemoveClick }) => (
  <div>
    <ul>
      {todos.map(todo => (
        <Soundtrack key={todo.id} {...todo} onRemoveClick={()=>{onTodoRemoveClick(todo.id)}} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  </div>
)
 
export default SoundtrackList;