import React, { Component } from 'react';
import './../css/home.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BannerHome from './BannerHome';
import Signup from './Signup'
class Header extends Component {
render() {
return (
<Router>
    <header>
        <div className="wrap">
            <div id="contact" className="container">
                <p className="left hide-on-small-only">Chào mừng đến với Cây Đẹp</p>
                <p className="right"><i className="material-icons left">local_phone</i> 093.991.3199 </p>
            </div>

        </div>
        <div className="logo container">
            <h2 id="logo" className="center-align">Cây Đẹp</h2>
        </div>
        {/*
        <!-- MENU sidenav --> */}
        <ul id="slide-out" className="sidenav">
            <h5 className="center-align">Điều hướng</h5>

            <li><a href="index.html">Trang chủ</a></li>
            <li><a href="#!">Giới thiệu</a></li>
            <li><a href="#!">Sản Phẩm</a></li>
            <li><a href="#!">Kinh Nghiệm</a></li>
            <li><a href="#!">Hướng dẫn mua hàng</a></li>
            <li><a href="#!">Chính sách đại lý</a></li>
            <li><a href="#!">Liên hệ</a></li>

        </ul>
        <div id="menu" className="container">
            <a href="#" data-target="slide-out" className="sidenav-trigger left "><i id="menu_logo" className="material-icons ">menu</i></a>
            <a id="me" className="right valign-wrapper black-text dropdown-trigger" data-target='dropdown1' href=""><i
                    id="search" className="material-icons ">person</i>
                <span>10</span> </a>
            <ul id='dropdown1' class='dropdown-content'>
                <li><Link to={Signup}>Đăng kí</Link></li>
                <li><Link to={Signup}>Đăng nhập</Link></li>
                
            </ul>
            <a className="right" href=""><i id="search" className="material-icons">shopping_cart</i> <span>10</span></a>
            <i id="search" data-target="modal1" className="modal-trigger material-icons right">search</i>
            {/*
            <!-- Modal Structure --> */}
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <div className="row" id="modal_search">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="tiemkiem" type="text" className="validate"></input>
                                    <label>Nhập tên sản phẩm</label>
                                    <a className="waves-effect waves-light btn green white-text"><i className="material-icons right white-text">search</i>Tìm
                                        kiếm</a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <BannerHome />
    </header>
</Router>

);
}
}

export default Header;