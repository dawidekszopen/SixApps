import readLine from 'readline'
import fs from 'fs'
import { promises as fsPromises } from 'fs'

const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(question){
    return new Promise(resolve => {
        r1.question(question, answer=>{
            resolve(answer)
        })
    })
}

async function main() {
    try {
        const imie = await askQuestion("Jak masz na imie?\n")
        const nazwisko = await askQuestion("Jak masz na nazwisko?\n")
        const lat = await askQuestion("Ile masz lat?\n")

        const user = {
            name: imie,
            lastName: nazwisko,
            age: lat
        }

        let json = JSON.stringify(user)

        fs.writeFile('user.json', json, (err) =>{
            if(err){
                console.error(err)
            }
        })

        console.log("---------")

        fs.readFile('user.json', 'utf-8', (err, data) =>{
            if(err){
                console.error(err)
            }
            console.log(data)
        })

    } catch (error) {
        console.error(error)
    }
    finally{
        r1.close()
    }
}

main()