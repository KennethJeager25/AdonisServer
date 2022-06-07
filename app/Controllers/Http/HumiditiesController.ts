import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Humidity from 'App/Models/Humidity';
import Database from '@ioc:Adonis/Lucid/Database';

export default class HumiditiesController {

    async InsertarHumedad({response}){

        var x;


            await Database.rawQuery("DELETE FROM humidities")
            await axios.get('https://thingspeak.com/channels/935349/field/2.json')
            .then((r) => {
                 x = r.data.feeds
            }).catch((m)=>{
                response.badRequest({message:"no existen registros"})
            });
            Humidity.createMany(x)
            response.ok({message:"Registrados correctamente",data:x})
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
