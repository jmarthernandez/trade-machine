import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Team from './Team';
import { selectPlayer } from './actions/team-actions';

class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.onSelectPlayer = this.onSelectPlayer.bind(this);
  }

  onSelectPlayer(id) {
    const { dispatch, isTeamOne } = this.props;
    dispatch(selectPlayer(id, isTeamOne));
  }

  render() {
    return (
      <Team
        {...this.props}
        onSelectPlayer={this.onSelectPlayer}
      />
    );
  }
}

TeamContainer.propTypes = {
  isTeamOne: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

TeamContainer.defaultProps = {
  isTeamOne: false,
};

const mapStateToProps = state => ({ selected: state.teams });

export default connect(mapStateToProps)(TeamContainer);
