import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currentTab: 0,
    tabs: ['Promo', 'Shopping', 'Invites'],

    name: '',
    imgSrc: '',
    eventType: '',
  }

  setTab = ({ target: { value } })=> this.setState({ currentTab: value })

  setName = ({ target: { value } })=> this.setState({ name: value })
  setImgSrc = ({ target: { value } })=> this.setState({ imgSrc: value })
  setEventType = ({ target: { value } })=> this.setState({ eventType: value })
  
  render() {
    const {
      tabs=[], currentTab=0,
      name, imgSrc, eventType,
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
