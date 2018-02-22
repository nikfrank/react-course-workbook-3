import React, { Component } from 'react';

export default class ShoppingList extends Component {
  render(){
    const {
      addShoppingItem,
      shoppingList,
      setListItem,
      setListQuantity,
      removeShoppingItem,
    } = this.props;
    
    return (
      <div className='shopping-list form-field'>
        <button onClick={addShoppingItem} className='add'>+</button>
        <ul>
          {
            shoppingList.map( ({ item, quantity }, sli)=> (
              <li key={sli}>
                <label htmlFor={`${sli}-sli-item`}>item</label>
                <input id={`${sli}-sli-item`}
                       value={item}
                       onChange={setListItem}/>

                <label htmlFor={`${sli}-sli-quantity`}>quantity</label>
                <input id={`${sli}-sli-quantity`}
                       value={quantity}
                       type='number'
                       min={0}
                       onChange={setListQuantity}/>

                <button value={sli}
                        onClick={removeShoppingItem}
                        className='remove'>
                  X
                </button>
              </li>
            ) )
          }
        </ul>
      </div>
    );
  }
};
