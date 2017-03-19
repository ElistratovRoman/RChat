import React from 'react';
import cn from 'classnames'

import './icon.sass'


export default class Icon extends React.Component {
  render() {
    let { className, icon, size, ...rest } = this.props

    let cns = cn(
      'ico',
      size ? `ico--${size}` : 'ico--m',
      className
    )

    return (
      <i className={cns} {...rest}>
        <svg className="ico-svg">
          <use xlinkHref={require(`assets/icons/${icon}.svg`)} />
        </svg>
      </i>
    )
  }
}
