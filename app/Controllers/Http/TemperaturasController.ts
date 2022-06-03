import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Temperatura from 'App/Models/Temperatura'
import Database from '@ioc:Adonis/Lucid/Database';
/* import { Request } from '@adonisjs/core/build/standalone';
 var  axios =require('axios') */

export default class TemperaturasController {


    async InsertAllDataSensor({response}) {

            var x,w;

            w = await Temperatura.all()
    
            await Database.rawQuery("DELETE FROM temperaturas")
            await axios.get('https://thingspeak.com/channels/935349/field/1.json')
                .then((r) => {
                    x = r.data.feeds
                    Temperatura.createMany(x)
            }).catch((m)=>{
                Temperatura.createMany(w)
            });
            response.ok({message:"Registrados correctamente"})
    }

    async MostrarInfo({response}:HttpContextContract){

        try{
            const temp = await Temperatura.all()
            response.ok({message:"datos",data:temp})
        }
        catch(error){
            response.badRequest({message:"error al mostrar"})
        }
    }
    
    async EliminarTodo({response}:HttpContextContract){

        try{
            await Database.rawQuery("DELETE FROM Temperaturas")
            response.ok({message:"Eliminado correctamente"})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }
    }

    async ShowTemperatura({response}) {

        var x
        await axios.get('https://thingspeak.com/channels/935349/field/1.json')
            .then((r) => {
                x = r.data.feeds
        });
        response.ok({message:"Todos los datos",data:x})
}

}
