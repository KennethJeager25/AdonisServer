/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login','AuthController.login')
Route.post('registro','AuthController.registrar')


Route.group(()=>{
Route.post('insertInfo','TemperaturasController.InsertAllDataSensor')
Route.get('showInfo','TemperaturasController.MostrarInfo')
Route.delete('deleteInfo','TemperaturasController.EliminarTodo')
}).prefix('temp');


Route.group(()=>{
  Route.get('insertInfo','HumiditiesController.InsertarHumedad')
  Route.get('showInfo','HumiditiesController.MostrarInfo')
  Route.delete('deleteInfo','HumiditiesController.EliminarTodo')
}).prefix('hum');
  


Route.get('showData','TemperaturasController.ShowTemperatura')

Route.get('showfield1','TemperaturasController.Showparametros')