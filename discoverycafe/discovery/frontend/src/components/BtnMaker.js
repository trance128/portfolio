/*
Generates the correct button style by combining necessary style classes
*/

import React from 'react';

import styles from '../styles.js';

const BtnMaker = (props) => {
  let style = {...styles.btnGeneral, ...styles.btnText}

  if (props.selected) {
    style = {...style, ...styles.btnSelected}
  } else {
    (props.index % 2 ? style = {...style, ...styles.btnOne} : style = {...style, ...styles.btnTwo} )
  }

  switch(props.type) {
    case "payPage":
      style = {...style, ...styles.btnGeneral, ...styles.btnPayPage}
      props.index % 2 ? style={...style, ...styles.btnOne} : style = {...style, ...styles.btnTwo}
      break;
    case "topNav":
      style = {...style, ...styles.btnTopNav}
      break;
    case "centerBar":
      style= {...style, ...styles.btnCenterBar}
      break;
    case "btnBottomRed":
      style = {...style, ...styles.btnRed, ...styles.btnBottom}
      break;
    case "btnBottomBlue":
      style = {...style, ...styles.btnBlue, ...styles.btnBottom}
      break;
    case "btnBlue":
      style = {...style, ...styles.btnBlue}
      break;
    case "btnYellow":
      style= {...style, ...styles.btnYellow}
      break;
    case "btnYellowPay":
      style={...style, ...styles.btnYellow, ...styles.btnPayPage}
      break;
    default:
      break;
  }

  return <div key={props.index} style={style} onClick={props.callback}>{ props.obj.name }</div>
}

export default BtnMaker
