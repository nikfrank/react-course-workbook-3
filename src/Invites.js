import React, { Component } from 'react';

export default class Invites extends Component {
  render(){
    const {
      setNewInvite,
      newInvite,
      addInvite,
      rsvp,
      invites,
    } = this.props;
    
    return (
      <div className='invitations form-field'>
        <label htmlFor='new-invite'>New invite - To</label>
        <input value={newInvite} onChange={setNewInvite} id='new-invite'/>
        <button onClick={addInvite}
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
                        onChange={rsvp}>
                  <option value=''>No RSVP</option>
                  <option value='confirmed'>Confirmed</option>
                  <option value='Maybe'>Maybe</option>
                </select>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
};
