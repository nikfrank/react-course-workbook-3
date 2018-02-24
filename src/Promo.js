import React, { Component } from 'react';

const imageUrlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

export default class Promo extends Component {
  state = { imgSrcValid: imageUrlRegex.exec(this.props.imgSrc) }

  setImgSrc = ({ target: { value } })=> {
    this.setState({ imgSrcValid: imageUrlRegex.exec(value) });
    this.props.setImgSrc( value );
  }
  
  setEventType = ({ target: { value } })=> this.props.setEventType( value )
  setName = ({ target: { value } })=> this.props.setName( value )
  
  render(){
    const { eventType, name, imgSrc } = this.props;
    const { imgSrcValid } = this.state;

    return (
      <div className='promo-tab form-field'>
        <label htmlFor='name'>Name</label>
        <input id='name' value={name} onChange={this.setName}/>

        <label htmlFor='imgSrc'>Picture url</label>
        <input id='imgSrc' value={imgSrc} onChange={this.setImgSrc}/>

        <label htmlFor='eventType'>Event Type</label>
        <input id='eventType' value={eventType} onChange={this.setEventType}/>

        {imgSrcValid && (<img src={imgSrc} alt='event'/>)}
      </div>
    );
  }
};
