import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { changeTeam } from './actions/team-actions';
import TeamContainer from './TeamContainer';

class TeamSelector extends Component {
  constructor(props) {
    super(props);
    this.getTeamInfo = this.getTeamInfo.bind(this);
    this.changeTeam = this.changeTeam.bind(this);
    this.renderTeams = this.renderTeams.bind(this);
  }

  getTeamInfo(teamName) {
    const { allTeams } = this.props;
    return allTeams.filter(t => t.name === teamName)[0];
  }

  changeTeam(teamName) {
    const { dispatch, isTeamOne } = this.props;
    dispatch(changeTeam(teamName, isTeamOne));
  }

  renderTeams() {
    const { allTeams, isTeamOne, selectedTeams } = this.props;
    // filter out other team selected
    const otherTeamName = isTeamOne ? selectedTeams.teamTwo.name : selectedTeams.teamOne.name;
    return allTeams
      .filter(t => otherTeamName !== t.name)
      .map(t => (
        <MenuItem
          key={t.name}
          value={t.name}
          onTouchTap={() => this.changeTeam(t.name)}
          primaryText={t.name}
        />
      ));
  }

  render() {
    const { isTeamOne, selectedTeams } = this.props;
    const teamName = isTeamOne ? selectedTeams.teamOne.name : selectedTeams.teamTwo.name;
    const { teamOne, teamTwo } = selectedTeams;
    if (isTeamOne) {
      return (
        <div className="team-selector">
          <div className="col no-pad s2">
            <Menu>
              {this.renderTeams()}
            </Menu>
          </div>
          <div className="col no-pad s4">
            {teamName ? <TeamContainer {...teamOne} isTeamOne /> : <h4>Select a team from the left</h4>}
          </div>
        </div>
      );
    }
    return (
      <div className="team-selector">
        <div className="col no-pad s4">
          {teamName ? <TeamContainer {...teamTwo} /> : <h4>Select a team from the right</h4>}
        </div>
        <div className="col no-pad s2">
          <Menu>
            {this.renderTeams()}
          </Menu>
        </div>
      </div>
    );
  }
}

const PlayerPropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
};

TeamSelector.propTypes = {
  allTeams: PropTypes.arrayOf(PlayerPropType).isRequired,
  isTeamOne: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ selectedTeams: state.teams });

export default connect(mapStateToProps)(TeamSelector);
