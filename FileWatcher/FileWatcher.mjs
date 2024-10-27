import fs from 'fs'
import EventEmitter from 'events'
import path from 'path'

const MyEvents = new EventEmitter()

function addingLog(text){
    fs.appendFile('./log.txt', `${text}\n`, (err) =>{
        if(err){
            console.error(err)
        }
    })
}

MyEvents.on('addFile', (filename) =>{
    addingLog(`- utworzono plik ${filename}`)
})

MyEvents.on('changeFile', (filename) =>{
    addingLog(`- plik ${filename}, został zmodyfikowany`)
})

MyEvents.on('deleteFile', (filename) =>{
    addingLog(`- plik ${filename}, został usunięty`)
})

fs.watch('./', (eventType, fileName) =>{
    if(fileName && fileName != 'log.txt'){  
        //zmiana jest wywoływana 2 razy
        if(eventType == "change"){
            MyEvents.emit('changeFile', fileName)
        }
        else{
            if(fs.existsSync(path.join('./', fileName))){
                MyEvents.emit('addFile', fileName)
            }
            else{
                MyEvents.emit('deleteFile', fileName)
            }
        }
    }
})

