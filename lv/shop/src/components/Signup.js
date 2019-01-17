import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
// var message ='';
class Signup extends Component {
constructor(props){
  super(props);
  this.state = ({
    userName:'',
    email:'',
    message:'',
    status:false
  })
}
   
  onSave = (e) =>{
    e.preventDefault();
    var { history } = this.props;
    console.log(this.userName);
    console.log(this.email)
    console.log(this.password)
    // var user = new FormData();
    // user.append('userName',this.userName.value);
    // user.append('email',this.email.value);
    // user.append('password',this.password.value);
    var user = {
      'userName':this.userName.value,
      'email':this.email.value,
      'password':this.password.value
    }
    
    console.log(this.userName.value);
    console.log(this.email.value);
    console.log(this.password.value);
    if(this.userName.value === '' || this.email.value ==='' || this.password.value ==='' ){ 
     this.setState({
      message:'Bạn phải nhập đầy đủ thông tin'
     })
      console.log(this.state.message);     
  }
  else{
    axios.post('http://localhost:4000/users/signup',user).then(res => {
      console.log(res);
      var myUser = JSON.parse(res.config.data)
      localStorage.setItem('myUser',myUser.userName);
    })
    .catch(function (error) {
      console.log(error);
    });
    history.push('/login', 
    { state: this.state });
  }    
  }
render() {
var {message} = this.state;
return (
<div className="container">
  <form className="col s12" onSubmit={this.onSave}>
    <h3>Đăng Kí:</h3>
    <div className="row">
      <div className="input-field col s12">
        <input         
        id="userName" 
        type="text" 
        className="validate"
        ref={(ref) => { this.userName = ref; }}
        >
        </input>
        <label htmlFor="userName">Tên người dùng:</label>
      </div>

    </div>
    <div className="row">
      <div className="input-field col s12">
        <input 
        id="emailUser" 
        type="email" 
        className="validate"
        ref={(ref) => { this.email = ref; }}
        ></input>
        <label htmlFor="emailUser">Email:</label>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input 
        id="passwordUser" 
        type="password" 
        className="validate"
        ref={(ref) => { this.password = ref; }}
        ></input>
        <label htmlFor="passwordUser">Password:</label>
      </div>
    </div>
    <p className="red-text">{message}</p>
        <button type="submit" className="btn btn-small">Đăng ký</button>
  </form>
</div>
);
}
}

export default Signup;