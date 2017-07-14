const CHANGE_TEAM = 'CHANGE_TEAM';
const SELECT_PLAYER = 'SELECT_PLAYER';


const changeTeam = (name, isTeamOne) => ({
  type: CHANGE_TEAM,
  name,
  isTeamOne,
});

const selectPlayer = (id, isTeamOne) => ({
  type: SELECT_PLAYER,
  id,
  isTeamOne,
});

export { CHANGE_TEAM, SELECT_PLAYER, changeTeam, selectPlayer };
