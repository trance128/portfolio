import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux';

import styles from '../styles';
import BtnMaker from './BtnMaker';
import { hideCardButtons, displayPayButtons } from '../store';

const PayRightSide = (props) => {
  const displayChangeBool = useSelector(store => store.displayChange);
  const displayCardButtonsBool = useSelector(store => store.displayCardButtons);
  const displayPayButtonsBool = useSelector(store => store.displayPayButtons);
  const change = useSelector(store => store.change);
  const message = useSelector(store => store.message);

  const dispatch = useDispatch();

  // sends data to server, using card as payment method
  const processAcceptCard = () => {
    // TODO
  }

  // switches to cash payment, hides card buttons
  const switchToCashPayment = () => {
    batch(() => {
      dispatch(hideCardButtons());
      dispatch(displayPayButtons());
    })
  }

  if( displayPayButtonsBool ) {
    return (
      <div style={styles.cartEntryContainer}>
        <div style={styles.errorText}>{message}</div>
        <div>
        <BtnMaker
          index={1}
          obj={{name: "5"}}
          selected={false}
          callback={() => props.processCashPayment(5)}
          type="payPage"
          />
        <BtnMaker
          index={2}
          obj={{name: "10"}}
          selected={false}
          callback={() => props.processCashPayment(10)}
          type="payPage"
          />
        <BtnMaker
          index={3}
          obj={{name: "15"}}
          selected={false}
          callback={() => props.processCashPayment(15)}
          type="payPage"
          />
        <BtnMaker
          index={4}
          obj={{name: "20"}}
          selected={false}
          callback={() => props.processCashPayment(20)}
          type="payPage"
          />
        <BtnMaker
          index={5}
          obj={{name: "Use Card"}}
          selected={false}
          callback={() => props.processUseCard()}
          type="payPage"
          />
        </div>
      </div>
    )
  } else if ( displayCardButtonsBool ) {
    return(
      <div style={styles.cartEntryContainer}>
        <div style={styles.cartEntryMid}>
          <div style={styles.payPageRightCenter}>
            <h1 style={styles.titleText}>Please enter details in card reader</h1>
          </div>
        </div>

        <div style={styles.payRightSideBottomButtons}>
          <BtnMaker
            index={1}
            obj={{name: "Done"}}
            selected={false}
            callback={() => processAcceptCard()}
            type="btnBottomBlue"
            />
          <BtnMaker
            index={1}
            obj={{name: "Pay with Cash"}}
            selected={false}
            callback={() => switchToCashPayment()}
            type="btnBottomRed"
            />
        </div>
      </div>
    )
  } else if ( displayChangeBool ) {
    return(
      <div style={styles.cartEntryContainer}>
        <div style={styles.cartEntryMid}>
          <div style={styles.payPageRightCenter}>
            <h1 style={styles.titleText}>Change: £{change.toFixed(2)}</h1>
          </div>
        </div>

        <div style={styles.payRightSideBottomButtons}>
          <Link to="/">
            <BtnMaker
              index={1}
              obj={{name: "Ok"}}
              selected={false}
              type="btnYellowPay"
              />
          </Link>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <h1 style={styles.titleText}>An Unknown error has occured.</h1>
        <p>You should not be seeing this message.</p>
        <p>Please contact the website admin and tell them how you got here so he may resolve the issue</p>
      </div>
    )
  }
}

export default withRouter(PayRightSide);
