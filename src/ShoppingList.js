import React, { Component } from 'react';

export default class ShoppingList extends Component {
  addShoppingItem = ()=>
    this.props.onChange(
      this.props.shoppingList.concat({ item: '', quantity: 0 }) )

  removeShoppingItem = ({ target: { value } })=>
    this.props.onChange(
      this.props.shoppingList.slice(0, value*1)
          .concat( this.props.shoppingList.slice( value*1 +1 ) ) )
  
  setListItem = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.props.onChange(
      this.props.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, item: value}
      )
    )
  }

  setListQuantity = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.props.onChange(
      this.props.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, quantity: value}
      )
    )
  }
  
  render(){
    const { shoppingList } = this.props;
    
    return (
      <div className='shopping-list form-field'>
        <button onClick={this.addShoppingItem} className='add'>+</button>
        <ul>
          {
            shoppingList.map( ({ item, quantity }, sli)=> (
              <li key={sli}>
                <label htmlFor={`${sli}-sli-item`}>item</label>
                <input id={`${sli}-sli-item`}
                       value={item}
                       onChange={this.setListItem}/>

                <label htmlFor={`${sli}-sli-quantity`}>quantity</label>
                <input id={`${sli}-sli-quantity`}
                       value={quantity}
                       type='number'
                       min={0}
                       onChange={this.setListQuantity}/>

                <button value={sli}
                        onClick={this.removeShoppingItem}
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
