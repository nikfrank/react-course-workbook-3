import React, { Component } from 'react';

export default class Promo extends Component {
  render(){
    const {
      setEventType, setName, setImgSrc,
      eventType, name, imgSrc, imgSrcValid,
    } = this.props;

    return (
      <div className='promo-tab form-field'>
        <label htmlFor='name'>Name</label>
        <input id='name' value={name} onChange={setName}/>

        <label htmlFor='imgSrc'>Picture url</label>
        <input id='imgSrc' value={imgSrc} onChange={setImgSrc}/>

        <label htmlFor='eventType'>Event Type</label>
        <input id='eventType' value={eventType} onChange={setEventType}/>

        {imgSrcValid && (<img src={imgSrc} alt='event'/>)}
      </div>
    );
  }
};
