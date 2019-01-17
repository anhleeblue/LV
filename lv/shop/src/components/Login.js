import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import callApi from './../utils/apicaller';
import { actLogin } from './../actions/index';
import axios from 'axios';
import * as typesUser from './../constans/ActionUser';
class Login extends Component {
constructor(){
  super();
  this.state = ({
    email:'',
    password:''
  })
}

  onChange = (e) => {
    var target = e.target;
    // console.log(target);
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  onSave = (e) => {
    e.preventDefault();
    localStorage.removeItem('tokenLogin');
    var { email, password, message } = this.state;
    var { history } = this.props;
    var user = {
      email: email,
      password: password,
      message: message
    };
    if (password === '') {
      this.setState({
        message: 'Mật khẩu không được để trống!'
      });
    }
    else {
      this.props.onLogin(user);
      setTimeout(()=>{
        var tokenLogin = localStorage.getItem('tokenLogin');
      console.log(tokenLogin);
      if(tokenLogin){
        axios.get('http://localhost:4000/users/',{headers:{ Authorization: `Bearer ${tokenLogin}`}}).then(res =>{
         
        console.log(res);
        this.props.onGetInforUser(res.data.user);            
        });
      }
      history.goBack();
      },2000)
      // callApi('users/', 'GET', user).then(res =>{     
      //   console.log(res.data);
      //   dispatch({
      //       type: typesUser.LOG_IN,
      //       user,
      //       res 
      //   })             
        
    
      // callApi('users/login', 'POST', user).then(res =>{  
      //   console.log(res);        
      //   // if(res.data.comein === 0 ){
      //   //   this.setState({
      //   //     message:res.data.message
      //   //   });        
      //   // }
      //   // else{
      //   //   localStorage.setItem('myUserDangNhap',res.data.token);
      //   //   history.push('/');
      //   // }
      //   // dispatch(actLogin(res.data))    
      // // this.props.onLogin(user);
      // // console.log(this.state);
      // //  history.push('/quanly/dashboard')
      // })
    }




  }
  render() {
    // console.log(this.props.user);
    var { message } = this.props.user;
   
    // var {user} = this.props;

    return (
      <div className="container">
        <form onSubmit={this.onSave} className="col s12">
          <h3>Đăng Nhập:
            </h3>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" name="email"
                value={this.state.email}
                onChange={this.onChange}></input>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" name="password"
                value={this.state.password}
                onChange={this.onChange}></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          {/* <a className="waves-effect waves-light btn">Xác nhận</a> */}
          <button type="submit" className="waves-effect waves-light btn">Xác nhận</button>

        </form>
        <p className="red-text">{message}</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogin: (user) => {
      dispatch(actLogin(user));

    },
    onGetInforUser: (user) =>
      dispatch({
        type: typesUser.GET_USER,
        user,
        
    })  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
