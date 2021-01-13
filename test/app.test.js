const assert = require('assert')
const app = require('../app')

describe('Database', () => {
  describe('#fetchAll', () => {
    it('should reject call', async () => {
      const docs = await app.fetchAll() 
      assert.rejects(docs)
      assert.strictEqual(docs, 'permission-denied')
    })
  })

  describe('#insert', () => {
    it('should reject call', async () => {
      const doc = await app.insert('tech@sample.com')
      assert.rejects(doc)
      assert.strictEqual(doc, 'permission-denied')
    })
  })

  describe('#findBy', () => {
    it('should reject call', async () => {
      const docs = await app.findBy('tech@sample.com')
      assert.rejects(docs)
      assert.strictEqual(docs, 'permission-denied')
    })
  })
})

describe('Auth', () => {
  describe('#createUser', () => {
    it('should reject call', async () => {
      const user = await app.createUser('sec@sample.com', 'secret')
      assert.rejects(user)
      assert.strictEqual(user, 'auth/internal-error')
    })
  })
})
