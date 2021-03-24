import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/app.css";

function UserInterface(props) {
  return (
   <div className="d-flex justify-content-center buttonBar">
    <a href="#" onClick={props.load} type="button" className="btn btn-success btn-lg">Загрузить данные</a>
    <a href="#" onClick={props.getData} type="button" className="btn btn-info btn-lg ml-5">Показать данные</a>
   </div>
  );
}

export default UserInterface;
