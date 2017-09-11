import React from 'react'

import style from './style.scss'

export default class TemplateModule extends React.Component {

  render() {
    return <PollResults />
  }
}

class PollResults extends React.Component {
  render () {
    return (
      <div>
        <PollResult hashtag='#music' />
        <PollResult hashtag='#favoriteplayer' />
      </div>
    )
  }
}

class PollResult extends React.Component {
    render () {
        return (
            <div>
                <h4>{this.props.hashtag}</h4>
                <ul>
                    <PollOption id='1' count='43'/>
                    <PollOption id='2' count='12'/>
                    <PollOption id='3' count='10'/>
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
                <div id="option{this.props.id}value">{this.props.count}</div>
            </li>
        )
    }
}
