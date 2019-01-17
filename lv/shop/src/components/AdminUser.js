import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { actLoginRequest} from './../actions/index';
// import callApi from './../utils/apicaller';

import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AdminUser extends Component {
    
render() {

return (
    <div id="test1" className="col s12">
    <ul className="">
        {/* <li className=" col s3"><Link to="/quanly/dashboard/">Sản Phẩm</Link></li>
        <li className=" col s3"><Link to="/quanly/user">Người Dùng</Link></li>
        <li className=" col s3"><Link to="/quanly/dashboard/blog">Bài viết</Link></li>
        <li className=" col s3"><Link to="/quanly/dashboard/thongke">Thống kê</Link></li> */}
      </ul>
            <Link to="/product/add" className="btn green darken-1">
                   User
                </Link>
   
    </div>
);
}

}


 export default AdminUser;