import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
// import callApi from './../utils/apicaller';
// import AdminProductItem from './../components/AdminProductItem'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// var msg = '';
class Thanhtoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      hide: true
    };
  }
  onVisa = () => {
    var { cart, user } = this.props;
    var carts = cart.map((motcart, index) => {
      return {
        name: motcart.product.name,
        quantity: motcart.quantity,
        price: motcart.product.price
      }

    });
    var donhang = {
      userName: user.userName,
      diachi: this.diachi.value,
      sdt: this.sdt.value,
      giohang: carts,
      loai: 'VISA'


    }
    axios.post('http://localhost:4000/orders/', donhang)
      .then(response => {
        // console.log(response);
        this.setState({
          message: response.data.message
        })
        // console.log(this.state.message);

        // history.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onHienNut = () => {
    this.setState({
      hide: !this.state.hide
    })
  }
  onSave = (e) => {
    e.preventDefault();
    var { history } = this.props;
    var { cart, user } = this.props;
    console.log(cart);
    var carts = cart.map((motcart, index) => {
      return {
        name: motcart.product.name,
        quantity: motcart.quantity,
        price: motcart.product.price
      }

    });
    console.log(carts);
    var donhang = {
      userName: user.userName,
      diachi: this.diachi.value,
      sdt: this.sdt.value,
      giohang: carts

    }
    // console.log(donhang);
    if (this.sdt.value === '' || this.diachi.value === '') {
      this.setState({
        message: 'Vui lòng nhập thông tin nhận hàng'
      })
    } else {
      axios.post('http://localhost:4000/orders/', donhang)
        .then(response => {
          console.log(response);
          this.setState({
            message: response.data.message
          })
          // console.log(this.state.message);
          // setTimeout(history.push('/'), 2000);
          // ;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  render() {
    var msg = this.state.message;
    var { hide } = this.state;
    var hienan = hide ? 'row hide' : 'row';
    return (
      <div className="container">
        <h3>TIẾN HÀNH THANH TOÁN</h3>
        <form className="col s12" onSubmit={this.onSave}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="sdt"
                type="text"
                className="validate"
                ref={(ref) => { this.sdt = ref; }}
              ></input>
              <label htmlFor="sdt">Số điện thoại:</label>
            </div>
            <div className="input-field col s12">
              <input
                id="diachi"
                type="text"
                className="validate"
                ref={(ref) => { this.diachi = ref; }}
              ></input>
              <label htmlFor="diachi">Địa chỉ</label>
            </div>
          </div>
          <div className="row">
            <button className="waves-effect waves-light btn-small col s12">COD</button>

          </div>
        </form>

        {/* <button className="waves-effect waves-light btn-small orange col s12" onClick={this.onVisa}>Visa</button> */}
        <div className="row">
          <button className="waves-effect waves-light btn-small orange col s12" onClick={this.onHienNut}>Visa</button>
        </div>

        {/* //Stripe */}
        <div className={hienan}>
          <StripeProvider apiKey="pk_test_TPDLpDdrShNPxygRNPgBgOV9">
            <div className="example">
              <h4>Điền thông tin thẻ</h4>
              <Elements>
                <CheckoutForm
                  user={this.props.user}
                  onVisa={this.onVisa}
                  cart={this.props.cart}
                />
              </Elements>
            </div>
          </StripeProvider>
        </div>

        <p className="green-text">{msg}</p>
      </div>

    );
  }
}


const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//       onAddProduct: (product) => {
//           dispatch(actAddProductRequest(product));
//       },
//       onEditProduct: (id) => {
//           dispatch(actGetProductRequest(id));
//       },
//       onUpdateProduct: (product) => {
//           dispatch(actUpdateProductRequest(product));
//       }
//   }
// }

export default connect(mapStateToProps, null)(Thanhtoan);
// export default Thanhtoan;