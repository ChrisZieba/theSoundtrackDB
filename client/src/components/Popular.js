import React from 'react';
import '../styles/Popular.css';
import popular from '../data/popular';
import { Link } from 'react-router-dom';

const Popular = () => (
  <div className="container">
    <ul className="popular">
      {popular.map((item, index) => (
        <Link key={item.id} to={{ pathname: `soundtrack/${item.id}` }}>
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