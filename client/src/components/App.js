import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import TodoList from './SoundtrackList'
import VisibleTodoList from '../containers/VisibleTodoList'
 
const App = () => (
  <div>
  	<Header />
    <Main />
    <Footer />
  </div>
);
 
export default App;