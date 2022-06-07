import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    public async login({response, request, auth}:HttpContextContract){

        const email = await request.input('email')
        const password = await request.input('password')
        try{
            const token = await auth.attempt(email, password)
            response.ok({message: "login correcto", token:token})
        }
        catch(error){
            response.unauthorized({message: "credenciales invalidas"})
        }
    }
    

    public async registrar({request,response,auth}:HttpContextContract){

        try{
           const password = request.input('password')
           const data = request.all()

           const user = await User.create(data)

           const token = await auth.attempt(user.email,password)

           response.ok({message:"Registro Correcto", token:token})
        }
        catch(error){
            response.badRequest({message:"El usuario ya existe"})
        }
    }


    public async logout({auth,response}:HttpContextContract){
        try{
            await auth.use('api').revoke()
            response.ok({message:"deslogueo correctamente"})
        }
        catch{
            response.internalServerError({message:"ocurrio un error"})
        }
    }



    public async userDato({response, auth}:HttpContextContract){
        try{
            response.ok({message:"datos del usuario encontrados",data:auth.user})
        }
        catch(error){
            response.badRequest({message:"El usuario no existe o token caducado"})
        }
    }

    public async index({ response }: HttpContextContract) {
        try{
          const user = await User.all()
    
          response.ok({message: "Consulta Correcta", data: user})
        }
        catch(error)
        {
          response.badRequest("Ocurrio algo malo, checalo")
        }
    }

}