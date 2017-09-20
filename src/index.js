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
    let polls = [
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
    router.get('/results', (req, res) => {
      res.send({
        polls
      })
    })

    const config = await configurator.loadAll()
    // Do fancy stuff here :)

  }
}
