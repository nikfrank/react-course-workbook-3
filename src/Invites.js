import React, { Component } from 'react';

export default class Invites extends Component {
  state = { newInvite: '' }

  setNewInvite = ({ target: { value } })=> this.setState({ newInvite: value })
  
  addInvite = ()=>
    this.props.invites.find(({ to })=> to === this.state.newInvite) || (
      this.setState(state => ({ newInvite: '' }) ),
      this.props.onChange(
        this.props.invites.concat({ to: this.state.newInvite, status: '' })
      )
    )

  rsvp = ({ target: { value, id } })=> {
    const index = parseInt(id, 10);
    
    this.props.onChange(
      this.props.invites.map( (invite, ii)=>
        (index !== ii) ? invite : ({
          ...invite, status: value,
        })
      )
    )
  }
  
  render(){
    const { invites } = this.props;
    const { newInvite } = this.state;
    
    return (
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
    );
  }
};
