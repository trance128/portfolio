import bgImage from './static/images/wide2.jpg'
import payBgImage from './static/images/coffee3.jpg'

const mainColorOne = "#b38a55"
const mainColorTwo = "#dbc6ad"
const mainColorTwoTransparent = 'rgba(242, 235, 226, 0.9)'
const borderLight = "#A57D49"
const gray = '#555555'
// const grayTransparent = 'rgba(230, 230, 230, 0.9)'
const lightGray = '#eee'
const lighterGrayTransparent = 'rgba(250, 247, 244, 0.8)'
const darkGray = '#2c2b2f'
const white = '#fff'
const whiteTransparent = 'rgba(255, 255, 255, 0.2)'
const black = '#000'
const blue = '#24a0ed'
const yellow = "#f1da7a"
const dullRed = '#cd1723'

const styles = {
  secondaryPageLayerOne: {
    display: 'flex',
    backgroundColor: lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  secondaryPageLayerTwo: {
    height: '80vh',
    display: 'flex',
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75vw',
  },
  secondaryPageLayerThree: {
    margin: '30px',
    backgroundColor: whiteTransparent,
    flex: 1,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  secondaryPageLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  secondaryPageRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  payPageBackground: {
    backgroundImage: `url("${payBgImage}")`,
    backgroundSize: 'cover',
  },
  containerLayerOne: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "92vh",
    backgroundColor: white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerLayerTwo: {
    display: 'flex',
    backgroundColor: lightGray,
    height: "90vh",
    flexDirection: 'row',
    width: "96vw",
    justifyContent: 'center',
  },
  containerLayerThree: {
    height: "87vh",
    width: "92vw",
    backgroundImage: `url("${bgImage}")`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'row',
  },
  containerRightSideBar: {
    backgroundColor: lighterGrayTransparent,
    margin: 10,
    padding: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sideBar: {
    flex: 1,
    display: "flex",
    flexDirection: 'column',
    backgroundColor: mainColorTwoTransparent,
    borderStyle: 'solid',
    borderColor: mainColorTwo,
    borderWidth: 2,
  },
  centerBar: {
    flex: 4,
    backgroundColor: whiteTransparent,
    display: 'flex',
    flexDirection: 'column',
    height: "100%",
    justifyContent: 'flex-end',
  },
  centerBarItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  bottomCenterBar: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '8vh',
    backgroundColor: darkGray,
  },
  btnGeneral: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0 20px",
    height: "6vh",
    borderRadius: 5,
    margin: "15px",
    display: "flex",
    boxShadow: `5px 5px 7px ${darkGray}`,
  },
  btnText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '20px',
    color: white,
    textAlign: 'center',
    textShadow: `1px 1px 2px ${black}`,
  },
  btnOne: {
    border: `1px solid ${borderLight}`,
    backgroundColor: mainColorTwo,
  },
  btnTwo: {
    border: `1px solid ${mainColorTwo}`,
    backgroundColor: mainColorOne,
  },
  btnSelected: {
    backgroundColor: gray,
    border: `1px solid ${mainColorTwo}`,
    boxShadow: `2px 2px 2px ${darkGray}`
  },
  btnTopNav: {
    minWidth: '200px',
  },
  btnRed: {
    backgroundColor: dullRed,
  },
  btnBottom: {
    width: '350px',
  },
  btnBlue: {
    backgroundColor: blue,
  },
  btnYellow: {
    backgroundColor: yellow,
  },
  btnCenterBar: {
    minWidth: '150px',
    maxWidth: '250px',
    height: "6.5vh",
    margin: 10,
  },
  btnPayPage: {
    width: '350px',
    marginTop: '2.5vh',
  },
  hr: {
    width: '70%',
    marginBottom: '20px'
  },
  cartEntryContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cartEntryMid: {
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  payPageRightCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payRightSideBottomButtons: {
    alignSelf: 'center',
    justifySelf: 'end',
    marginBottom: '1vh',
  },
  cartEntryBottom: {
    alignSelf: 'center',
    justifySelf: 'end',
  },
  cartEntryRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartEntryMainText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '18px',
  },
  cartEntryTotalText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '26px',
    fontStyle: 'bold',
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '26px',
    fontStyle: 'bold',
    textAlign: 'center',
  },
  cartEntryOptionText: {
    marginLeft: '20px',
    fontFamily: 'Montserrat-Bold',
    fontSize: '16px',
  },
  cartEntryNotesText: {
    marginLeft: '30px',
    fontFamily: 'Montserrat-Bold',
    fontSize: '16px',
    fontStyle: 'italic',
  },
  errorText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '22px',
    color: dullRed,
    textAlign: 'center',
  }
}

export default styles
