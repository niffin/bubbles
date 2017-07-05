import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const propTypes = {
  x            : PropTypes.number,
  y            : PropTypes.number,
  r            : PropTypes.number,
  fill         : PropTypes.string,
  border       : PropTypes.string,
  isFiltered   : PropTypes.bool,
  onMouseEnter : PropTypes.func,
  onMouseLeave : PropTypes.func,
  onClick      : PropTypes.func
};

class Bubble extends Component {
  render () {
    const {
      x,
      y,
      r = 0,
      fill,
      border,
      isFiltered,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      onClick      = () => {}
    } = this.props,
      isHover = Radium.getState(this.state, 'bubble', ':hover');

    return (
      <circle
        key          = "bubble"
        transform    = { `translate( ${ x } ${ y } )` }
        r            = { isHover ? r * 4 : r * 3 }
        fill         = { fill   }
        stroke       = { border }
        opacity      = { isFiltered ? .1 : 1 }
        style        = {{ ...styles.bubble, pointerEvents : isFiltered ? 'none' : 'auto' }}
        onMouseEnter = { onMouseEnter  }
        onMouseLeave = { onMouseLeave  }
        onClick      = { onClick       }
      />
    );
  }
}

const styles = {
  bubble : {
    cursor     : 'pointer',
    transition : 'all .4s',
    ':hover' : { }
  }
};

Bubble.propTypes = propTypes;

export default Radium(Bubble);
