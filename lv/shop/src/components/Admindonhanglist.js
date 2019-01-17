import React, { Component } from 'react';
// import AdminProductItem from './../components/AdminProductItem'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Admindonhanglist extends Component {

render() {

return (
    <table className="highlight">
        <thead>
          <tr>
            <th>STT</th>
            <th>TT giao hàng</th>
            <th>Sản phẩm</th>
            <th>Thành tiền</th>
            <th>Tùy chọn</th>            
          </tr>
        </thead>
        
        <tbody>         
        {this.props.children}          
        </tbody>
      </table>

);
}
}

export default Admindonhanglist;