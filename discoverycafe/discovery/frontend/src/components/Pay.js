import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux';

import styles from '../styles';
import CartDetails from './CartDetails';
import PayRightSide from './PayRightSide';
import BtnMaker  from './BtnMaker';
import {setTotal} from '../store';
import { displayChange, hideChange, hidePayButtons, displayPayButtons,
  displayCardButtons, setMessage, hideCardButtons, setChange, setLeftToPay } from '../store';

const Pay = () => {
  const cart = useSelector(store => store.cart);
  const total = useSelector(store => store.total);
  const leftToPay = useSelector(store => store.leftToPay)

  const dispatch = useDispatch();

  // error handling in case of empty cart
  useEffect(() => {
    if(cart.length > 0) {
      batch(() => {
        dispatch(setMessage(""))
        dispatch(displayPayButtons());
        dispatch(setChange(0));
        dispatch(setLeftToPay(0));
      })
    } else {
      batch(() => {
        dispatch(setMessage("Cart is Empty"));
        dispatch(hidePayButtons());
      })
    }
  }, [])

  // calculates how much change to give
  const processCashPayment = (cash) => {
    let val;
    leftToPay ? val = leftToPay : val = total;

    if((val-cash) > 0) {
      batch(() => {
        dispatch(setMessage(`£${(val-cash).toFixed(2)} left to pay`));
        dispatch(setLeftToPay(val-cash));
      })
    } else {
      batch(() => {
        dispatch(setChange(cash-val));
        dispatch(displayChange());
        dispatch(hideCardButtons());
        dispatch(hidePayButtons());
        // TODO -- add item to server
      })
    }
  }

  const processUseCard = () => {
    batch(() => {
      dispatch(hidePayButtons());
      dispatch(displayCardButtons());
    })
  }

  return(
    <div style={styles.secondaryPageLayerOne}>
      <div style={styles.secondaryPageLayerTwo}>
        <div style={{...styles.secondaryPageLeft, ...styles.payPageBackground}}>
          <div style={styles.secondaryPageLayerThree}>
            <div>
              <CartDetails />
            </div>

            <div style={styles.cartEntryBottom}>
              <Link to="/">
                <BtnMaker
                  index={1}
                  obj={{name: "Add More"}}
                  type="btnBottomBlue"
                  selected={false}
                  />
                </Link>
            </div>
          </div>
        </div>

        <div style={styles.secondaryPageRight}>
          <PayRightSide processCashPayment={processCashPayment} processUseCard={processUseCard}/>
        </div>
      </div>
    </div>
  )
}

export default Pay
