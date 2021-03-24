import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header.component.jsx';
import Footer from './footer.component.jsx';
import UserView from './userview.component.jsx';
import "../styles/app.css";

class App extends Component{
  constructor(props) {
     super(props);
     this.state = {
       name: 'Developer',
       isLoad:false,
       isGet:false,
       data:[]
     }

     this.handleLoad = this.handleLoad.bind(this);
     this.handleData = this.handleData.bind(this);
   }

   componentDidMount() {
     //setTimeout(()=>{console.log('load component');}, 1000);
   }

  handleLoad() {
      fetch(`http://127.0.0.1:8080/load`)
        .then(res => res.text())
        .then(text => console.log(text))
        .catch(error => console.log(error));
    this.setState(state => ({
      isLoad:true
    }));
  }

  handleData() {
    fetch(`http://127.0.0.1:8080/get`)
      .then(res => res.json())
      .then(res => {
          this.setState({
          isGet:true,
          data:res
        });
        console.log(this.state.data.model);})
      .catch(error => console.log(error));
   console.log('handle data');
 }

  render(){
    return(
      <div className = "container">
       <Header />
       <UserView isLoad={this.state.isLoad} isGet={this.state.isGet} data={this.state.data.model} 
          name={this.state.name} load={this.handleLoad} getData={this.handleData} />
       <Footer />
      </div>
    );
  }
}

export default App
