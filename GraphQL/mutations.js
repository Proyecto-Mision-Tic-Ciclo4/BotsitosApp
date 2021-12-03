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
    },
    crearProyecto: async (root,{input})=>{
        const defaults = {
            estado:'Inactivo',
            fase: ''
        }
        const newProyect = Object.assign(defaults,input)
        let db
        let proyecto
        try {
            db = await conexionDB()
            proyecto = await db.collection("proyectos").insertOne(newProyect)
            newProyect._id=proyecto.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return newProyect
    },
    editarProyecto: async (root,{_id,input}) =>{
        let db
        let usuario
        try {
            db = await conexionDB()
            await db.collection('proyectos').updateOne({_id:ObjectId(_id)}, {$set:input})
            usuario = await db.collection('proyectos').findOne({_id:ObjectId(_id)})
        } catch (error) {
            errorHandler(error)
        }
        return usuario
    },
}