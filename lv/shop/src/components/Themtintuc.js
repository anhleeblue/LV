import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { actLoginRequest} from './../actions/index';
// import callApi from './../utils/apicaller';

import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Themtintuc extends Component {
    
render() {

return (
    <div id="" className="container">
        <h3>ĐĂNG TIN</h3>
        <div className="row">
            <div className="input-field col s12">
                <input id="tieudetintuc" type="text" className="validate"></input>
                <label for="tieudetintuc">Tiêu đề</label>
            </div>
            <div className="input-field col s12">
                <textarea id="noidungtintuc" type="text" className="validate"></textarea>
                <label for="noidungtintuc">Nội dung</label>
            </div>
            <div className="input-field col s12">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Hình ảnh</span>
                                    <input
                                        //name="productIamge" 
                                        //value={productImage} 
                                        //onChange={this.onChange}
                                        //ref={(ref) => { this.productImage = ref; }}
                                        type="file"></input>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"></input>
                                </div>
                            </div>
                            {/* <input name="productIamge" value={productImage} onChange={this.onChange} id="productImage" type="file"
                    className="validate"></input> */}

                        </div>
      </div>
                    <button className= "btn btn-small"> Đăng tin</button>
    </div>
);
}

}


 export default Themtintuc;