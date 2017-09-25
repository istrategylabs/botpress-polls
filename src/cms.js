const P = require('bluebird')
const redis = require('redis')
P.promisifyAll(redis.RedisClient.prototype)
P.promisifyAll(redis.Multi.prototype)

async function getContent (bp, category) {
  // get content from cache. hit db if no cache data available
  let client = redis.createClient(process.env.REDIS_URL)
  let rkey = `content-${category}`

  let content = await client.getAsync(rkey)
  if (content) {
    client.quit()
    return JSON.parse(content)
  } else {
    content = await bp.contentManager.listCategoryItems(category)
    await client.setAsync(rkey, JSON.stringify(content), 'EX', 60 * 5)
    client.quit()
    return content
  }
}

module.exports = {
  getContent
}
