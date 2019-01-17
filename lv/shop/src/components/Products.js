import React, { Component } from 'react';
import ProductItem from './ProductItem';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import Danhmuc from './Danhmuc'
// import callApi from './../utils/apicaller';
import {actFetchProductsRequest} from './../actions/index'
class Products extends Component {

    constructor(props){
        super(props);
        this.state = ({
            loai:''
        })
    }
 
 componentDidMount(){
   this.props.fetchAllProducts();
 }
  render() {

      var {products,keyword,filterTable} = this.props;      
        //   console.log('Filtertable:' + filterTable);       
        //   var bien = filterTable.loai.toLowerCase();
        //   console.log(bien);
      products = products.filter((product) => {
          if(filterTable === 'Tất cả'){
            return products;
          }
          else{
        //     console.log(product);
        //     console.log(filterTable);
        // console.log(filterTable);
        // console.log(product.loai);
            return product.loai.toLowerCase().indexOf(filterTable.toLowerCase()) !== -1;
          }
       
        });    
      products = products.filter((product) => {
          
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    var elmProducts = products.map((product , index) => {
        return <ProductItem key ={index} product = {product} />
    })
                return (
        
      <section id="sanpham">
        <div className="container">
            <div className="row">
               
                <div className="col s12 m12 l12">
                    {/* <h1 id="name_danhmuc" className="center-align ">{theloai}</h1>
                    
               <ul id="theloai">
                   <li className="theloai"><Link to="" className="" onClick={this.onChange('Tất Cả')}>Tất cả</Link></li>
                   <span> / </span>
                   <li className="theloai"><Link to="" className="" onClick={this.onChange('Thuốc bảo vệ thực vật')}>Thuốc bảo vệ</Link></li>
                   <span> / </span>
                   <li className="theloai"><Link to="" className="" onClick={this.onChange('Phân Bón')}>Phân bón</Link></li>
                   <span> / </span>
                   <li className="theloai"><Link to="" className="" onClick={this.onChange('Khác')}>Khác</Link></li>
               </ul> */}
               <Danhmuc/>
                            
                    <div className="">
                        
                        {elmProducts}
                        
                                    

                    </div>
                    {/* <div  className="col s12 ">
                        <ul className="pagination" >
                            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                            <li className="active"><a href="#!">1</a></li>
                            <li className="waves-effect"><a href="#!">2</a></li>
                            <li className="waves-effect"><a href="#!">3</a></li>
                            <li className="waves-effect"><a href="#!">4</a></li>
                            <li className="waves-effect"><a href="#!">5</a></li>
                            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    </section>
    );
  }
}
const mapStateToProps = (state) =>{
    return {
        products: state.products,
        keyword : state.search,
        filterTable:state.filterTable
    }
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchAllProducts : () => {
            dispatch(actFetchProductsRequest());
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Products);