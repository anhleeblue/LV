import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CartResult extends Component {
    render() {
        var { cart } = this.props;
        var a = this.showTotalAmount(cart);
        var priceTong = this.format_curency(a)
        return (
            <tr>
                <td colSpan="3"></td>
                <td>
                    <h4>
                        <strong>Tổng Tiền</strong>
                    </h4>
                </td>
                <td>
                    <h4 className="red-text">
                        <strong>{priceTong} VND</strong>
                    </h4>
                </td>
                <td colSpan="3">
                    <Link to="/thanhtoan" type="button" className="btn btn-pink  waves-effect waves-light">Tiến hành đặt hàng
                            <i className="fa fa-angle-right right"></i>
                    </Link>
                </td>
            </tr>
        );
    }

    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.price * cart[i].quantity;
            }
        }
        return total;
    }
    format_curency = (a) => {
        return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

}

export default CartResult;
