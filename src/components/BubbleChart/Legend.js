import React from 'react';

function Legend ({
  labels     = [],
  colors     = [],
  onHover    = () => {},
  onClick    = () => {},
  filteredBy = ''
}) {
  return (
    <div style={ styles.wrapper }>
      {
        labels.map((label, i) => (
          <div
            key     = { i }
            style   = {{
              ...styles.item,
              opacity : !filteredBy ? 1 : getFilteredOpacity(filteredBy, label)
            }}
            onClick = { () => onClick(label)   }
          >

            <div
              style={{
                ...styles.symbol,
                backgroundColor : colors[ i % colors.length ].backgroundColor,
                borderColor     : colors[ i % colors.length ].borderColor
              }}
            />

            <div
              style = {{
                ...styles.label,
                color : colors[ i % colors.length ].borderColor
              }}>{ label }</div>
          </div>
        ))
      }
    </div>
  );
}

function getFilteredOpacity (filteredBy, label) {
  return filteredBy === label ? 1 : .6;
}

const styles = {
  wrapper : {
    fontSize   : 12,
    overflow   : 'scroll',
    whiteSpace : 'pre',
    cursor     : 'pointer'
  },
  item : {
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'space between',
    marginBottom   : 10
  },
  symbol : {
    width        : 10,
    height       : 10,
    borderRadius : '100%',
    marginRight  : 10
  }
};

export default Legend;
