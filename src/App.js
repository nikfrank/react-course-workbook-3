import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currentTab: 0,
    tabs: ['Promo', 'Shopping', 'Invites']
  }

  setTab = ({ target: { value } })=> this.setState({ currentTab: value })
  
  render() {
    const { tabs=[], currentTab=0 } = this.state;
    
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
              
            </div>
          ) : (currentTab === 1) ? (
            <div className='shopping-list'>
              
            </div>
          ) : (currentTab === 2) ? (
            <div className='invitations'>
              
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default App;
