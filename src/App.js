import React, { Component } from 'react';
import './App.css';

const imageUrlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

class App extends Component {
  state = {
    currentTab: 0,
    tabs: ['Promo', 'Shopping', 'Invites'],

    name: '',
    imgSrc: '',
    imgSrcValid: false,
    eventType: '',

    shoppingList: [],

    invites: [],
    newInvite: '',
  }

  setTab = ({ target: { value } })=> this.setState({ currentTab: value })

  setName = ({ target: { value } })=> this.setState({ name: value })
  setImgSrc = ({ target: { value } })=> this.setState({
    imgSrc: value,
    imgSrcValid: imageUrlRegex.exec(value)
  })
  
  setEventType = ({ target: { value } })=> this.setState({ eventType: value })

  addShoppingItem = ()=>
    this.setState(state => ({
      shoppingList: state.shoppingList.concat({ item: '', quantity: 0 }),
    }) )

  removeShoppingItem = ({ target: { value } })=>
    this.setState(state => ({
      shoppingList: state.shoppingList.slice(0, value*1)
                         .concat( state.shoppingList.slice( value*1 +1 ) ),
    }) )
  
  setListItem = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.setState(state => ({
      shoppingList: state.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, item: value}
      ),
    }) );
  }

  setListQuantity = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.setState(state => ({
      shoppingList: state.shoppingList.map( (listItem, sli)=>
        (sli !== index) ? listItem : {...listItem, quantity: value}
      ),
    }) );
  }

  setNewInvite = ({ target: { value } })=> this.setState({ newInvite: value })
  
  addInvite = ()=>
    this.state.invites.find(({ to })=> to === this.state.newInvite) || (
      this.setState(state => ({
        invites: state.invites.concat({ to: state.newInvite, status: '' }),
        newInvite: '',
      }) ) )

  rsvp = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.setState(state => ({
      invites: state.invites.map( (invite, ii)=>
        (index !== ii) ? invite : ({
          ...invite, status: value,
        }) ),
    }) );
  }
  
  render() {
    const {
      tabs=[], currentTab=0,
      name, imgSrc, imgSrcValid, eventType,
      shoppingList=[],
      invites=[], newInvite='',
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
            <div className='promo-tab form-field'>
              <label htmlFor='name'>Name</label>
              <input id='name' value={name} onChange={this.setName}/>

              <label htmlFor='imgSrc'>Picture url</label>
              <input id='imgSrc' value={imgSrc} onChange={this.setImgSrc}/>

              <label htmlFor='eventType'>Event Type</label>
              <input id='eventType' value={eventType} onChange={this.setEventType}/>

              {imgSrcValid && (<img src={imgSrc} alt='event'/>)}
            </div>
            
          ) : (currentTab === 1) ? (
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
            
          ) : (currentTab === 2) ? (
            <div className='invitations form-field'>
              <label htmlFor='new-invite'>New invite - To</label>
              <input value={newInvite} onChange={this.setNewInvite} id='new-invite'/>
              <button onClick={this.addInvite}
                      disabled={!newInvite}
                      className='add'>
                +
              </button>
              
              <ul>
                {
                  invites.map( ({ to, status }, ii)=> (
                    <li key={ii}>
                      To: {to}
                      <select value={status} id={`${ii}-rsvp`}
                              onChange={this.rsvp}>
                        <option value=''>No RSVP</option>
                        <option value='confirmed'>Confirmed</option>
                        <option value='Maybe'>Maybe</option>
                      </select>
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
