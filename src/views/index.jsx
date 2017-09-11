import React from 'react'

import style from './style.scss'

export default class TemplateModule extends React.Component {

  render() {
    return <PollResult />
  }
}


class PollResult extends React.Component {
    render () {
        return (
            <div>
                <h4>#hashtag</h4>
                <ul>
                    <PollOption id='1'/>
                    <PollOption id='2'/>
                    <PollOption id='3'/>
                </ul>
            </div>
        )
    }
}

class PollOption extends React.Component {
    render () {
        return (
            <li id="option{this.props.id}">
                <div id="option{this.props.id}name">Name</div>
                <div id="option{this.props.id}value">0</div>
            </li>
        )
    }
}
