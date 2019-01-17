import React, { Component } from 'react';


class BinhLuanItem extends Component {
    render() {
        var {binhluan} = this.props;
            var time = Date(binhluan.at).toLocaleString('en-EN', {
                timezone: 'UTC +7'
              });
        // console.log(binhluan);
        return (
            <div className="BinhLuanItem">
                <span> <strong>{binhluan.userName} :</strong>  </span>
                 
                <p>{binhluan.binhluan}</p><br></br>
                <p className="binhluan">{time}</p>
            </div>
        );
    }
}

export default BinhLuanItem;
