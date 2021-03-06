/* @flow */
import React from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { IssueStatus, IssueStatusText } from 'universal/constants'
import { pureComponent } from 'components/PureComponent'

import './IssueMenu.css'

const getStatusClass = (status?: string) => {
  switch (status) {
    case IssueStatus.FIX_LATER:
      return '#cccc74'
    case IssueStatus.FIX_NEXT_PR:
      return '#f49936'
    case IssueStatus.FIX_NOW:
      return '#F44336'
    default:
      return 'rgba(87, 89, 90, 0.69)'
  }
}

const IssueIcon = ({ color }) => (
  <i className={'fa fa-bug action-icon'} style={{ color }} />
)

type Props = {
  issueStatus?: string,
  onStatusSelect: (issue: string) => void,
}

export const IssueMenu = ({ issueStatus, onStatusSelect }: Props) => (
  <Dropdown id="dropdown-create-issue" pullRight>
    <Dropdown.Toggle className="action-button" noCaret>
      <IssueIcon color={getStatusClass(issueStatus)} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <MenuItem eventKey="1" onClick={e => onStatusSelect(IssueStatus.FIX_NOW)}>
        <span><IssueIcon color={getStatusClass(IssueStatus.FIX_NOW)} /> {IssueStatusText.FIX_NOW}</span>
      </MenuItem>
      <MenuItem eventKey="2" onClick={e => onStatusSelect(IssueStatus.FIX_NEXT_PR)}>
        <span><IssueIcon color={getStatusClass(IssueStatus.FIX_NEXT_PR)} /> {IssueStatusText.FIX_NEXT_PR}</span>
      </MenuItem>
      <MenuItem eventKey="3" onClick={e => onStatusSelect(IssueStatus.FIX_LATER)}>
        <span><IssueIcon color={getStatusClass(IssueStatus.FIX_LATER)} /> {IssueStatusText.FIX_LATER}</span>
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4" onClick={e => onStatusSelect(IssueStatus.NONE)}>
        <span>Revert</span>
      </MenuItem>
    </Dropdown.Menu>
  </Dropdown>
)

export default pureComponent(IssueMenu)
