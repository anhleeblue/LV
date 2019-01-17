import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../actions/index';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            loai: '',
            txtXuatxu: '',
            txtCongdung: '',
            txtCachdung: '',
            chkbStatus: false,
            productImage: '',
            message: ''
        };
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                loai: itemEditing.loai,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                txtXuatxu: itemEditing.xuatxu,
                txtCongdung: itemEditing.congdung,
                txtCachdung: itemEditing.cachdung,
                chkbStatus: itemEditing.status,
                productImage: itemEditing.productImage
            });
        };
    }

    onChange = (e) => {
        // e.preventDefault();
        // var target = e.target;
        // var name = target.name;
        // var value = target.type === 'checkbox' ? target.checked : target.value;
        // var productImage = target.files[0];
        //  console.log(productImage);
        this.setState({
            loai: this.loai.value,
            txtName: this.txtName.value,
            txtPrice: this.price.value,
            txtXuatxu: this.xuatxu.value,
            txtCongdung: this.congdung.value,
            txtCachdung: this.cachdung.value,
            tinhtrang: this.tinhtrang.value,
            productImage: this.productImage.files[0]
        });

    }



    onSave = (e) => {
        e.preventDefault();
        // var {productImage} = this.state;
        // var jwt = localStorage.getItem('myjwt');
        console.log(this.productImage.files[0]);
        // var target = e.target;
        var { history } = this.props;
        var product = new FormData();
        product.append('productImage', this.productImage.files[0]);
        product.append('name', this.txtName.value);
        product.append('price', this.price.value);
        product.append('xuatxu', this.xuatxu.value);
        product.append('cachdung', this.cachdung.value);
        product.append('congdung', this.congdung.value);
        product.append('loai', this.loai.value);
        product.append('tinhtrang', this.tinhtrang.value);


        // axios.post('http://localhost:4000/products/',product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
        //     console.log(res);
        // });
        // if (res.data.product._id) {
        // this.props.onUpdateProduct(product);
        // } else {
        if (this.tinhtrang.value === '' || this.loai.value === '' || this.cachdung.value === '' || this.xuatxu.value === '' || this.price.value === '' || this.txtName.value === '') {
            return this.setState({
                message: 'Bạn phải nhập đầy đủ thông tin của sản phẩm'
            })
        }
        else {
            this.props.onAddProduct(product);
            history.goBack();
        }

    }
    render() {
        // var {chkbStatus} = this.state;
        // console.log(this.state);
        // console.log(productImage);
        return (
            <div className="container">
                <h3>Thêm sản phẩm</h3>
                <form className="col s12" onSubmit={this.onSave}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="ten_sanpham"
                                type="text"
                                className="validate"
                                onChange={this.onChange}
                                ref={(ref) => { this.txtName = ref; }}
                            ></input>
                            <label htmlFor="ten_sanpham">Nhập tên sản phẩm:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                ref={(ref) => { this.price = ref; }}
                                id="gia" type="text" className="validate"></input>
                            <label htmlFor="gia">Giá:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col s12">
                            {/* <label htmlFor="loai">Loại:</label> */}
                            <select defaultValue className="loai"
                                //name="loai" 
                                //value={loai} 
                                onChange={this.onChange}
                                ref={(ref) => { this.loai = ref; }}
                            >
                                <option value="" >Chọn loại</option>
                                <option value="Phân Bón">Phân Bón</option>
                                <option value="Thuốc bảo vệ thực vật">Thuốc bảo vệ thực vật </option>
                                <option value="Khác">Khác</option>
                            </select>

                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                ref={(ref) => { this.xuatxu = ref; }} id="xuatxu" type="text" className="validate"></input>
                            <label htmlFor="xuatxu">Xuất xứ:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                onChange={this.onChange}
                                ref={(ref) => { this.congdung = ref; }} id="congdung" type="text"
                                className="materialize-textarea"></textarea>
                            <label htmlFor="congdung">Công dụng</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                onChange={this.onChange}
                                ref={(ref) => { this.cachdung = ref; }} id="cachdung" type="text"
                                className="materialize-textarea"></textarea>
                            <label htmlFor="cachdung">Cách dùng</label>
                        </div>
                    </div>

                    <div className="row">
                        {/* <div className="input-field col s12">
                            <input
                                ref={(ref) => { this.tinhtrang = ref; }}
                                id="tinhtrang" type="text"
                                className="validate"
                                onChange={this.onChange}
                            ></input>
                            <label htmlFor="tinhtrang">Tình trạng:</label>
                 
                        </div> */}
                        <div className=" col s12">
                            {/* <label htmlFor="loai">Loại:</label> */}
                            <select defaultValue className="loai"
                                //name="loai" 
                                //value={loai} 
                                onChange={this.onChange}
                                ref={(ref) => { this.tinhtrang = ref; }}
                            >
                                <option value="" >Chọn tình trạng</option>
                                <option value="Còn hàng">Còn hàng</option>
                                <option value="Hết hàng">Hết hàng</option>
                                
                            </select>

                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input
                                        //name="productIamge" 
                                        //value={productImage} 
                                        onChange={this.onChange}
                                        ref={(ref) => { this.productImage = ref; }}
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
                    <p className="red-text">{this.state.message}</p>
                    <button type="submit" className="btn btn-small">Lưu Lại</button>

                </form>
            </div>

        );
    }

}
const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
// export default AddProduct;