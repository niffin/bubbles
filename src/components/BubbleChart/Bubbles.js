import React from 'react';
import Bubble from './Bubble';

function Bubbles ({
  filteredBy    = '',
  scales        = {},
  datasets      = [],
  colors        = [],
  onBubbleHover = () => {},
  onBubbleClick = () => {}
}) {
  return (
    <g>
      {
        datasets.map((dataset = {}, i) => (
          dataset.data.map((d, j) => (
            <Bubble
              key          = { i + '.' + j   }
              x            = { scales.x(d.x) }
              y            = { scales.y(d.y) }
              r            = { d.r * 2 }
              fill         = { colors[i % colors.length ].backgroundColor }
              border       = { colors[i % colors.length ].borderColor     }
              isFiltered   = { !!filteredBy && filteredBy !== dataset.label }
              onMouseEnter = { onBubbleHover(
                d.metadata.label,
                d,
                {
                  top  : scales.y(d.y),
                  left : scales.x(d.x)
                }
              )}
              onMouseLeave = { onBubbleHover() }
            />
          ))
        ))
      }
    </g>
  );
}

export default Bubbles;
