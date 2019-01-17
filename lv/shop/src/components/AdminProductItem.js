import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AdminProductItem extends Component {
    onDelete = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }
render() {
    var {product} = this.props;
    //  var sliceCongdung = product.congdung.toString().slice(0,20) + '...';
    // var sliceCanhdung = product.cachdung.toString().slice(0,20) + '...';
    // var statusName = product.tinhtrang ? 'Còn Hàng' : 'Hết Hàng';
return (
     <tr>
          <th><img src={product.productImage} width="50px" height="50px" alt=""></img></th>
            <th>{product.name}</th>
            <th>{product.price}</th>
            <th>{product.loai}</th>
            <th>{product.xuatxu}</th>            
            <th>{product.congdung}</th>
            <th>{product.cachdung}</th>
            {/* <th>{sliceCongdung}</th>
           
            <th>{sliceCanhdung}</th> */}
            <th>{product.tinhtrang}</th>
            <td>
                    <Link
                        to={`/edit/${product._id}`}
                        className="btn btn-small"
                    >
                        Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn red darken-1 btn-small"
                        onClick={() => this.onDelete(product._id)}
                    >
                        Xóa
                    </button>
                </td>
          </tr>

);
}


}


export default AdminProductItem;