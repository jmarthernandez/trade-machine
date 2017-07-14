import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

const enoughSelected = ({ teamOne, teamTwo }) => (
  !teamOne.selectedPlayers.length || !teamTwo.selectedPlayers.length
);

const salariesDontMatch = ({ teamOne, teamTwo }) => {
  const aboveLowerBound = teamTwo.selectedSalary >= teamOne.selectedSalary * 0.5;
  const belowUpperBound = teamTwo.selectedSalary <= teamOne.selectedSalary * 1.5;
  return !aboveLowerBound || !belowUpperBound;
};

const validate = teams => enoughSelected(teams) || salariesDontMatch(teams);

const playerStrings = (players, ids) => players.filter(p => ids.includes(p.id)).map(p => p.name).join(', ');

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    const { teams } = this.props;
    return (
      <div>
        <RaisedButton
          label="Trade"
          primary
          disabled={validate(teams)}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Trade Details"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>
            {`${teams.teamOne.name} receives ${playerStrings(teams.teamOne.players, teams.teamOne.selectedPlayers)}`}
          </p>
          <p>
            {`${teams.teamTwo.name} receives ${playerStrings(teams.teamTwo.players, teams.teamTwo.selectedPlayers)}`}
          </p>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({ teams: state.teams });

export default connect(mapStateToProps)(Alert);
