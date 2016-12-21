/* @flow */

/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import { connect } from 'react-redux'
import { actions } from 'ducks/pullrequests'
import { pullRequestsAssigned } from 'ducks/session/selectors'
import { isAssignedFetching, assignedError } from 'ducks/pullrequests/selectors'

import PullRequestList from 'components/PullRequestList'
import Toolbar from '../Toolbar'

export type Props = {
  dispatch: Function,
  activePage: number,
  pageSize: number,
  isFetching: boolean,
  total: number,
  error: Object,
  items: Array<any>,
}

class AssignedPullRequestList extends Component {
  componentDidMount() {
    this.props.dispatch(
        actions.fetchUserAssignedPullRequests(this.props.activePage, this.props.pageSize))
  }

  handlePageSelect = (page) => {
    this.props.dispatch(actions.fetchUserAssignedPullRequests(page, this.props.pageSize))
  }

  props: Props

  render() {
    return (
      <div>
        <Toolbar />
        {this.props.isFetching && <LinearProgress />}
        {this.props.error && <ErrorMessage error={this.props.error} />}
        <PullRequestList onPageSelect={this.handlePageSelect} {...this.props} />
      </div>
    )
  }
}

export default connect(
  state => ({
    pageSize: 3,
    activePage: state.session.pullRequestsAssigned.currentPage,
    total: state.session.pullRequestsAssigned.total,
    isFetching: isAssignedFetching(state),
    error: assignedError(state),
    items: pullRequestsAssigned(state) || [],
  })
)(AssignedPullRequestList)
