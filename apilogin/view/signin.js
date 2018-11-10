class Signin extends React.Component {
    
    
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        email:'',
        password:''
      };
    }
   
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    signIn(){
        alert('Email address is ' + this.state.email + ' Password is ' + this.state.password);            
    }
    
    render() {
        axios.post('/signin', {
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading">Đăng nhập</h2>
                <label for="inputEmail" className="sr-only">Nhập địa chỉ email
                </label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email" required autofocus />
                <label for="inputPassword" className="sr-only">Mật khẩu</label>
                <input type="password" onChange={this.handlePaswordChange} id="inputPassword" className="form-control" placeholder="Mật khẩu" required />
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.signIn}>Đăng nhập
                </button>
            </form>
        );
    }
}

ReactDOM.render(<Signin / >, document.getElementById('app'));