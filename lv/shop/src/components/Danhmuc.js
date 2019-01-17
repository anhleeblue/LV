import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';


class Danhmuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loai: 'Tất cả'
    };
  }
  onFilter = (a) => {
    this.setState({
      loai: a
    });
    console.log(a);
    this.props.onFilter(a);

  }

  render() {
    var { loai } = this.state;
    // var nameHeader = this.onChange();
    // var elmTheloai = theloais.map((theloai , index) => {
    //     return <li key ={index}><a onClick={this.onChange(theloai)} >{theloai}</a><span> / </span></li>
    // })
    return (

      <div className="">
        <h1 id="name_danhmuc" className="center-align ">{loai}</h1>

        <ul id="theloai">
          <li className="theloai"><Link to="" className="link_danhmuc" onClick={() => this.onFilter('Tất cả')}>Tất cả</Link></li>
          <span> / </span>
          <li className="theloai"><Link to="" className="link_danhmuc" onClick={() => this.onFilter('Thuốc bảo vệ thực vật')}>Thuốc bảo vệ</Link></li>
          <span> / </span>
          <li className="theloai"><Link to="" className="link_danhmuc" onClick={() => this.onFilter('Phân Bón')}>Phân bón</Link></li>
          <span> / </span>
          <li className="theloai"><Link to="" className="link_danhmuc" onClick={() => this.onFilter('Khác')}>Khác</Link></li>
          {/* {elmTheloai} */}
        </ul>
      </div>

    )


  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilter: (loai) => {
      dispatch(actions.filterProduct(loai));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Danhmuc);
// export default Danhmuc;