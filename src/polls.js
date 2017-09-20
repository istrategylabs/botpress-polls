const moment = require('moment')
const redis = require('redis')


// get items from db
// then loop through them and create pollItems
// then update the poll item options counts
// then return the list

// getPolls.then()


function getPolls(bp) {
  var pollList = []
  bp.contentManager.listCategoryItems('polls').then((items) => {
    for (let i = 0; i < items.length; i++) {
      let pollItem = {
        code:  items[i].data.code,
        question: items[i].data.pollQuestion,
        options: [
          {name: items[i].data.option1, count: 0},
          {name: items[i].data.option2, count: 0},
          {name: items[i].data.option3, count: 0}
        ]
      }

      //get vote count
      let pollID = `${pollItem.code.toLowerCase()}-${moment().format('YYYYMMDD')}`
      getCount(bp, pollID, (res) => {
        //update options counts
        for (let j = 0; j < 3; j++) {
          if (res[j]) {
            pollItem.options[j].count = Number(res[j])
          }
        }
        pollList.push(pollItem)
      })
    }
    return pollList
  })
}

function getCount (bp, pollID, callback) {
  // returns count of all votes for a poll
  let client = redis.createClient(bp.botfile.redis.connection)
  let multi = client.multi()

  for (let i = 0; i < 3; i++) {
    multi.get(`count:${pollID}:${i + 1}`)
  }

  multi.exec((err, reply) => {
    if (err) {
      console.log(err)
    }
    client.quit()
    callback(reply)
  })
}

module.exports = {
  getCount,
  getPolls,
}
