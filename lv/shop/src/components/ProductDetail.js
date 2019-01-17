import React, { Component } from 'react';
import './../css/home.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import {actAddToCart,actGetProductRequest} from './../actions/index';

import BinhLuan from './BinhLuan';
import BinhLuanItem from './BinhLuanItem';

class ProducDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            message:''
        }
    }
    onAddToCart = () =>{
        var { history } = this.props;
        var tokenLogin = localStorage.getItem('tokenLogin');
        var {product} = this.props;
        console.log(product);
        if(tokenLogin){
            this.props.onAddToCart(product);
            history.push('/cart');

        }
        else{
            this.setState({
                message:'Bạn phải đăng nhập để mua hàng'
            })
        }        
    }
    
    componentDidMount(){
        // console.log(this.props.product);
        this.props.fetchAllBinhLuan(this.props.product._id);
        // history.push('/');
     }
  render() {
    var { history } = this.props;
   var {message} = this.state;
   var {product,itemEditing} = this.props;
   console.log(product);
   console.log(itemEditing);
   var binhluans = product.binhluans;
    console.log(binhluans);
   var elmBinhLuan = binhluans.map((binhluan , index) => {
    return <BinhLuanItem key ={index} binhluan = {binhluan}  />
})
    return (
      
        <section id="sanpham">
        <div className="container">
            <div className="row">               
                <div className="col s12 m12 l12">
                    <p id="name_danhmuc" className="center-align in_mau">Chi tiết sản phẩm</p>

                    <div className=" khungsanpham_">
                        <div className="wrap_sanpham_ row">
                            <div className="img_sanpham col s12 m6 l6 xl5">
                                <div className="chinh_img">
                                    <img src={product.productImage} width="100%" alt=""></img>
                                </div>
                                <div className="hinhanhphu">
                                    {/* <a className="khunganhphu" href=""><img width="32%" height="75px" src="../img/sanpham1.jpg"></img></a>
                                    <a className="khunganhphu" href=""><img width="32%" height="75px" src="../img/sanpham1.jpg"></img></a>
                                    <a className="khunganhphu" href=""><img width="32%" height="75px" src="../img/sanpham1.jpg"></img></a> */}

                                </div>
                            </div>
                            <div className="thongtinsanpham col s12 s12 m6 l6 xl7">
                                <h4 className="left-align">{product.name}</h4>
                               
                                <p>Gía sản phẩm : <span className="red-text">{product.price} VNĐ </span></p>
                                <p>Xuất xứ: <span className="">{product.xuatxu}</span></p>
                                <p>Tình trạng : <span className="">{product.tinhtrang}</span></p>

                                <button onClick={ () => this.onAddToCart(product)} className="waves-effect waves-light btn">Mua hàng</button>
                                <p className="red-text">{message}</p>
                                {/* <form action="">
                                    <input type="number" min="1" name="quantity" value="1" size="2" id="input-quantity"
                                     className="form-control" style="width: 40%;">
                                    <a href="giohang.html" className="waves-effect waves-light btn"><i className="material-icons left">add_shopping_cart</i>Mua
                                        hàng</a>
                                </form> */}
                            </div>

                        </div>
                        <div className="motasanpham col s12">
                            <h4 className="center-align">
                                Mô tả sản phẩm
                            </h4>
                            
                            <p className="green-text text-lighten-1">Công dụng:</p>
                            <p>{product.congdung}</p>
                            <p className="green-text text-lighten-1">Cách dùng:</p>
                            <p>{product.cachdung}</p>
                        </div>
                    </div>
                    
                    <h3>Bình Luận</h3>
                    {elmBinhLuan}
                    <BinhLuan history={history}></BinhLuan>
                
                    {/* <div className="sanphamcungloai">
                        <h4>Sản phẩm cùng loại</h4>
                            <div className="col s12 m6 l6 xl4 khungsanpham">
                                    <div className="wrap_sanpham">
                                       <div className="muangay_hover"> 
                                             <div className="wrap_btn">
                                                <a href="chitietsanpham.html" className="a_hover btn-floating hide-on-small-only waves-effect waves-light green btn-small"><i
                                                     className="material-icons" >shopping_cart</i></a>
                                                <a href="chitietsanpham.html" className="a_hover_mobile show-on-small hide-on-med-and-up btn-floating waves-effect waves-light green btn-small"><i
                                                     className="material-icons">shopping_cart</i></a>
                                             </div>
                                         </div>
                                        <div className="wrap_img">
                                            <a href="chitietsanpham.html"><img src="../img/sanpham1.jpg" width="100%" height="100%" alt=""></img></a>
                                        </div>
                                        <p className="tensanpham center-align"><a href="chitietsanpham.html">Tên sản phẩm</a></p>
                                        <p className="giasanpham center-align">38.000 VND</p>
                                    </div>
                                </div>
                    </div> */}



                </div>
            </div>
        </div>
    </section>
    );
  }
}
const mapStateToProps = ( state , ownId) => {
    let id = ownId.match.params.id;

    
    return {
        product: state.products.find(product => product._id === id),
        // binhluan: state.binhluan
        itemEditing:state.itemEditing
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product) => {
            dispatch(actAddToCart(product, 1));
        },
        fetchAllBinhLuan : (id) => {
            dispatch(actGetProductRequest(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProducDetail);