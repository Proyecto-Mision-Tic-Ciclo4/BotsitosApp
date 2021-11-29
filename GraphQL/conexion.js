const { MongoClient } = require('mongodb')
const {
  USUARIO_DB,
  CONTRASENA_DB,
  NOMBRE_DB
} = process.env

const atlasURL = `mongodb://${USUARIO_DB}:${CONTRASENA_DB}@cluster0-shard-00-00.1xbzy.mongodb.net:27017,cluster0-shard-00-01.1xbzy.mongodb.net:27017,cluster0-shard-00-02.1xbzy.mongodb.net:27017/${NOMBRE_DB}?ssl=true&replicaSet=atlas-1340iw-shard-0&authSource=admin&retryWrites=true&w=majority`
let conexion

async function conexionDB () {
  if (conexion) return conexion

  try { conexion = await MongoClient.connect(atlasURL, { useNewUrlParser: true })
        console.log('Conexion a la DB exitosa!');
  } catch (error) {
    console.error('No es posible conectarse a la DB', atlasURL, error)
    process.exit(1)
  }

  return conexion
}

module.exports = conexionDB;