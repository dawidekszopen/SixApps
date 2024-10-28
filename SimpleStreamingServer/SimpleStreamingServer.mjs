import http from 'http'
import fs from 'fs'
import path from 'path'

http.createServer((req,res)=>{

    const myURL = new URL(req.url, `http://${req.headers.host}`)

    const file = myURL.searchParams.get("file") 

    if(file){
        
        fs.readFile(path.join('./', file), (err, data) =>{
            if(err){
                res.end('niestety plik nie istnieje')
            }
            else{
                res.end(data)
            }
        })
    
    }
}).listen(3000)

console.log("Server nasłuchuje na porcie 3000")

