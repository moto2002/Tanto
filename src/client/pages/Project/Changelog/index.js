// TODO: add flow annotations

import React, { Component } from 'react'
import BranchSelect from 'components/BranchSelect'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import { fetchChangelog } from 'ducks/repositories/actions'
import { getChangelog } from 'ducks/repositories/selectors'
import { fetchUsers } from 'ducks/users'
import ChangesetList from 'components/ChangesetList'
import LoadingComponent from 'components/LoadingComponent'
import CopyToClipboard from 'react-copy-to-clipboard'

export type Props = {
  params: Object,
  data: Array<any>
};

class Changelog extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      height: '100%',
      autoHideDuration: 4000,
      message: 'Hash has been copied to clipboard',
      open: false,
      selectedChanges: 0,
      shouldButtonUpdate: false,
      copied: false,
      copiedValue: '',
    }
    this.handleTouchTap = () => this.setState({ open: true })
    this.handleActionTouchTap = () => this.setState({ open: false })
    this.handleChangeDuration = (event) => {
      const value = event.target.value
      this.setState({
        autoHideDuration: value.length > 0
          ? parseInt(value, 10)
          : 0,
      })
    }
    this.handleRequestClose = () => this.setState({ open: false })
  }

  componentDidMount() {
    if (this.props.params.splat) {
      this
        .props
        .dispatch(fetchChangelog(this.props.params.splat))
      this.props.dispatch(fetchUsers())
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedChanges !== nextState.selectedChanges
  }

  onSelectedChangesetsChange = (e) => {
    this.setState({
      selectedChanges: this.refs.changesetList.state.changesets.length,
      shouldButtonUpdate: true })
    this.setClipboardContent()
  }

  setClipboardContent = () => {
    this.setState({ copiedValue: this.refs.changesetList.state.changesets.join(), copied: false })
  }

  props : Props

  render() {
    const { params: { id }, data } = this.props

    return (
      <div>
        <div style={{ padding: '10px' }}>
          <Row>

            <Col md={4}>
              <BranchSelect project={id} placeholder="Select branch ..." />
            </Col>

            <Col md={8}>
              <CopyToClipboard text={this.state.copiedValue} onCopy={() => this.setState({ copied: true })}>
                <Button
                  ref={'button'}
                  disabled={this.state.selectedChanges === 0}
                  style={{
                    backgroundColor: this.state.selectedChanges === 0 ? 'rgb(162, 162, 171)' : '#1fb5ad',
                    borderColor: this.state.selectedChanges === 0 ? 'rgb(162, 162, 171)' : '#1fb5ad',
                    color: 'white',
                    float: 'right',
                  }}
                >
                    Show changeset
                </Button>
              </CopyToClipboard>
            </Col>
          </Row>
        </div>
        <LoadingComponent status={status}>
          {!status.isFetching && !data && !status.error && <div
            style={{ textAlign: 'center', padding: '10%' }}
          >
            <h4>NO CHANGES</h4>
          </div>
}
          <ChangesetList
            showCheckboxes
            ref={'changesetList'}
            commits={data}
            projectName={this.props.params.splat}
            onSelectedChangesetsChange={this.onSelectedChangesetsChange}
          />
        </LoadingComponent>
      </div>
    )
  }
}

export default connect(getChangelog)(Changelog)
