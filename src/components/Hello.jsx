import fetch from 'isomorphic-fetch';
require('es6-promise')
.polyfill();
import React, { Component } from 'react';
import '../styles/hello.less';
import { Button,DatePicker,Table } from 'element-react/next';
import Immutable from 'immutable'
import objectAssign from 'object-assign';
import generateColors from './color';


export default class Hello extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
          originalStyle: '',
          colors: {
            primary: '#20a0ff',
            vcheck: ''
          },
        };
    }

    handleClick = () => {
      fetch('elementCss/index.css',{
        method: "get"
      }).then(res => res.text()).then( data => {
        this.setState({
          originalStyle: this.getStyleTemplate(data)
        })
      })
    }

    handleClick2 = () => {
      let $$obj = Immutable.fromJS(this.state.colors);
      let $$newObj = $$obj.set('primary','red')
      this.setState({
        colors: objectAssign({}, $$obj.set('primary','red').toJS(), generateColors($$newObj.get('primary')))
      })
    }

    writeNewStyle() {
      let cssText = this.state.originalStyle;
      Object.keys(this.state.colors).forEach(key => {
        cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.state.colors[key]);
      });
      let elStyle = document.head.querySelector('.el-style')
      if (!elStyle) {
        const style = document.createElement('style');
        style.className = 'el-style'
        style.innerText = cssText;
        document.head.appendChild(style);
      }else {
        elStyle.innerText = cssText
      }

    }

    getStyleTemplate(data) {
        const colorMap = {
          '#108ee9': 'vcheck',
          '#20a0ff': 'primary',
          '#0190fe': 'secondary',
          '#fbfdff': 'darkWhite',
          '#1f2d3d': 'baseBlack',
          '#324157': 'lightBlack',
          '#48576a': 'extraLightBlack',
          '#8391a5': 'baseSilver',
          '#97a8be': 'lightSilver',
          '#bfcbd9': 'extraLightSilver',
          '#d1dbe5': 'baseGray',
          '#e4e8f1': 'lightGray',
          '#eef1f6': 'extraLightGray',
          '#1d90e6': 'buttonActive',
          '#4db3ff': 'buttonHover',
          '#dfe6ec': 'tableBorder',
          '#d2ecff': 'datepickerInRange',
          '#afddff': 'datepickerInRangeHover',
          '#1c8de0': 'selectOptionSelected',
          '#edf7ff': 'lightBackground'
        };
        Object.keys(colorMap).forEach(key => {
          const value = colorMap[key];
          data = data.replace(new RegExp(key, 'ig'), value);
        });
        return data;
      }
      componentDidUpdate() {
        this.writeNewStyle()
      }
    render() {
        return (
            <div>
                <div>stylus</div>
                <Button onClick={this.handleClick.bind(this)}>333333</Button>
                <Button onClick={this.handleClick2.bind(this)}>333333</Button>
                <div className="content">

                </div>
            </div>
        );
    }
}



Hello.propTypes = {

};
