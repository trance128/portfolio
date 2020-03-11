/*
Right Side Bar
Displays itemized cart information, also has pay / edit button at bottom
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from '../styles';
import { setTotal } from '../store';
import BtnMaker from './BtnMaker';

const RightSideBar = () => {
  // getting store data
  const cart = useSelector(store => store.cart)
  const options = useSelector(store => store.options)
  const breadTypes = useSelector(store => store.breadTypes)

  const dispatch = useDispatch()

  // calculates total cost of cart and sets it to store
  let total = 0;
  cart.forEach(cartEntry => {
    total += cartEntry.price;
  })
  dispatch(setTotal(total))

  return(
    <div style={styles.sideBar}>
      <div style={styles.containerRightSideBar}>
        <div>
          {
            cart.length > 0 &&
            cart.map((cartEntry, index) =>
              <div key={index} style={styles.cartEntryContainer}>
                <div style={styles.cartEntryRow}>
                  <div style={styles.cartEntryMainText}>{cartEntry.item.name}</div>
                  <div style={styles.cartEntryMainText}>£{(cartEntry.price).toFixed(2)}</div>
                </div>
                { cartEntry.options && (
                  options.map((option, index) => cartEntry.options.includes(option.pk) &&
                    <div key={index} style={styles.cartEntryRow}>
                      <div style={styles.cartEntryOptionText}>{option.name}</div>
                    </div>)
                )}
                { cartEntry.bread && (
                  breadTypes.map((bread, index) => cartEntry.bread === bread.pk &&
                    <div key={index} style={styles.cartEntryRow}>
                      <div style={styles.cartEntryOptionText}>{bread.name}</div>
                    </div>
                  )
                )}
                {
                  cartEntry.notes && (
                    <div style={styles.cartEntryRow}>
                      <div style={styles.cartEntryNotesText}>{cartEntry.notes}</div>
                    </div>
                  )
                }

              </div>
            )
          }
          {
            cart.length > 0 &&
            <div>
              <hr style={styles.hr} />
              <div style={styles.cartEntryTotalText}>Total:  £{total.toFixed(2)}</div>

            </div>
          }
        </div>

        <div>
          <Link to="/edit">
            <BtnMaker
              index={1}
              obj={{name: "Edit"}}
              type="btnYellow"
              selected={false}
              />
            </Link>
          <Link to="/pay">
            <BtnMaker
              index={1}
              obj={{name: "Checkout"}}
              type="btnBlue"
              selected={false}
              />
            </Link>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
