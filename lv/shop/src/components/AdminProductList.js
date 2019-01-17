import React, { Component } from 'react';
// import AdminProductItem from './../components/AdminProductItem'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AdminProductList extends Component {

render() {

return (
    <table className="highlight">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Xuất xứ</th>
            <th>Công dụng</th>
            <th>Cách dùng</th>
            <th>Tình trạng</th>
          </tr>
        </thead>
        
        <tbody>         
        {this.props.children}          
        </tbody>
      </table>

);
}
}

export default AdminProductList;