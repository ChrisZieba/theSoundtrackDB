import React from 'react';
import '../styles/Popular.css';
import popular from '../data/popular';
import { Link } from 'react-router-dom';

const Popular = () => (
  <div className="container">
    <div className="alert alert-danger">
      <p>Unfortunaly, as of <strong>May 2018</strong> TheSoundtrackDB has shut down all services. Thank you to all the supporters over the last 6 years. <a href="https://github.com/chriszieba/thesoundtrackdb" target="_blank">The code is still on Github for anyone interested</a>.</p> 
    </div>
    <ul className="popular">
      {popular.map((item, index) => (
        <Link key={item.id} to={{ pathname: `/soundtrack/${item.id}` }}>
          <li>
            <img src={`/img/posters/${item.id}.jpg`} width="185" height="278" />
            <div className="info">
              <div className="title">{item.title}</div>
              <div className="count">{item.count} song(s)</div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);
 
export default Popular;