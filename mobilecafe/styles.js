import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from './constants/Colors';
import layout from './constants/Layout';

const wideButton = layout.window.width * 0.80;
const narrowButton = layout.window.width * 0.45;
const buttonMargin = layout.window.width * .025;
const buttonMarginNarrow = layout.window.width * .01;
const buttonHeight = 50;

const hrWidth = layout.window.width * 0.70;

const containerWidth = layout.window.width * .95;
const containerTopMargin = layout.window.width * .025;
const containerTopMarginLarge = containerTopMargin * 2;
const containerBottom = buttonHeight * 2 + buttonMargin * 3;
const containerBottomSingleButton = buttonHeight + buttonMargin * 2;

const topNavHeight = layout.window.height * .09;
const summaryOptionMargin = layout.window.width * 0.1;
const summaryRowMargin = layout.window.width * 0.05;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  containerTop: {
    marginTop: containerTopMargin,
    flex: 1,
    width: containerWidth,
  },
  containerTopUploadResultPage: {
    marginTop: containerTopMarginLarge,
    flex: 1,
    width: containerWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBottom: {
    height: containerBottom,
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerBottomSingleButton: {
    height: containerBottomSingleButton,
  },
  containerOne: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.grayTint1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerLayerTwoTopNav: {
    backgroundColor: colors.whiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: containerTopMargin,
    width: containerWidth,
    borderColor: colors.grayTint2,
    borderWidth: 1,
    borderRadius: 5,
    height: topNavHeight,
  },
  containerLayerTwo: {
    backgroundColor: colors.whiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: containerTopMargin,
    marginBottom: containerTopMargin,
    width: containerWidth,
    borderColor: colors.grayTint2,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonStyle1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: buttonMargin,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 7,

    borderColor: colors.mainColorTwo,
    backgroundColor: colors.mainColorOneTransparent,
  },
  buttonStyle2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: buttonMargin,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 7,

    borderColor: colors.mainColorOne,
    backgroundColor: colors.mainColorTwoTransparent,
  },
  buttonSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: buttonMargin,
    elevation: 1,

    borderColor: colors.mainColorTwo,
    backgroundColor: colors.grayTint5,
  },
  buttonBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: buttonMargin,
    elevation: 7,

    backgroundColor: colors.blue,
    borderColor: colors.blueTransparent,

    marginBottom: buttonMargin,
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.dullRed,
    borderColor: colors.dullRedTransparent,

    marginBottom: buttonMargin,
  },
  buttonSand: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wideButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.sandy,
    borderColor: colors.sandyTransparent,

    marginBottom: buttonMargin,
  },
  buttonRedNarrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: narrowButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.dullRed,
    borderColor: colors.dullRedTransparent,

    margin: buttonMarginNarrow,
  },
  buttonSandNarrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: narrowButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.sandyTransparent,
    borderColor: colors.sandy,

    margin: buttonMarginNarrow,
  },
  buttonBlueNarrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: narrowButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.blueTransparent,
    borderColor: colors.blue,

    margin: buttonMarginNarrow,
  },
  buttonPurpleNarrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: narrowButton,
    height: buttonHeight,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 7,

    backgroundColor: colors.dullPurpleTransparent,
    borderColor: colors.dullPurple,

    margin: buttonMarginNarrow,
  },
  mainText: {
    fontFamily: 'sans-serif',
    fontSize: 20,
  },
  summaryOptionText: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontStyle: 'italic',
  },
  buttonText: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'sans-serif',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  summaryItemRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: summaryRowMargin,
  },
  summaryItem: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  summaryPrice: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  summaryOptionRow: {
    marginLeft: summaryOptionMargin,
  },
  hr: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    width: hrWidth,
    alignSelf: 'center',
  },
  marginBottom: {
    margin: buttonMargin,
  },
});

export default styles
