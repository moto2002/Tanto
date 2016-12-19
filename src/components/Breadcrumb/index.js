/* @flow */

import React from 'react'
import { Link } from 'react-router'
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap'
import _ from 'lodash'

export type Props = {
  items: Array<any>,
  style: Object,
}

export const Breadcrumb = (props: Props) => {
  const { items, style } = props
  return (
    <div>
      {items && items.length > 0 &&
        <BootstrapBreadcrumb style={style}>
          {items.map(item => (
            <BootstrapBreadcrumb.Item active key={_.uniqueId('breadcrumb_item')}>
              <Link to={item.link}>{item.label}</Link>
            </BootstrapBreadcrumb.Item>
          ))}
        </BootstrapBreadcrumb>
      }
    </div>
  )
}

export default Breadcrumb
