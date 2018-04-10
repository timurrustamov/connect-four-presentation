import * as React from 'react';
import * as Radium from 'radium';

class Premonition extends React.Component<{ src?: string }> {
  render() {
    return (
      <div
        style={{
          overflow: 'hidden',
          animation: 'x 25s linear forwards',
          display: 'flex'
        }}
      >
        <img
          alt="[Here once was an image of Premonition]"
          src={this.props.src}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    );
  }
}

export default Radium(Premonition);
