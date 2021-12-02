const conexionDB = require('./conexion');
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    getUsuarios: async () => {
        let db
        let usuarios = []
        try {
            db = await conexionDB()
            usuarios = await db.collection('info_usuario').find().toArray()
        } catch (error) {
            errorHandler(error)
        }
        return usuarios
    },
    getUsuario: async (root, { id }) => {
        let db
        let usuario
        try {
            db = await conexionDB()
            usuario = await db.collection('info_usuario').findOne({ _id: ObjectId(id) })
        } catch (error) {
            errorHandler(error)
        }
        return usuario
    }
}
