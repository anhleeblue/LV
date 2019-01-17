import React, { Component } from 'react';
import { actFetchProductsRequest } from './../actions/index';
import { connect } from 'react-redux';
import AdminProductList from './../components/AdminProductList';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class wrapAdminAdd extends Component {
    componentDidMount() {
        this.props.fetchAllProducts();
    }
render() {
    var { products } = this.props;
return (

    <div id="test1" className="col s12">
    <ul className="">
        <li className=" col s3"><Link to="/quanly/dashboard/">Sản Phẩm</Link></li>
        <li className=" col s3"><Link to="/quanly/user">Người Dùng</Link></li>
        <li className=" col s3"><Link to="/quanly/dashboard/blog">Bài viết</Link></li>
        <li className=" col s3"><Link to="/quanly/dashboard/thongke">Thống kê</Link></li>
      </ul>
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
    
    }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(wrapAdminAdd);
// export default wrapAdminAdd;