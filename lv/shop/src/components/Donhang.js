import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
// import AdminProductList from './AdminProductList';
import { actFetchDonhangsRequest,actDeleteDonhangRequest,actUpdateDonhangRequest } from './../actions/index';
import { connect } from 'react-redux';
import AdmindonhangItem from './AdmindonhangItem';
import Admindonhanglist from './Admindonhanglist';
// import axios from'axios'
// import { BrowserRouter as  Switch } from "react-router-dom";

class Donhang extends Component {
  componentDidMount() {
    this.props.fetchAllDonhangs();
}
onDelete = (id) => {
  this.props.onDeleteDonhang(id); 
}
onLogOut =() =>{
  var {history} =this.props;
  localStorage.removeItem('myAdmin');
  history.push('/');
  console.log('logoutadmin');
}
onStatus =(id) =>{
  this.props.onUpdateDonhang(id);
}
render() {
var { donhangs } = this.props;
return (

<div id="test1" className="container">
  <div className="">
<ul className="linkAdmin">
    <li className=" col s3"><Link to="/quanly/dashboard/">Sản Phẩm</Link></li>
    <span> / </span>
    <li className=" col s3"><Link to="/quanly/user/">Người Dùng</Link></li>
    <span> / </span>
    <li className=" col s3"><Link to="/quanly/dashboard/blog">Bài viết</Link></li>
    <span> / </span>
    <li className=" col s3"><Link to="/quanly/thongke">Thống kê</Link></li>
    <span> / </span>
    <li className=" col s3"><Link to="/quanly/donhang">Đơn hàng</Link></li>
  </ul>
  <button onClick={this.onLogOut} className="btn btn-small  brown lighten-5">thoát</button>
  </div>
    <h3>Quản lý đơn hàng</h3>
       
  <Admindonhanglist>
    {this.showdonhang(donhangs) }
  </Admindonhanglist>
</div>
);
}
showdonhang(donhangs) {
var result = null;
if (donhangs.length > 0) {
result = donhangs.map((donhang, index) => {
return (
<AdmindonhangItem key={index} donhang={donhang} index={index} onDelete={this.onDelete} onStatus={this.onStatus} />
);
});
}
return result;
}

}



const mapStateToProps = state => {
return {
products: state.products,
donhangs: state.donhangs
}
}

const mapDispatchToProps = (dispatch, props) => {
return {
fetchAllDonhangs: () => {
dispatch(actFetchDonhangsRequest());
},
onDeleteDonhang : (id) => {
  dispatch(actDeleteDonhangRequest(id));
},
onUpdateDonhang : (id) =>{
  // actUpdateDonhangRequest
  dispatch(actUpdateDonhangRequest(id));
}
}
}



// export default DashBoard;
export default connect(mapStateToProps, mapDispatchToProps)(Donhang);