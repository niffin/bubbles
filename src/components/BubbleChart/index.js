import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import Legend from './Legend';
import Axes from './Axes';
import Bubbles from './Bubbles';
import Tooltip from './Tooltip';
import colors from './colors';

const propTypes = {
  datasets : PropTypes.arrayOf(PropTypes.shape({
    label : PropTypes.string,
    data  : PropTypes.arrayOf(PropTypes.shape({
      y : PropTypes.number,
      x : PropTypes.number,
      r : PropTypes.number,
      metadata : PropTypes.shape({
        label : PropTypes.string
      })
    }))
  }))
};

class BubbleChart extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isHovering  : false,
      filteredBy  : '',
      chartWidth  : 1400,
      chartHeight : 600,
      hoverCoords : {
        top  : 0,
        left : 0
      },
      hoverData : {
        x : 0,
        y : 0,
        r : 0
      }
    };

    this.resizeChart            = this.resizeChart.bind(this);
    this.applyFilter            = this.applyFilter.bind(this);
    this.toggleBubbleHoverState = this.toggleBubbleHoverState.bind(this);

    window.addEventListener('resize', this.resizeChart);
  }

  render () {
    const {
      datasets      = [],
      onBubbleClick = () => {}
    } = this.props;
    const {
      isHovering,
      hoverCoords,
      hoverData,
      chartWidth,
      chartHeight,
      filteredBy
    } = this.state;
    const dataBoundries = getDataBoundries(datasets);
    const padding       = 45;
    const scales        = {
      x : createScale({
        domain : { min : 0, max : dataBoundries.maxX },
        range  : { min : padding, max : (chartWidth - padding) + 1}
      }),
      y : createScale({
        domain : { min : 0, max : dataBoundries.maxY + 1},
        range  : { min : chartHeight - padding, max : padding }
      })
    };

    return (
      <div
        style = {{
          position : 'relative'
        }}
      >

        <svg
          ref    = { el => this.wrapper = el }
          width  = "100%"
          height = "calc(100vh - 20px)"
          onClick = { () => { this.setState({ filteredBy : '' }); }}
        >
          <Bubbles
            filteredBy    = { filteredBy                  }
            scales        = { scales                      }
            datasets      = { datasets                    }
            colors        = { colors                      }
            onBubbleHover = { this.toggleBubbleHoverState }
            onBubbleClick = { onBubbleClick               }
          />

          <Axes
            height  = { chartHeight }
            width   = { chartWidth  }
            padding = { padding     }
            xScale  = { scales.x    }
            yScale  = { scales.y    }
            xLabel  = ""
            yLabel  = ""
          />
        </svg>

        <div style={{
          position   : 'absolute',
          top        : 0,
          right      : 0,
          padding    : 20,
          background : 'rgba(255, 255, 255, .4)'
        }}>
          <Legend
            filteredBy = { filteredBy                 }
            height     = { chartHeight - 40           }
            colors     = { colors                     }
            labels     = { R.pluck('label', datasets) }
            onClick    = { this.applyFilter           }
          />
        </div>

        <Tooltip
          isVisible = { isHovering       }
          top       = { hoverCoords.top  }
          left      = { hoverCoords.left }
          label     = { hoverData.label  }
          content   = {
            <div>
              <div>{ 'X: ' + hoverData.x.toFixed(2) }</div>
              <div>{ 'Y: ' + hoverData.y.toFixed(2) }</div>
              <div>{ 'R: ' + hoverData.r.toFixed(2) }</div>
            </div>
          }
        />
      </div>
    );
  }

  resizeChart () {
    this.setState({
      chartWidth  : (this.wrapper && this.wrapper.getBoundingClientRect().width)  || this.state.chartWidth,
      chartHeight : (this.wrapper && this.wrapper.getBoundingClientRect().height) || this.state.chartHeight
    });
  }

  componentDidMount () {
    this.resizeChart();
  }

  componentDidUpdate (prevProps, prevState) {
    if (
        (this.wrapper && this.wrapper.getBoundingClientRect().width)  !== prevState.chartWidth ||
        (this.wrapper && this.wrapper.getBoundingClientRect().height) !== prevState.chartHeight
      ) {
      this.resizeChart();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeChart);
  }

  applyFilter (label) {
    this.setState({
      filteredBy : label
    });
  }

  toggleBubbleHoverState (label = '', { x, y, r } = {}, { top, left } = {}) {
    return () => {
      if (top || left) {
        this.setState({
          isHovering  : true,
          hoverCoords : {
            top  : top,
            left : left
          },
          hoverData : {
            label,
            x,
            y,
            r
          }
        });
      } else {
        this.setState({ isHovering : false });
      }
    };
  }
}

const createScale = ({ domain, range }) => scaleLinear()
    .domain([ domain.min, domain.max ])
    .range([ range.min, range.max ]);

function getDataBoundries (datasets) {
  const data = datasets.map(dataset => dataset.data[0]);

  const rs = R.pluck('r', data);
  const xs = R.pluck('x', data);
  const ys = R.pluck('y', data);

  return {
    minX : Math.min(...xs),
    maxX : Math.max(...xs),

    minY : Math.min(...ys),
    maxY : Math.max(...ys),

    maxR : Math.max(...rs)
  };
}

BubbleChart.propTypes = propTypes;

export default BubbleChart;
