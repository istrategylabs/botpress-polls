const moment = require('moment-timezone')
const redis = require('redis')

const cms = require('./cms.js')

/*
  Botpress module template. This is your module's entry point.
  Please have a look at the docs for more information about config, init and ready.
  https://botpress.io/docs
*/

module.exports = {

  config: { },

  init: async function(bp, configurator) {
    // This is called before ready.
    // At this point your module is just being initialized, it is not loaded yet.
  },

  ready: async function(bp, configurator) {
    // Your module's been loaded by Botpress.
    // Serve your APIs here, execute logic, etc.

    var router = bp.getRouter('botpress-polls', { auth: false })

    // Will be exposed at: http://localhost:3000/api/botpress-polls/results

    async function getPolls() {
      let client = redis.createClient(process.env.REDIS_URL)
      let todaysDate = moment.tz(new Date(), 'America/New_York')
      let pollList = []

      let items = await cms.getContent(bp, 'polls')
      for (let i = 0; i < items.length; i++) {
        let poll = {
          hashtag: items[i].data.code,
          options: []
        }
        for (let j = 0; j < 3; j++) {
          let count = await client.getAsync(`count:${items[i].data.code}-${todaysDate.format('YYYYMMDD')}:${j + 1}`) || 0
          poll.options.push({ name: items[i]['data'][`option${j + 1}`], count: count })
        }
        pollList.push(poll)
      }
      client.quit()
      return pollList
    }

    router.get('/results', (req, res) => {
      getPolls().then((pollList) => {
        res.send({
          polls: pollList,
        })
      })
    })

    const config = await configurator.loadAll()
    // Do fancy stuff here :)

  }
}
