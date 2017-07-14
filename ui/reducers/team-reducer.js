import allTeams from '../data';
import { CHANGE_TEAM, SELECT_PLAYER } from '../actions/team-actions';
import { includes, remove, salaryOfSelected } from './../utils';

const initialState = {
  teamOne: {
    name: null,
    players: [],
    selectedSalary: 0,
    selectedPlayers: [],
  },
  teamTwo: {
    name: null,
    players: [],
    selectedSalary: 0,
    selectedPlayers: [],
  },
  validTrade: true,
};

const changeTeam = (name, isTeamOne, state) => {
  const players = allTeams.filter(t => t.name === name)[0].players;
  if (isTeamOne) {
    return {
      ...state,
      teamOne: {
        name,
        players,
        selectedSalary: 0,
        selectedPlayers: [],
      },
    };
  }
  return {
    ...state,
    teamTwo: {
      name,
      players,
      selectedSalary: 0,
      selectedPlayers: [],
    },
  };
};


// more reuse needed
const selectPlayer = (id, isTeamOne, state) => {
  if (isTeamOne) {
    if (includes(state.teamOne.selectedPlayers, id)) {
      return {
        ...state,
        teamOne: {
          ...state.teamOne,
          selectedSalary: salaryOfSelected(state.teamOne.players, remove(state.teamOne.selectedPlayers, id)),
          selectedPlayers: remove(state.teamOne.selectedPlayers, id),
        },
      };
    }
    return {
      ...state,
      teamOne: {
        ...state.teamOne,
        selectedSalary: salaryOfSelected(state.teamOne.players, state.teamOne.selectedPlayers.concat(id)),
        selectedPlayers: state.teamOne.selectedPlayers.concat(id),
      },
    };
  }

  if (includes(state.teamTwo.selectedPlayers, id)) {
    return {
      ...state,
      teamTwo: {
        ...state.teamTwo,
        selectedSalary: salaryOfSelected(state.teamTwo.players, remove(state.teamTwo.selectedPlayers, id)),
        selectedPlayers: remove(state.teamTwo.selectedPlayers, id),
      },
    };
  }
  return {
    ...state,
    teamTwo: {
      ...state.teamTwo,
      selectedSalary: salaryOfSelected(state.teamTwo.players, state.teamTwo.selectedPlayers.concat(id)),
      selectedPlayers: state.teamTwo.selectedPlayers.concat(id),
    },
  };
};

const teams = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEAM: {
      const { name, isTeamOne } = action;
      return changeTeam(name, isTeamOne, state);
    }
    case SELECT_PLAYER: {
      const { id, isTeamOne } = action;
      return selectPlayer(id, isTeamOne, state);
    }
    default:
      return state;
  }
};

export default teams;
