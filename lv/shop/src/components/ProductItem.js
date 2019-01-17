import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
class ProductItem extends Component {

    format_curency = (a) => {
        return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

  render() {
    var {product} = this.props;
    var price = this.format_curency(product.price);
    return (
      <div className="col s12 m6 l6 xl4 khungsanpham">
                            <div className="wrap_sanpham">
                            <Link to={`./`+ product._id } className="a_hover btn-floating hide-on-small-only waves-effect waves-light green btn-small"><i
                                                className="material-icons" >shopping_cart</i></Link>
                                                <Link to={`./`+ product._id } className="a_hover_mobile show-on-small hide-on-med-and-up btn-floating waves-effect waves-light green btn-small"><i
                                                className="material-icons">shopping_cart</i></Link>
                                {/* <!-- <div className="muangay_hover"> -->
                                    <!-- <div className="wrap_btn"> -->
                                        
                                    <!-- </div> -->
                                <!-- </div> --> */}
                                <div className="wrap_img">
                                
                                    <Link to={`./`+ product._id }><img src={product.productImage} width="100%" height="100%" alt=""></img></Link>
                                </div>
                                <p className="tensanpham center-align"><a href="./components/chitietsanpham.html">{product.name}</a></p>
                                <p className="giasanpham center-align">{price} VND</p>
                            </div>
                            
                        </div>
    );
  }
}

export default ProductItem;
