import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import * as Message from './../constants/Message';

class CartItem extends Component {
    format_curency = (a) => {
        return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    render() {
        var { item } = this.props;
        var price = this.format_curency(item.product.price);
        var a = this.showSubTotal(item.product.price, item.quantity);
        var priceTong = this.format_curency(a);
        console.log(item);
        var { quantity } = item;
        console.log(quantity);
        return (
            <tr>
                <th scope="row">
                    <img src={item.product.productImage}
                        alt={item.product.name} width="80px" height="80px" className="" />
                </th>
                <td>
                    <p>
                        <strong>{item.product.name}</strong>
                    </p>
                </td>
                <td>{price} VND</td>
                <td className="center-on-small-only">
                   
                    <div className="btn-group radio-group" data-toggle="buttons">
                    <p className="qty">{quantity} </p>
                        <button 
                            onClick={() => this.onUpdateQuantity(item.product, item.quantity - 1)}
                            className="red waves-effect waves-light btn-small"
                        >
                            -
                        </button>
                        
                        <button 
                            onClick={() => this.onUpdateQuantity(item.product, item.quantity + 1)}
                            className="waves-effect waves-light btn-small"
                        >
                            +
                        </button>
                    </div>
                </td>
                <td>{priceTong}VND</td>
                <td>
                    <button
                        type="button"
                        className="waves-effect waves-light btn-small"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Remove item"
                        onClick={() => this.onDelete(item.product)}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }

    onUpdateQuantity = (product, quantity) => {
        if (quantity > 0) {
            var { onUpdateProductInCart } = this.props;
            onUpdateProductInCart(product, quantity);
           // onChangeMessage(Message.MSG_UPDATE_CART_SUCCESS);
        }
    }

    onDelete = (product) => {
        var { onDeleteProductInCart } = this.props;
        onDeleteProductInCart(product);
        // onChangeMessage(Message.MSG_DELETE_PRODUCT_IN_CART_SUCCESS);
    }

    showSubTotal = (price, quantity) => {
        return price * quantity;
    }

}

export default CartItem;
