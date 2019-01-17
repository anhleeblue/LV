import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminProductList from './AdminProductList';
import { actFetchProductsRequest,actDeleteProductRequest } from './../actions/index';
import { connect } from 'react-redux';
import AdminProductItem from './AdminProductItem';
// import axios from'axios'
// import { BrowserRouter as  Switch } from "react-router-dom";

class DashBoard extends Component {
  componentDidMount() {
    this.props.fetchAllProducts();
}
onDelete = (id) => {
  this.props.onDeleteProduct(id); 
}
onLogOut =() =>{
  var {history} =this.props;
  localStorage.removeItem('myAdmin');
  history.push('/');
  console.log('logoutadmin');
}
render() {
var { products } = this.props;
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
    <h3>Quản lý sản phẩm</h3>
        <Link to="/product/add" className="btn green darken-1">
                Thêm Sản Phẩm
            </Link>
  <AdminProductList>
    {this.showProducts(products) }
  </AdminProductList>
</div>
);
}
showProducts(products) {
var result = null;
if (products.length > 0) {
result = products.map((product, index) => {
return (
<AdminProductItem key={index} product={product} index={index} onDelete={this.onDelete} />
);
});
}
return result;
}

}



const mapStateToProps = state => {
return {
products: state.products
}
}

const mapDispatchToProps = (dispatch, props) => {
return {
fetchAllProducts : () => {
dispatch(actFetchProductsRequest());
},
onDeleteProduct : (id) => {
  dispatch(actDeleteProductRequest(id));
}
}
}



// export default DashBoard;
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);