/*
Displays a bootstrap style table with itemized cart details
*/

import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles';

const CartDetails = () => {
  // loading necessary store data
  const cart = useSelector(store => store.cart)
  const options = useSelector(store => store.options)
  const breadTypes = useSelector(store => store.breadTypes)
  const total = useSelector(store => store.total)

  return(
    <React.Fragment>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            // iterating over all entries in cart
            cart.map((cartEntry, index) =>
              <>
                <tr key={`item${index}`}>
                  <td>{index}</td>
                  { /* displays main item and price, alongside notes if relevant */ }
                  <td style={styles.cartEntryMainText}>{cartEntry.item.name}
                    { cartEntry.notes &&
                      <>
                        <div style={styles.cartEntryNotesText}>{cartEntry.notes}</div>
                      </>
                    }
                    {
                      cartEntry.options &&
                        options.map(option =>
                          cartEntry.options.includes(option.pk) &&
                            <>
                              <div style={styles.cartEntryOptionText}>{option.name}</div>
                            </>
                        )
                    }
                    {
                      cartEntry.bread &&
                        breadTypes.map(bread =>
                          cartEntry.bread === bread.pk &&
                            <>

                              <div style={styles.cartEntryOptionText}>{bread.name}</div>
                            </>
                        )
                    }
                  </td>
                  <td style={styles.cartEntryMainText}>£{ cartEntry.price.toFixed(2) }</td>
                </tr>


              </>
            )
          }
        </tbody>
      </table>

      <hr style={styles.hr} />
      <h1 style={styles.cartEntryTotalText}>Total: £{total.toFixed(2)}</h1>
    </React.Fragment>
  )
}

export default CartDetails
