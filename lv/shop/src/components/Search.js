

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onHandleChange = (event) => {
        
        this.setState({
            keyword : event.target.value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword); // dispatch searchTask
    }
    render() {
        return (
            <div>
        <i id="search" data-target="modal1" className="modal-trigger material-icons right">search</i>
        {/*
        <!-- Modal Structure --> */}
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div className="row" id="modal_search">
            <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                    id="tiemkiem" 
                    type="text" 
                    className="validate"
                    onChange={this.onHandleChange}
                    value={this.state.keyword}
                    name="keyword"></input>
                    <label>Nhập tên sản phẩm</label>
                    <Link to="/" onClick={this.onSearch} className="waves-effect waves-light btn green white-text"><i className="material-icons right white-text">search</i>Tìm
                    kiếm</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
