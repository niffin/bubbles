import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isVisible : PropTypes.bool,
  top       : PropTypes.number,
  left      : PropTypes.number,
  content   : PropTypes.array
};

function Tooltip ({ isVisible, top = 0, left = 0, label, content }) {
  return (
    <div style={{
      ...styles.wrapper,
      top,
      left,
      opacity : isVisible ? 1 : 0
    }}>
      <div style={ styles.label   }>{ label   }</div>
      <div style={ styles.content }>{ content }</div>
    </div>
  );
}

const styles = {
  wrapper : {
    position      : 'absolute',
    pointerEvents : 'none',
    padding       : 10,
    boxShadow     : '1px 1px 1px rgba(0, 0, 0, .1)',
    background    : 'white',
    transition    : 'opacity .3s',
    transform     : 'translate(20px, -50%)',
    textTransform : 'capitalize'
  },
  label : {
    fontSize   : 11,
    fontWeight : 'bold'
  },
  content : {
    fontSize : 13
  }
};

Tooltip.propTypes = propTypes;

export default Tooltip;
