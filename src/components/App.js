import R from 'ramda';
import React, { Component } from 'react';
import './App.css';
import BubbleChart from './BubbleChart';
import { randomNumber } from '../utils'

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      datasetAmount   : 5,
      itemsPerDataset : 7,
      bubbleChartData : []
    }

    this.generateBubbleChartData = this.generateBubbleChartData.bind(this);
  }

  componentDidMount () {
    this.generateBubbleChartData();
  }

  generateBubbleChartData () {
    const { datasetAmount, itemsPerDataset } = this.state,
          data = R.times(generateDataset(itemsPerDataset), datasetAmount);

    this.setState({
      bubbleChartData : data
    })
  }

  render () {
    return (
      <div style={{ position : 'relative' }}>
        <button
          style   = {{ position : 'absolute', top : 10, left : 10, zIndex : 2 }}
          onClick = { this.generateBubbleChartData }>
          Randomize data
        </button>
        <BubbleChart
          datasets = { this.state.bubbleChartData }
        />
      </div>
    );
  }
}

function generateBubble (index) {
  return {
    x : randomNumber(),
    y : randomNumber(),
    r : randomNumber({ min : 1, max : 7 }),
    metadata : {
      label : 'Bubble ' + (index + 1),
    }
  }
}

function generateDataset (numberOfItems) {
  return index => ({
    label : 'Dataset ' + (index + 1),
    data  : R.times(generateBubble, numberOfItems)
  })
}

export default App;
