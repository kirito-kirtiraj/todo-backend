import { Client, createRestAppClient, expect } from '@loopback/testlab'
import { TodoListBackendApplication } from '../..'
import { testdb } from '../datasources/testdb.datasource'
import { givenEmptyDatabase, givenProduct } from '../helpers/database.helpers'

describe('Product (acceptance)', () => {
  let app: TodoListBackendApplication
  let client: Client

  before(givenEmptyDatabase)
  before(givenRunningApp)
  after(async () => {
    await app.stop()
  })

  it('retrieves product details', async () => {
    // arrange
    const product = await givenProduct({
      title: 'do to do',
      desc: 'doooo tooooo dooooo',
      isComplete: false,
    })
    const expected = Object.assign(product)

    // act
    const response = await client.get('/todos/1')

    // assert
    expect(response.body).to.containEql(expected)
  })

  async function givenRunningApp() {
    app = new TodoListBackendApplication({
      rest: {
        port: 0,
      },
    })
    await app.boot()

    // change to use the test datasource after the app has been booted so that
    // it is not overriden
    app.dataSource(testdb)
    await app.start()

    client = createRestAppClient(app)
  }
})
