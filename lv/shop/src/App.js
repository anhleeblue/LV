import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Signup from './components/Signup';
import SignupAdmin from './components/SignupAdmin';
import Products from './components/Products';
import NotFoundPage from './components/NotFoundPage';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import { connect } from 'react-redux';
import AdminUser from './components/AdminUser';
import DashBoard from './components/DashBoard';
import CartContainer from './components/CartContainer';
import Search from './components/Search';
import Editproduct from './components/Editproduct';
import {actLogout} from './actions/index';
// import routes from './routes';
import './css/home.css';
import AddProduct from './components/AddProduct';
import Thanhtoan from './components/Thanhtoan';
import Themtintuc from './components/Themtintuc';
import Suatintuc from './components/Suatintuc';
import Donhang from './components/Donhang';
import Thongke from './components/Thongke';

class App extends Component {
constructor(){
  super();
  this.state = ({
    userName:'',
    giohang:[],

  })
}
 onLogout = (user) => {
 this.props.onLogout(user);

} 
  
render() {


var {userName} = this.props.user;


return (
  
<Router>
  <div className="App">

    <header>
      <div className="wrap">
        <div id="contact" className="container">
          <p className="left hide-on-small-only">Chào mừng đến với Cây Đẹp</p>
          <p className="right"><i className="material-icons left">local_phone</i> 093.991.3199 </p>
        </div>

      </div>
      <div className="logo container">
        <h2 id="logo" className="center-align">Cây Đẹp</h2>
      </div>
      {/*
      <!-- MENU sidenav --> */}
      <ul id="slide-out" className="sidenav">
        <h5 className="center-align">Điều hướng</h5>

        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/">Giới thiệu</Link>
        </li>
        <li>
          <Link to="/">Sản Phẩm</Link>
        </li>
        <li>
          <Link to="/">Kinh Nghiệm</Link>
        </li>
        <li>
          <Link to="/">Hướng dẫn mua hàng</Link>
        </li>
        <li>
          <Link to="/">Chính sách đại lý</Link>
        </li>
        <li>
          <Link to="/">Liên Hệ</Link>
        </li>
        <li>
          <Link to="/quanly/dangnhap">Quản Lý</Link>
        </li>

      </ul>
      <div id="menu" className="container">
        <Link to="/" data-target="slide-out" className="sidenav-trigger left "><i id="menu_logo" className="material-icons ">menu</i></Link>
        <Link id="me" className="right valign-wrapper black-text dropdown-trigger" data-target="dropdown1" to="">{userName} <i id="search" className="material-icons ">person</i>
        <span></span> </Link>
        <ul id='dropdown1' className='dropdown-content'>
          <li>
            <Link to="/signup/">Đăng kí</Link>
          </li>
          <li>
            <Link to="/login/">Đăng nhập</Link>
          </li>
          <li>
            <Link onClick={ ()=>this.onLogout(this.props.user)} to="/">Đăng Xuất</Link>
          </li>

        </ul>
        <Link className="right" to="/cart"><i id="search" className="material-icons">shopping_cart</i> <span></span></Link>
        <Search/>
      </div>


      {/* <Route path="/chitietsanphan" component={BannerDetail}></Route> */}
    </header>
    <Switch>
          <Route exact path="/" component={Products}/>
          <Route path="/quanly/dangnhap" component={({history}) => <SignupAdmin history={history}/>}/>
          <Route path="/quanly/dashboard" component={({history}) => <DashBoard history={history}/>}/>
          <Route path="/product/add" component={({history}) => <AddProduct history={history}/>}/>
          <Route path="/login/" component={({history}) => <Login history={history}/>}/>
          <Route path="/signup/" component={({history}) => <Signup history={history}/>}/>
          <Route path="/quanly/user" component={AdminUser}/>
          <Route path="/cart" component={ CartContainer}/>
          <Route path="/thanhtoan" component={({history}) => <Thanhtoan history={history}/>}/>
          <Route path="/quanly/donhang" component={({history}) => <Donhang history={history}/>}/>
          <Route path="/quanly/thongke" component={({history}) => <Thongke history={history}/>}/>
          {/* <Route path="/thanhtoan" component={ Thanhtoan}/> */}
          <Route path="/tintuc/them" component={ Themtintuc}/>
          <Route path="/tintuc/SUA" component={ Suatintuc}/>
          <Route path="/edit/:id" component ={ ({history,match}) => <Editproduct history={history} match={match} />} />
          <Route path="/:id" component ={ ({history,match}) => <ProductDetail history={history} match={match} />} />
          <Route component={NotFoundPage}/>
        </Switch>

    {/* {this.showContentMenus(routes)} */}
    <Footer />
  </div>
</Router>
);
}
// linkadmin = () =>{
//   var link = "/quanly/dangnhap";
//   var jwtAdmin = localStorage.getItem('myAdmin');
//   console.log(jwtAdmin);
//   console.log(link);
//   if(jwtAdmin === null){
//     return link;
//   }
//   else{
//     return link = "/quanly/dashboard";
//   }
// }

showContentMenus = (routes) => {
  var result = null;
  if (routes.length > 0) {
      result = routes.map((route, index) => {
          return (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
              />
          );
      });
  }
  return <Switch>{result}</Switch>;
}
}

// export default App;
const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogout: (user) => {
      dispatch(actLogout(user));

    }
    
  }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);