import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Temperatura from 'App/Models/Temperatura'
import Database from '@ioc:Adonis/Lucid/Database';

export default class TemperaturasController {


    async InsertAllDataSensor({response, request}:HttpContextContract) {

        try{ 
            const id_user = request.input('id_user');
            await Database.rawQuery("DELETE FROM temperaturas")
            await axios.get('https://thingspeak.com/channels/935349/field/1.json')
                .then((r) => {
                    const x = r.data.feeds
                    Temperatura.createMany(x,id_user)
            }).catch((m)=>{
                response.badRequest({message:"no existen registros"})
            });
            response.ok({message:"Registrados correctamente"})
        }
        catch(error){
            response.badRequest({message:"no existen registros"})
        }
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

    async Show({response}) {

        var x
        await axios.get('https://thingspeak.com/channels/935349/field/1.json')
            .then((r) => {
                x = r.data.feeds
        });
        response.ok({message:"Todos los datos",data:x})
    }

}
