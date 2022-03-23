import { Entity, model, property } from '@loopback/repository'

@model()
export class Example extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string

  @property({
    type: 'array',
    itemType: 'string',
  })
  associatedTodos?: string[]

  constructor(data?: Partial<Example>) {
    super(data)
  }
}

export interface ExampleRelations {
  // describe navigational properties here
}

export type ExampleWithRelations = Example & ExampleRelations
