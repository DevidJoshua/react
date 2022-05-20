import React from 'react'
import { connect } from 'react-redux'
import TeamMemberComp from '../components/TeamMemberComp'

export default connect((state, ownProps) => ({ teamMember: (state.dashboard.FetchData.payload || {}).team_member }), null)((props) => {
  return <TeamMemberComp {...props} />
})
