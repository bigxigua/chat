import React, { Component } from 'react';
import '../scss/pageheader.scss'

export default class PageHeader extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="page-header">
        <i className="w-icon-arrow-left" onClick={this.props.setPageState}></i>
        <span>用户资料</span>
      </div>
    )
  }
}