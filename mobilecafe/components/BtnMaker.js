import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

import styles from '../styles';
import colors from '../constants/Colors';

const BtnMaker = (props) => {
  let style;
  if(!props.style) {
    style = props.index % 2 ? styles.buttonStyle1 : styles.buttonStyle2
    if (props.selected) style = styles.buttonSelected
  } else {
    style=props.style

    if(props.selected){
      style= {...style, backgroundColor: colors.grayTint5 }
    }
  }

  return <TouchableHighlight onPress={props.callback} style={style}><Text style={styles.buttonText}>{ props.obj.name }</Text></TouchableHighlight>
}

export default BtnMaker
