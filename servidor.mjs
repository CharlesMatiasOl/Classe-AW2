import http from 'node:http'
import path from 'node:path'
import {readFile} from 'node:fs'
import fsp from 'node:fs/promises'

// Configuracion
const PUERTO = 3001
const raizDelSitio = 'recursos'

// Funciones de gestiones de peticiones
const getionarIndex = (respuesta)=>{
    const ruta = path.join(raizDelSitio,'index.html')
    readFile(ruta,(error, datos)=>{
        if(error){
            console.log(error)
            respuesta.statusCode = 500;
            respuesta.end('Hubo un error en el servidor')

        }else{
            respuesta.statusCode = 200;
            respuesta.end(datos)
        }
    })
}

const getionarRecursos = (peticion, respuesta)=>{
    const ruta = path.join(raizDelSitio,peticion.url)
    readFile(ruta,(error, datos)=>{
        if(error){
            console.log(error)
            respuesta.statusCode = 404;
            respuesta.end('recurso no encontrado')
        }else{
            respuesta.statusCode = 200;
            respuesta.end(datos)
        }
    })
}
const servidor = http.createServer((peticion, respuesta)=>{
    if(peticion.method === 'GET'){
        if(peticion.url === '/' || peticion.url === '/index.html'){
            getionarIndex(respuesta)
        }else{
            getionarRecursos(peticion, respuesta);
        }
    }else{
        respuesta.statuscode = 404;
        respuesta.end('Recurso no encontrdo')
    }
    // respuesta.end('Hola AW2')
})

servidor.listen(PUERTO,()=>{
    console.log(`Servidor ejecutandose en http://localhost:${PUERTO}`);
})