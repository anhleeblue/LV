import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminProductList from './AdminProductList';
import { actFetchProductsRequest, actDeleteProductRequest } from './../actions/index';
import { connect } from 'react-redux';
import AdminProductItem from './AdminProductItem';
import axios from 'axios';
// import axios from'axios'
// import { BrowserRouter as  Switch } from "react-router-dom";

class Thongke extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderscod: null,
            ordersvisa: null,
            cod: 0,
            visa:0,
            tongtien: 0
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/orders/cod').then(res =>{
            this.setState({
                cod:this.showTongTien(res.data.orders),
                orderscod: res.data.orders
            })    
        })
        axios.get('http://localhost:4000/orders/visa').then(res =>{
            this.setState({
                visa:this.showTongTien(res.data.orders),
                ordersvisa: res.data.orders
            })    
        })
    }
    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }
    onLogOut = () => {
        var { history } = this.props;
        localStorage.removeItem('myAdmin');
        history.push('/');
        console.log('logoutadmin');
    }
    onFind = (orders) => {      
        var tempcod = [];
        var tempvisa = [];
        var cod = orders.orderscod;
        var visa = orders.ordersvisa;
        console.log(visa);
        cod.forEach(e => {
            var str = e.ngaythanhtoan
            var ngaythanhtoan = new Date(str.slice(0,10))
            var dayStart = new Date(this.daystart.value)
            var dayEnd = new Date(this.dayend.value)
            if (ngaythanhtoan - dayStart >= 0 && ngaythanhtoan - dayEnd <= 0) {
                tempcod.push(e)
            }
        })
        visa.forEach(e => {
            var str = e.ngaythanhtoan;
            console.log(str);
            var ngaythanhtoan = new Date(str.slice(0,10))
            var dayStart = new Date(this.daystart.value)
            var dayEnd = new Date(this.dayend.value)
            if (ngaythanhtoan - dayStart >= 0 && ngaythanhtoan - dayEnd <= 0) {
                tempvisa.push(e)
            }
        })
        this.setState({
            cod: this.showTongTien(tempcod),
            visa: this.showTongTien(tempvisa)
        })
    }
    render() {
        // var { products } = this.props;
        // console.log(this.dayend.value);
        var {cod , visa} = this.state;
        var a = this.format_curency(cod);
        var b = this.format_curency(visa);
        var c = this.format_curency(cod + visa);
        return (

            <div className="container">
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
                <h3>Thống kê doanh thu</h3>
                <div className="row">
                    <div className=" col s5">
                        <label htmlFor="">Từ ngày:</label>
                        <input type="date"
                        onChange = {this.onDay}
                        ref = {(ref) => {this.daystart = ref}}></input>
                    </div>
                    <div className=" col s5">
                        <label htmlFor="">Đến ngày:</label>
                        <input type="date" 
                        onChange = {this.onDay}
                        ref = {(ref) => {this.dayend = ref}}></input>
                    </div>
                    <div className=" col s2">
                        <button className=" btn"
                        onClick = {() => {this.onFind(this.state)}}    
                        >Tìm</button>
                    </div>
                </div>
                <table>
        <thead>
          <tr>
              <th>COD</th>
              <th>VISA</th>
              <th>Tổng Tiền</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><h5>{a}</h5></td>
            <td><h5>{b}</h5></td> 
            <td><h5>{c} VND</h5> </td> 
          </tr>          
        </tbody>
      </table>
            
            </div>
        );
    }

    showTongTien = (orders) =>{
        var sum = 0  ;
        // console.log(orders)
        orders.forEach(e => {
            var giohang = e.giohang
            giohang.forEach(e => {
                sum += e.quantity * e.price
            })
        });
        // console.log(sum)
        return sum;
    }
    format_curency = (a) => {
        return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
}


// showTotalAmount = (cart) => {
//     var total = 0;
//     if (cart.length > 0) {
//         for (var i = 0; i < cart.length; i++) {
//             total += cart[i].price * cart[i].quantity;
//         }
//     }
//     return total;
// }
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}



// export default DashBoard;
export default connect(mapStateToProps, mapDispatchToProps)(Thongke);