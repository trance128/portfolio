import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import styles from '../styles';
import BtnMaker from './BtnMaker';
import DisplayItemOptions from './DisplayItemOptions'
import { selectItem, selectBread, resetOptions, addCartEntry, removeLastItem, } from '../store';

const CenterBar = () => {
  // store data
  const items = useSelector(store => store.menuItems);
  const selectedItemType = useSelector(store => store.selectedItemType);
  const selectedItem = useSelector(store => store.selectedItem);
  const selectedOptions = useSelector(store => store.selectedOptions);
  const selectedBread = useSelector(store => store.selectedBread);
  const options = useSelector(store => store.options);
  const breadTypes = useSelector(store => store.breadTypes);

  const dispatch = useDispatch();

  // state data used only in this component
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const updateNotes = (event) => {
    setNotes(event.target.value)
  }

  // only display items from the selected category
  let displayItems = []
  items.forEach(item => {
    if(item.type === selectedItemType) displayItems.push(item)
  })

  // adds pressed Item as selected Item in store, thereby displaying Options etc
  const selectItemCallback = (item) => {
    batch(() => {
      dispatch(selectItem(item))
      dispatch(selectBread(-1)) // reset bread and options
      dispatch(resetOptions())
    })
    setError("")
  }

  // adds a cart entry to our cart
  // cart entry contains item, any option, bread, price and notes
  const addItem = () => {
    if(selectedItem === -1){
      setError("You must select an item")
      setTimeout(() => { setError("")}, 2000)
      return false;
    }

    // set minimum cart entry
    let cartEntry = {
      item: selectedItem,
      price: selectedItem.price,
    }

    // iterate through options if any are selected, calculating change in price
    if (selectedOptions.length > 0) {
      cartEntry["options"] = selectedOptions;
      options.forEach(option => {
        if(selectedOptions.includes(option.pk)){
          if(option.price_change) cartEntry.price += option.price_change
        }
      })
    }

    // if a bread type was selected, add it to cart entry and update price
    if (selectedBread !== -1){
      cartEntry["bread"] = selectedBread;
      breadTypes.forEach(bread => {
        if(bread.pk === selectedBread){
          if(bread.price_change) cartEntry.price += bread.price_change
        }
      })
    }

    // add notes if necessary
    if(notes) cartEntry["notes"] = notes;

    // adds cart entry and resets item, options, bread
    batch(() => {
      dispatch(addCartEntry(cartEntry))
      dispatch(selectItem(-1))
      dispatch(resetOptions())
      dispatch(selectBread(-1))
    })
  }

  return(
    <div style={styles.centerBar}>
      <div style={styles.flexOne}>
        <div style={styles.centerBarItems}>
        {
          displayItems.map((item, index) => <BtnMaker
            key={index}
            index={index}
            obj={item}
            callback={() => selectItemCallback(item)}
            type="centerBar"
            selected={item.pk === selectedItem.pk}
            />
          )
        }
        { displayItems.length > 0 &&
          <hr style={styles.hr} /> }
        </div>

          <div style={styles.errorText}>{error}</div>
      </div>

      <div style={styles.flexOne}>
      {
        /* Displaying Options */
        selectedItem.options &&
        (selectedItem.options.length > 0 &&

            <div style={styles.centerBarItems}>
              <DisplayItemOptions type="options" array={selectedItem.options} />
            </div>

        ) }
        </div>

        <div style={styles.flexOne}>
        {
          /* Displaying Bread Types */
          selectedItem.bread_type &&
          (
            selectedItem.bread_type.length > 0 &&

              <div style={styles.centerBarItems}>
                <DisplayItemOptions type="bread" array={selectedItem.bread_type} />
              </div>

          )}
        </div>

        <div style={styles.bottomCenterBar}>
          <div style={styles.flexColumn}>
            <div className="form-group" style={styles.flexStart}>
              <textarea className="form-control" rows="2" value={notes} onChange={updateNotes}></textarea>
            </div>
            <div style={{...styles.centerBarItems, ...styles.flexEnd}}>
              <BtnMaker
                obj={{name: "Add Item"}}
                index={1}
                callback={() => addItem()}
                type="btnBottomBlue"
                selected={false}
                />
              <BtnMaker
                obj={{name: "Remove Last Item"}}
                index={1}
                type="btnBottomRed"
                callback={() => dispatch(removeLastItem())}
                selected={false}
                />
            </div>
          </div>
        </div>
    </div>
  )
}

export default CenterBar
