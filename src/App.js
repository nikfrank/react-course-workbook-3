import React, { Component } from 'react';
import './App.css';

import Promo from './Promo';
import ShoppingList from './ShoppingList';
import Invites from './Invites';

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

  setName = value=> this.setState({ name: value })
  setImgSrc = value=> this.setState({ imgSrc: value })
  setEventType = value=> this.setState({ eventType: value })

  onChangeShoppingList = shoppingList => this.setState({ shoppingList })
  
  onChangeInvites = invites => this.setState({ invites })
  
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
            <Promo setName={this.setName}
                   name={name}
                   setImgSrc={this.setImgSrc}
                   imgSrc={imgSrc}
                   setEventType={this.setEventType}
                   eventType={eventType}/>
            
          ) : (currentTab === 1) ? (
            <ShoppingList shoppingList={shoppingList}
                          onChange={this.onChangeShoppingList}/>
          ) : (currentTab === 2) ? (
            <Invites invites={invites}
                     onChange={this.onChangeInvites}/>
          ) : null
        }
      </div>
    );
  }
}

export default App;
