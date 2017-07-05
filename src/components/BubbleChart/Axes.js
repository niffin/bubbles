import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

const propTypes = {
  height  : PropTypes.number,
  width   : PropTypes.number,
  padding : PropTypes.number,
  xLabel  : PropTypes.string,
  yLable  : PropTypes.string,
  xScale  : PropTypes.func,
  yScale  : PropTypes.func
};

class Axes extends Component {
  componentDidMount () {
    this.renderAxis();
  }

  componentDidUpdate () {
    this.renderAxis();
  }

  renderAxis () {
    const { xScale, yScale } = this.props,
          XNode              = this.refs.XAxis,
          YNode              = this.refs.YAxis;
    const x = axisBottom(xScale),
          y = axisLeft(yScale);
    select(XNode).call(x);
    select(YNode).call(y);
  }

  render () {
    const { padding, height, xLabel = '', yLabel = '' } = this.props;
    return (
      <g className="axes">
        <g>
          <g
            className = "axis"
            ref       = "YAxis"
            transform = { `translate(${ padding }, 0)` }
          />
          <text
            transform = "rotate(-90)"
            y         = { 0 }
            x         = { -( height - padding ) }
            dy        = "1em"
            fontSize  = { 12 }
          >{ yLabel.toUpperCase() }</text>
        </g>

        <g>
          <g
            className = "axis"
            ref       = "XAxis"
            transform = { `translate(0, ${ height - padding })` }
          />
          <text
            y         = { height - 5 }
            transform = { `translate(${ padding }, 0)`}
            fontSize  = { 12 }
          >{ xLabel.toUpperCase() }</text>
        </g>
      </g>
    );
  }
}

Axes.propTypes = propTypes;

export default Axes;
