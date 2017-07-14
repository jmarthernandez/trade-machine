import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Player = ({ p }) => <h1>{p}</h1>;

Player.propTypes = {
  p: PropTypes.number.isRequired,
};

export default class PlayerContainer extends Component {
  renderPlayers() {
    return this.props.players.map(p => <Player key={p} p={p} />);
  }
  render() {
    return (
      <div>
        {this.renderPlayers()}
      </div>
    );
  }
}

PlayerContainer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.number).isRequired,
};
