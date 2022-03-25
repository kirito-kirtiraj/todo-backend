import { Todo } from '../../models'
import { TodoRepository } from '../../repositories'
import { testdb } from '../datasources/testdb.datasource'

export async function givenEmptyDatabase() {
  await new TodoRepository(testdb).deleteAll()
}

export function givenProductData(data?: Partial<Todo>) {
  return Object.assign(
    {
      title: 'Task example',
      desc: 'Task example description',
      isComplete: false,
    },
    data,
  )
}

export async function givenProduct(data?: Partial<Todo>) {
  return new TodoRepository(testdb).create(givenProductData(data))
}
