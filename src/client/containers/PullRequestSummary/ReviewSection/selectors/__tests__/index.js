import chai from 'chai'
import {
  getPullRequestReviews,
} from '../index'

const expect = chai.expect

describe('PullRequestSummary/ReviewSection selectors', () => {
  it('getPullRequestReviews, full data', () => {
    const user1 = 'user1'
    const user2 = 'user2'
    const users = {
      1: user1,
      2: user2,
    }
    const review1 = {
      status: 'ChangesetStatus.UNDER_REVIEW',
      user: 1,
    }
    const review2 = {
      status: 'ChangesetStatus.APPROVED',
      user: 2,
    }
    const expectedData = [
      { ...review1, user: user1 },
      { ...review2, user: user2 },
    ]
    const pullRequests = {
      12: {
        reviews: [review1, review2],
        otherParameter: 'otherParameter',
      },
    }
    const state = {
      entities: {
        pullRequests, users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPullRequestReviews(state, props)).to.deep.eql(expectedData)
  })
  it('getPullRequestReviews, no users in state', () => {
    const review1 = {
      status: 'ChangesetStatus.UNDER_REVIEW',
      user: 1,
    }
    const review2 = {
      status: 'ChangesetStatus.APPROVED',
      user: 2,
    }
    const expectedData = [
      { ...review1, user: null },
      { ...review2, user: null },
    ]
    const pullRequests = {
      12: {
        reviews: [review1, review2],
        otherParameter: 'otherParameter',
      },
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPullRequestReviews(state, props)).to.deep.eql(expectedData)
  })
  it('getPullRequestReviews, no pr in state', () => {
    const user1 = 'user1'
    const user2 = 'user2'
    const users = {
      1: user1,
      2: user2,
    }

    const state = {
      entities: {
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPullRequestReviews(state, props)).to.deep.eql(null)
  })
  it('getPullRequestReviews, no pr (no prid in props)', () => {
    const user1 = 'user1'
    const user2 = 'user2'
    const users = {
      1: user1,
      2: user2,
    }
    const review1 = {
      status: 'ChangesetStatus.UNDER_REVIEW',
      user: 1,
    }
    const review2 = {
      status: 'ChangesetStatus.APPROVED',
      user: 2,
    }

    const pullRequests = {
      12: {
        reviews: [review1, review2],
        otherParameter: 'otherParameter',
      },
    }
    const state = {
      entities: {
        pullRequests, users,
      },
    }
    const props = {
      params: {},
    }
    expect(getPullRequestReviews(state, props)).to.deep.eql(null)
  })
})
