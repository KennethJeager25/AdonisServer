import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Humidity from 'App/Models/Humidity';
import Database from '@ioc:Adonis/Lucid/Database';

export default class HumiditiesController {

    async InsertarHumedad({response}){

        var x;

        try{
            await Database.rawQuery("DELETE FROM humidities")
            await axios.get('https://thingspeak.com/channels/935349/field/2.json')
            .then((r) => {
                 x = r.data.feeds
                Humidity.createMany(x)
            }).catch((m)=>{
                response.badRequest({message:"no existen registros"})
            });
            response.ok({message:"Registrados correctamente",data:x})
        }
        catch(error){
            response.badRequest({message:"no existen registros"})
        }
    }

    async MostrarInfo({response}:HttpContextContract){

        try{
            const hum = await Humidity.all()
            response.ok({message:"datos",data:hum})
        }
        catch(error){
            response.badRequest({message:"error al mostrar"})
        }
    }
    
    async EliminarTodo({response}:HttpContextContract){

        try{
            await Database.rawQuery("DELETE FROM humidities")
            response.ok({message:"Eliminado correctamente"})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }
    }


}
