import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Temperatura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public entry_id: number

  @column()
  public field1: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
