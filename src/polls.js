const moment = require('moment')
const redis = require('redis')


// PROMISE: allPolls
//   Get all active polls (and results?) from redis
//   then loop through them and create objects
//   then get info about polls from db and add to objects
//   then add them to poll objects and return list of polls


/*
function itemsToPolls(items) {
  return new Promise((resolve, reject) => {
    // converts items returned into poll objects
    return [1, 2, 3]
  })
}

function addResults(items) {
  return new Promise((resolve, reject) => {
    // adds results from redis to poll objects
    return [3, 2, 1]
  })
}


function allPolls(bp) {
  var pollList = []
  return bp.contentManager.listCategoryItems('polls').then(itemsToPolls).then(addResults)
}*/







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
  allPolls,
  //getCount,
  //getPolls,
}
