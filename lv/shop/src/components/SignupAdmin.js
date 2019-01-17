import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { connect } from 'react-redux';
// import { actLoginRequest} from './../actions/index';
import callApi from './../utils/apicaller';
class SignupAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        txtEmail:'',
        passWord:'',
        message:''
    };
}

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [name]: value
    });
}

onSave = (e) => {
    e.preventDefault();
    localStorage.removeItem('myjwt');
    var {txtEmail , passWord,message } = this.state;
    var { history } = this.props;
    var user = {
        email : txtEmail,
        password: passWord,
        message:message
    };
    
    console.log(this.state);
    if(passWord === ''){
      this.setState({
        message:'Mật khẩu không được để trống!'
      });
    }
    else{
      callApi('users/login', 'POST', user).then(res =>{   
        
        if(res.data.comein === 0 ){
          this.setState({
            message:res.data.message
          });        
        }
        else{
          localStorage.setItem('myAdmin',res.data.token);
          history.push('/quanly/dashboard');
        }
        // dispatch(actLogin(res.data))    
      // this.props.onLogin(user);
      // console.log(this.state);
      //  history.push('/quanly/dashboard')
      })
    }
   

    
    
}
  render() {
  
    var { txtEmail, passWord ,message} = this.state;
    // var {user} = this.props;
   
    return (
    <div className="container">
        <form onSubmit={this.onSave} className="col s12">
            <h3>Đăng Nhập ADMIN:                
            </h3>
            <div className="row">
                        <div className="input-field col s12">
                          <input id="email" type="email" className="validate"  name="txtEmail"
                            value={txtEmail}
                            onChange={this.onChange}></input>
                          <label htmlFor="email">Email</label>
                        </div>
             </div>
            <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" name="passWord"
                            value={passWord}
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
// const mapStateToProps = (state) =>{
//   return {
//       user: state.user
//   }
// };
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     onLogin : (user) => {
//           dispatch(actLoginRequest(user));
//       },
      
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SignupAdmin);
export default SignupAdmin;
