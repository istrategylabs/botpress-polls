import React from 'react'

import style from './style.scss'

export default class PollModule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      polls: [],
      loading: true
    }
  }

  getAxios() {
    return this.props.bp.axios
  }

  componentDidMount() {
    // get all poll results
    this.getAxios().get("/api/botpress-polls/results")
      .then((res) => {
        this.setState({
          loading: false,
          polls: res.data.polls
        })
      })
  }

  render () {
    console.log(this.state.polls)
    if (this.state.loading) {
      return null
    }

    var pollsList = this.state.polls.map(function(poll) {
      return <PollResult hashtag={poll.hashtag} options={poll.options} />
    })

    return (
      <div>
        { pollsList }
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
                    <PollOption id='1' name={this.props.options[0].name} count={this.props.options[0].count } />
                    <PollOption id='2' name={this.props.options[1].name} count={this.props.options[1].count } />
                    <PollOption id='3' name={this.props.options[2].name} count={this.props.options[2].count } />
                </ul>
            </div>
        )
    }
}

class PollOption extends React.Component {
    render () {
        return (
            <li id="option{this.props.id}">
                <div id="option{this.props.id}name">{this.props.name}: {this.props.count}</div>
            </li>
        )
    }
}
