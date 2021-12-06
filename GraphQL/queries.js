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
    },
    getEstudianteProyecto: async (root, { codigo }) => {

        let db
        let Info_Estudiantes = []
        
        try {
            db = await conexionDB()
            const consulta = [
                {'$lookup' : {
                      'from' : 'estudiantes',
                      'localField' : 'info_usuario_codigo',
                      'foreignField' : 'estudiantes_info_usuario_codigo',
                      'as' : 'estudiantes'
                  }
                },
                {'$match':{'estudiantes.estudiante_proyectos.estudiante_proyectos_codigo': {'$in': [codigo]}}},
                {'$unwind': "$estudiantes"},
                { "$project": { "info_usuario_codigo": 1,
                                "info_usuario_email": 1,
                                "info_usuario_nombre": 1,
                                "estudiantes": {
                                    "estudiantes_codigo": 1,
                                    "estudiantes_info_usuario_codigo": 1,
                                    "estudiante_proyectos": {
                                        '$filter':{
                                            'input': '$estudiantes.estudiante_proyectos',
                                            'as': 'proyectos',
                                            'cond': { '$eq': ['$$proyectos.estudiante_proyectos_codigo', codigo] }
                                        }}
                                },
                                "_id": 0
                              }}
            ]

            Info_Estudiantes = await db.collection('info_usuario').aggregate(consulta).toArray();

        } catch (error) {
            errorHandler(error)
        }

        return Info_Estudiantes
    },
}