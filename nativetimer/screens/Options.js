/*
Options Screen.

Allows us to change work time / break time

*/

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch, batch } from 'react-redux';

import { updateSettings, reset, hideOptions } from '../redux'

export default function Options(props) {
  // getting redux state items
  const wMin = useSelector(state => state.settings.workMinutes)
  const wSec = useSelector(state => state.settings.workSeconds)
  const bMin = useSelector(state => state.settings.breakMinutes)
  const bSec = useSelector(state => state.settings.breakSeconds)

  // redux dispatch
  const dispatch = useDispatch();

  // presentational state to use in form
  const [wm, setWM] = useState(wMin)
  const [ws, setWS] = useState(wSec)
  const [bm, setBM] = useState(bMin)
  const [bs, setBS] = useState(bSec)

  // handles change of values, changes any value above 59 for seconds to 59
  // that shouldn't be possible, but doing it just in case
  // if string is empty, instead use 0
  const handleWM = (event) => {
    setWM(event.nativeEvent.text || 0)
  }
  const handleWS = (event) => {
    (event.nativeEvent.text > 59 ? setWS(59) : setWS(event.nativeEvent.text || 0))
  }
  const handleBM = (event) => {
    setBM(event.nativeEvent.text || 0)
  }
  const handleBS = (event) => {
    (event.nativeEvent.text > 59 ? setBS(59) : setBS(event.nativeEvent.text || 0))
  }

  // save options, closes options page
  const saveOptions = () => {
    // save new values
    // if invalid time provided, set seconds to 2 to prevent strange behaviour
    // double equals used as values stored as strings
    dispatch(updateSettings({
      workMinutes: Number(wm),
      workSeconds: (wm == 0 && ws == 0) ? 2 : ws,
      breakMinutes: Number(bm),
      breakSeconds: (bm == 0 && bs == 0) ? 2 : bs,
    }))

    // reset timer and hide options
    dispatch(reset());
    dispatch(hideOptions());
  }

  // cancel hides options, doesn't save
  const cancel = () => {
    dispatch(hideOptions());
  }

  return(
    <View style={styles.container}>
          <View style={styles.containerOpt1}>
          </View>

          <View style={styles.containerOpt1}>
            <View style={styles.containerOpt1}>
              <Text style={styles.optionsText}>Work Time:</Text>
            </View>

            <View style={styles.containerOpt1}>
              <View style={styles.containerOpt2}>
                <TextInput style={styles.optionsText2}
                  keyboardType="numeric"
                  placeholder={String(wMin)}
                  value={wm}
                  onChange={handleWM}
                  />
                <Text style={styles.optionsText2}>:</Text>
                <TextInput
                  keyboardType="numeric"
                  max="59"
                  style={styles.optionsText2}
                  placeholder={String(wSec <= 9 ? `0${wSec}` : wSec)}
                  value={ws}
                  onChange={handleWS}
                  />
              </View>
            </View>

          </View>

          <View style={styles.containerOpt3}>
          </View>

          <View style={styles.containerOpt1}>
            <View style={styles.containerOpt1}>
              <Text style={styles.optionsText}>Break Time:</Text>
            </View>
            <View style={styles.containerOpt1}>
              <View style={styles.containerOpt2}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.optionsText2}
                  placeholder={String(bMin)}
                  value={bm}
                  onChange={handleBM}
                  />
                  <Text style={styles.optionsText2}>:</Text>
                  <TextInput
                    keyboardType="numeric"
                    max="59"
                    placeholder={String(bSec <= 9 ? `0${bSec}` : bSec)}
                    style={styles.optionsText2}
                    value={bs}
                    onChange={handleBS}
                    />
              </View>
            </View>
          </View>

          <View style={styles.containerOpt3}>
          </View>

          <View style={styles.containerOpt1}>
            <View style={styles.containerOpt2}>
              <TouchableHighlight onPress={saveOptions} style={styles.optionButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={cancel} style={styles.optionButton2}>
                <Text style={styles.buttonText3}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff0f6',
  },
  buttonText3: {
    textAlign: 'center',
    color: '#ff2222',
  },
  optionButton: {
    borderColor: '#fff0f5',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    margin: 20,
    width: 100,
  },
  optionButton2: {
    borderColor: '#ff2222',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    margin: 20,
    width: 100,
  },
  containerOpt1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerOpt2: {
    flexDirection: 'row',
  },
  containerOpt3: {
    flex: 0.5,
  },
  optionsText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff0f5',
    fontSize: 20,
  },
  optionsText2: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff0f5',
    fontSize: 48,
  }
})
