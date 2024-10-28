import fs from 'fs'
import path from 'path'
import EventEmitter from 'events'

const MyEvents = new EventEmitter()

MyEvents.on('startAnalyzing', (pathDir)=>{
    console.log("zaczęto analize.....")
    analyzFile(pathDir)
})


MyEvents.on('endAnalyzing', ()=>{
    console.log("skończono analize")
})


async function analyzFile(pathDir) {
    fs.readdir(pathDir, (err, files) =>{
        if(err){
            return console.error(err)
        }

        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            fs.stat(path.join(pathDir, file), (err, stats) =>{
                if(err){
                    console.error(err)         
                }
    
                let rozszerzenie = file.split('.')
    
                if(stats.isDirectory()){
                    console.log(`----------
Informacje o folderze ${file}:
- rozmiar ${stats.size}
- data ostatniej modyfikacji: ${stats.mtime}`)
                               
                }
                else{
                    console.log(`----------
Informacje o pliku ${file}:
- rozmiar ${stats.size}
- rozszerzenie ${rozszerzenie[rozszerzenie.length - 1]}
- data ostatniej modyfikacji: ${stats.mtime}`)
                            
                }
            })            
        }
        MyEvents.emit('endAnalyzing')
    })
    
}

MyEvents.emit('startAnalyzing', './')