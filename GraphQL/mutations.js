const conexionDB = require('./conexion');
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    crearUsuario: async (root, { input }) => {
        let db
        let usuario
        try {
            db = await conexionDB()
            usuario = await db.collection('info_usuario').insertOne(input)
            input._id = usuario.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return input
    },
    editarUsuario: async (root,{_id,input}) =>{
        let db
        let usuario
        try {
            db = await conexionDB()
            await db.collection('info_usuario').updateOne({_id:ObjectId(_id)}, {$set:input})
            usuario = await db.collection('info_usuario').findOne({_id:ObjectId(_id)})
        } catch (error) {
            errorHandler(error)
        }
        return usuario
    }
}