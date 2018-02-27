import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import youtube from '../lib/youtube';

youtube.init();

const App = () => (
  <div>
  	<Header />
    <Main />
    <Footer />
  </div>
);
 
export default App;