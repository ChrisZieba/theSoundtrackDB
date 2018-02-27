import React from 'react';
import '../styles/SearchResults.css';
import { Link } from 'react-router-dom';

const SearchResults = ({results}) => (
  <div>
    <ul>
      {results.map((item, index) => (
        <Link key={item.id} to={{ pathname: `soundtrack/${item.id}` }}>
          <li key={index}>{item.title}</li>
        </Link>
      ))}
    </ul>
  </div>
)
 
export default SearchResults;