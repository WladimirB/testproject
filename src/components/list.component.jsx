import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/app.css";

function List(props){
  const listItems = props.data.map((item) =>
    <li key={item.id} className="list-group-item list-group-item-info">
      {item.cryptocurrency}:{item.percentage}
    </li>
  );
  return (
    <ul className="list-group">{listItems}</ul>
  );
}

export default List;
