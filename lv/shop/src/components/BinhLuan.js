import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actUpdateProductRequestBinhluan } from './../actions/index';
class BinhLuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            binhluan:'',
            message:''
        };
    }
    onChange = (e) => {
        // e.preventDefault();
        // var target = e.target;
        // var name = target.name;
        // var value = target.type === 'checkbox' ? target.checked : target.value;
        // var productImage = target.files[0];
        //  console.log(productImage);
        var userName = this.props.user.userName;
        this.setState({
            userName: userName,
            binhluan: this.binhluan.value,
            
        });

    }
    onSave = (e) => {
        e.preventDefault();        
        var {history} =this.props;
        if(this.props.user.userName === ''){
            return this.setState({
                message: 'Bạn phải đăng nhập để bình luận'
            })
        }
        else if(this.binhluan.value === ''){
            return this.setState({
                message: 'Bạn phải nhập để bình luận'
            })
        }
        else{
            var binhluan = {
                userName:this.state.userName,
                binhluan: this.state.binhluan
            }
            // var product = [
            //     {
            //         "propName":"binhluans",
            //         "value":[
            //             binhluan
            //         ]
            //     }
            // ]
            // console.log(product);
            var id = this.props.itemEditing._id;
            this.props.onAddBinhLuan(binhluan, id);
            // console.log("Ham binh luan o Binhluan . js");
            this.binhluan.value = '';
            history.push('/');
        }
        


        // axios.post('http://localhost:4000/products/',product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
        //     console.log(res);
        // });
        // if (res.data.product._id) {
        // this.props.onUpdateProduct(product);
        // } else {
        // if (this.binhluan.value === '' || this.loai.value === '' || this.cachdung.value === '' || this.xuatxu.value === '' || this.price.value === '' || this.txtName.value === '') {
        //     return this.setState({
        //         message: 'Bạn phải nhập đầy đủ thông tin của sản phẩm'
        //     })
        // }
        // else {
        //     this.props.onAddProduct(product);
            
        // }

    }
    render() {
        
        return (
            <div className="formBinhluan">
                <form action="" onSubmit={this.onSave}>
                    <input 
                    placeholder="Nhập nhận xét" 
                    type="text"
                    onChange={this.onChange}
                    ref={(ref) => { this.binhluan = ref; }}
                    ></input>
                    <button type="submit" className="btn btn-small">Lưu Lại</button>
                    <p className="red-text">{this.state.message}</p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user:state.user,
        itemEditing:state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddBinhLuan: (product, id) => {
            dispatch(actUpdateProductRequestBinhluan(product , id));
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinhLuan);
// export default BinhLuan;
