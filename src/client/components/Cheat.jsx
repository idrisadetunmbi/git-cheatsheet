import React, { Component } from 'react';
import CopyText from 'react-copy-to-clipboard';

export default class Cheat extends Component {
  state = {
    displayToast: false,
  }

  toggleToast = () => {
    this.setState({ displayToast: true }, () => {
      setTimeout(() => this.setState({ displayToast: false }), 1000);
    });
  }

  render() {
    const { cheat } = this.props;
    const { displayToast } = this.state;
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <span>{cheat.description}</span>
        <span style={{ display: `${displayToast ? 'inline' : 'none'}` }} className="cheat-copied">
          Copied!
        </span>
        <span className="cheat-command">
          $&nbsp;
          <CopyText text={cheat.command} onCopy={this.toggleToast}>
            <span style={{ cursor: 'pointer' }}>{cheat.command}</span>
          </CopyText>
        </span>
      </div>
    );
  }
}
