import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Axios from 'axios';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      message:''

    };
    // this.submit = this.submit.bind(this);
  }
  // onVisa = () =>{
  //   var {cart, user} = this.props;
  //   var carts = cart.map((motcart , index) => {
  //     return {
  //       name: motcart.product.name,
  //       quantity:motcart.quantity,
  //       price:motcart.product.price
  //     }
      
  // });
  //   var donhang = {
  //     userName: user.userName,
  //     diachi: this.diachi.value,
  //     sdt: this.sdt.value,
  //     giohang:carts,
  //     loai:'VISA'
  
      
  //   }
  //   axios.post('http://localhost:4000/orders/', donhang)
  //     .then(response  => {
  //       console.log(response);
  //     this.setState({
  //       message:response.data.message
  //     })
  // console.log(this.state.message);
  
  //       // history.push('/');
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  

   submit = async (ev) =>  {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
    var {user,cart} = this.props;
     var amount = this.showTotalAmount(cart);
    var donhang = {
      id: token.id,
      nickname: user.userName,
      amount: amount,
    }
    // console.log(donhang);
  // let response = await fetch("http://192.168.1.4:4000/charge/", {
  //   method: "POST",
  //   headers: {"Content-Type": "text/plain"},
  //   body: token
  // });
  Axios.post("http://localhost:4000/charge/",donhang).then(res => {
    console.log(res);
    // 
     console.log('da luu visa');
  })
  this.props.onVisa();

  // if (response.ok) this.setState({complete: true});
  }

  render() {
    // if (this.state.complete) return <h4>Purchase Complete</h4>;
    var msg = this.state.message;
    return (
      <div className="checkout customcheckout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button className="btn btn-small mt-5" onClick={() => this.submit()}>Send</button>
        {msg}
      </div>
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
}

export default injectStripe(CheckoutForm);