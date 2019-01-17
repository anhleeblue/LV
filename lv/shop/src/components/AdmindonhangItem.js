import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AdminProductItem extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         tinhtrang:null
    //     }
    // }
    onDelete = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }
    onStatus = (id) => {
        console.log("onstatus");
            // this.setState({
            //     tinhtrang: true
            // });
            // console.log(this.state.tinhtrang);
            this.props.onStatus(id);

    }
    // componentDidMount(){
    //     var {tinhtrang} = this.props.donhang;
    //     this.setState({
    //         tinhtrang: tinhtrang
    //     })
    // }
render() {
    console.log('render');
    var {donhang,index} = this.props;
      console.log(donhang);
      var a = this.showTotalAmount(donhang.giohang);
    var priceTong = this.format_curency(a);
    var giohangs = donhang.giohang.map((product , index) =>{
        return <div key = {index}>
            <p>{product.name}</p>
            <p>Số lượng: {product.quantity}</p>
        </div>
    });
    // var {tinhtrang} = this.state;
    var tinhtrangcomponent = donhang.tinhtrang ? <button className = "green btn btn-small" >Đã xử lý</button> : <button onClick={() => this.onStatus(donhang._id)} className = "amber btn btn-small">Chưa xử lý</button> ;
    //  var sliceCongdung = product.congdung.toString().slice(0,20) + '...';
    // var sliceCanhdung = product.cachdung.toString().slice(0,20) + '...';
    // var statusName = product.tinhtrang ? 'Còn Hàng' : 'Hết Hàng';
return (
     <tr>
         <th>{index + 1}</th>
            <th>
                <p>Tên : { donhang.userName}</p> 
                <p>Số DT: {donhang.sdt}</p> 
                <p>Địa chỉ: {donhang.diachi}</p> 
                <p>Loại: {donhang.loai}</p>
            </th>
            <th>
            {giohangs}
            </th>
            
           
            <th>{priceTong}</th>
            
            <th>
                    {tinhtrangcomponent}
                    <button
                        type="button"
                        className="btn red darken-1 btn-small"
                        onClick={() => this.onDelete(donhang._id)}
                    >
                        Xóa
                    </button>
                </th>
          </tr>

);
}
showTotalAmount = (cart) => {
    var total = 0;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
    }
    return total;
}
format_curency = (a) => {
    return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

}


export default AdminProductItem;