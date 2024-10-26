import readLine from 'readline'
import fs from 'fs'
import { promises as fsPromises } from 'fs'

// const clearArray = []
// const clerarJSON = JSON.stringify(clearArray)

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

async function addObject(name, age, email) {
    const user = {
        name: name,
        age: age,
        email: email
    }

    fs

    fs.readFile('data.json', 'utf-8', (err, data) =>{
        if(err){
            fs.writeFile('data.json', JSON.stringify([]), (err) =>{
                if(err){
                    console.error(err)
                }
            })

            let json = JSON.stringify([user])

            fs.writeFile('data.json', json, (err) =>{
                if(err){
                    console.error(err)
                }
            })
        }
        else{
            let datas = JSON.parse(data)

            let arr = Array.from(datas)

            arr.push(user)
    
            let json = JSON.stringify(arr)
    
            fs.writeFile('data.json', json, (err) =>{
                if(err){
                    console.error(err)
                }
            })
        }
    })
}

function showObjects(params) {
        fs.readFile('data.json', 'utf-8', (err, data) =>{
            if(err){
                console.error(err)
            }
            let trueData = JSON.parse(data)

            
            console.log('Dane z pliku: ')
            for (let i = 0; i < trueData.length; i++) {
                console.log("---------")
                console.log(`name: ${trueData[i]['name']}\nage: ${trueData[i]['age']}\neamil: ${trueData[i]['email']}`)
            }
        })
}


async function main() {
    try {
        // const imie = await askQuestion("Jak masz na imie?\n")
        // const nazwisko = await askQuestion("Jak masz na nazwisko?\n")
        // const lat = await askQuestion("Ile masz lat?\n")

        // const data = {
        //     name: imie,
        //     lastName: nazwisko,
        //     age: lat
        // }

        // let json = JSON.stringify(data)

        // fs.writeFile('data.json', json, (err) =>{
        //     if(err){
        //         console.error(err)
        //     }
        // })

        // console.log("---------")

        // fs.readFile('data.json', 'utf-8', (err, data) =>{
        //     if(err){
        //         console.error(err)
        //     }
        //     console.log(data)
        // })
        let dzialanie = await askQuestion("Chcesz dodać czy zobaczyć dane?(dodaj/zobacz)\n")

        while (!(dzialanie == "dodaj" || dzialanie == "zobacz")){
            console.log("Upss!! Coś poszło nie tak. Spróbuj jeszcze raz.")
            dzialanie = await askQuestion("Chcesz dodać czy zobzczyć dane?(dodaj/zobzcz)\n")
        }

        switch (dzialanie) {
            case "dodaj":
                const imie = await askQuestion("Podaj imie: ")
                const lat = await askQuestion("Podaj wiek: ")
                const email = await askQuestion("Podaj email: ")

                addObject(imie, lat, email)
                break;
            case "zobacz":
                    showObjects()
                break;
        }
        
    } catch (error) {
        console.error(error)
    }
    finally{
        r1.close()
    }
}

main()