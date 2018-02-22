import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currentTab: 0,
    tabs: ['Promo', 'Shopping', 'Invites'],

    name: '',
    imgSrc: '',
    eventType: '',

    shoppingList: [],

    invites: [],
  }

  setTab = ({ target: { value } })=> this.setState({ currentTab: value })

  setName = ({ target: { value } })=> this.setState({ name: value })
  setImgSrc = ({ target: { value } })=> this.setState({ imgSrc: value })
  setEventType = ({ target: { value } })=> this.setState({ eventType: value })

  addShoppingItem = ()=>
    this.setState(state => ({
      shoppingList: state.shoppingList.concat({ item: '', quantity: 0 })
    }) )

  removeShoppingItem = ({ target: { value } })=>
    this.setState(state => ({
      shoppingList: state.shoppingList.slice(0, value*1)
                         .concat( state.shoppingList.slice( value*1 +1 ) )
    }) )
  
  setListItem = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.setState(state => ({
      shoppingList: state.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, item: value}
      )
    }) )
  }

  setListQuantity = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.setState(state => ({
      shoppingList: state.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, quantity: value}
      )
    }) )
  }

  addInvite = ()=>
    this.setState(state => ({
      invites: state.invites.concat({ to: '', status: 'no rsvp' })
    }) )
  
  render() {
    const {
      tabs=[], currentTab=0,
      name, imgSrc, eventType,
      shoppingList=[],
      invites=[],
    } = this.state;
    
    return (
      <div className='Event'>
        <ul className='tabs-selector'>
          {
            tabs.map( (tab, ti)=> (
              <li key={ti} value={ti}
                  onClick={this.setTab}
                  className={(currentTab === ti) ? 'active':''}>
                {tab}
              </li>
            ) )
          }
        </ul>
        {
          (currentTab === 0) ? (
            <div className='promo-tab'>
              <label htmlFor='name'>Name</label>
              <input id='name' value={name} onChange={this.setName}/>

              <label htmlFor='imgSrc'>Picture url</label>
              <input id='imgSrc' value={imgSrc} onChange={this.setImgSrc}/>

              <label htmlFor='eventType'>Event Type</label>
              <input id='eventType' value={eventType} onChange={this.setEventType}/>
            </div>
            
          ) : (currentTab === 1) ? (
            <div className='shopping-list'>
              <button onClick={this.addShoppingItem}>+</button>
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
                             onChange={this.setListQuantity}/>

                      <button value={sli} onClick={this.removeShoppingItem}>X</button>
                    </li>
                  ) )
                }
              </ul>
            </div>
            
          ) : (currentTab === 2) ? (
            <div className='invitations'>
              <ul>
                {
                  invites.map( ({ to, status }, ii)=> (
                    <li key={ii}>
                      <input/>
                      <select/>
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default App;
