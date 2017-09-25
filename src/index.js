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

    // Get all polls from db
    // then loop through them and create objects
    // then get results from redis add to objects
    // then add them to poll objects and return list of polls

    async function getPolls() {
      let pollList = []
      let items = await cms.getContent(bp, 'polls')
      for (let i = 0; i < items.length; i++) {
        let poll = {
          hashtag: items[i].data.code,
          options: []
        }
        for (let j = 0; j < 3; j++) {
          poll.options.push({ name: items[i]['data'][`option${j+1}`], count: 0 })
        }
        pollList.push(poll)
      }
      return pollList
    }

    /*
    let pollList = [
      {
        hashtag: '#music',
        options: [
          {
            name: 'Achy Breaky Heart',
            count: 49
          },
          {
            name: 'Sussudio',
            count: 22
          },
          {
            name: 'Miracles',
            count: 11
          }
        ]
      }
    ]
    */

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
