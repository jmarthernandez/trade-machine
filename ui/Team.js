import React from 'react';
import PropTypes from 'prop-types';
import { includes, dollarify, totalSalary } from './utils';

const Player = ({ id, name, salary, position, selectedPlayers, onSelectPlayer }) => (
  <li
    key={id}
    className={`collection-item ${includes(selectedPlayers, id) && 'active'}`}
    onTouchTap={() => onSelectPlayer(id)}
  >
    <span>{position}</span>
    <span>{name}</span>
    <span>{dollarify(salary)}</span>
  </li>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  onSelectPlayer: PropTypes.func.isRequired,
  selectedPlayers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const renderPlayers = (players, selectedPlayers, fn) => (
  players.map(p => (
    <Player
      key={p.id}
      {...p}
      selectedPlayers={selectedPlayers}
      onSelectPlayer={fn}
    />
  ))
);

const Team = ({ name, players, selectedSalary, selectedPlayers, onSelectPlayer }) => (
  <div>
    <h3 className="selected-team-header">{name}</h3>
    <p className="selected-team-header">Total Salary: {dollarify(totalSalary(players))}</p>
    <p className="selected-team-header">Selected Salary: {dollarify(selectedSalary)}</p>
    <ul className="collection">
      {players && renderPlayers(players, selectedPlayers, onSelectPlayer)}
    </ul>
  </div>
);

Team.propTypes = {
  name: PropTypes.string.isRequired,
  selectedSalary: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectPlayer: PropTypes.func.isRequired,
  selectedPlayers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Team;
