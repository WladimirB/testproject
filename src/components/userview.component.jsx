import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/app.css";
import UserInterface from './userinterface.component.jsx';
import List from './list.component.jsx';

function UserView(props) {
  return (
    <div className="jumbotron wrapper p-2">
     <div className="contaier d-flex flex-column justify-content-between h-100">
      <div className="text-center Content">
       <h1>Hello ,{props.name}</h1>
       <div className="flex-grow-1 h-50">
         { props.isLoad &&
          <h2 className="text-success">Данные успешно загружены</h2>
         }
         { props.isGet &&
          <h2 className="text-info">Данные успешно получены</h2>
         }
         { props.isGet &&
          <List data={props.data} />
         }
       </div>
      </div>
      <UserInterface load={props.load} getData={props.getData}/>
    </div>
   </div>
  );
}

export default UserView;
