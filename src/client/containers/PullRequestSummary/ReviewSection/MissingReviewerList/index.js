/* @flow */

import React from 'react'
import type {
  PullRequestMissingReviewerType,
    UserType,
} from 'universal/types'

import { CONFLUENCE_REVIEW_PAGE } from 'universal/constants'
import './MissingReviewerList.css'

export type MissingReviewerListType = {
  missingReviewers: PullRequestMissingReviewerType,
  addReviewer: Function,
  id: string,
}

// TODO: copied from ReviewSection - should probably be abstracted out somewhere
const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px', marginTop: '1em' }}>
    {text}
  </div>
)

const areaHeader = text => (
  <div style={{ fontWeight: 'bold' }}>{text}</div>
)

const reviewerItem = (props: MissingReviewerListType, reviewer: UserType) => {
  const clickFunction = () => props.addReviewer(props.id, reviewer)
  return (<a className="missing-reviewer" onClick={clickFunction}>
    {reviewer.fullName || reviewer.username}
  </a>)
}

const MissingReviewers = (props: MissingReviewerListType) => {
  const missing = props.missingReviewers.filter(r => r.reviewers && r.reviewers.length)

  if (!missing.length) {
    return null
  }
  return (
    <div>
      <div>
        <div>{subHeader('Potential additional reviewers:')}</div>
        {missing.map(missingReviewer =>
          <div key={missingReviewer.area}>
            {areaHeader(missingReviewer.area)}
            {missingReviewer.reviewers.map(reviewer => reviewerItem(props, reviewer))}
          </div>
        )}
      </div>
    </div>
  )
}

const UnclaimedAreas = (props: MissingReviewerListType) => {
  const unclaimed = props.missingReviewers.filter(r => !r.reviewers || !r.reviewers.length)
  const reviewPage = CONFLUENCE_REVIEW_PAGE
  if (!unclaimed.length) {
    return null
  }
  return (
    <div>
      <div key="unclaimed">
        {subHeader('One or more areas are unclaimed')}
        Please update <a href={reviewPage}>Code Reviews</a> to claim/assign ownership of uncovered areas:
          {unclaimed.map(u => <div key={u.area} className="unclaimed-area">{u.area}</div>)}
      </div>
    </div>
  )
}

const missingReviewerList = (props: MissingReviewerListType) => (
  <div>
    <MissingReviewers {...props} />
    <UnclaimedAreas {...props} />
  </div>
)

export default missingReviewerList
