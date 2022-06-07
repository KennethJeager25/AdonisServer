import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Humidity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public entry_id: number

  @column()
  public field2: string

  @column()
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
