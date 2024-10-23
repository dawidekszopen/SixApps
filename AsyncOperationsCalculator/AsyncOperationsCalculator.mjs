import readLine from 'readline'


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

//Walidacja danych

function isOperacjaValid(operacja){
    return operacja == "dodawanie" || operacja == "+" || operacja == "mnożenie" || operacja == "*"
}

function isMetodaValid(metoda){
    return metoda == "callback" || metoda == "c" || metoda == "promises" || metoda == "p"
}

//wyświetlanie wyniku dodawania/mnożenia

function showWynik(wynik){
    console.log(wynik)
}

//funkcje do dodawania

function addingWithCallBack(liczba1, liczba2, callback){
    let sum = liczba1 + liczba2
    callback(`wynik to: ${sum}`)
}

let addingWithPromise = (liczba1, liczba2) => {
    return new Promise((resolve, reject) =>{
        let sum = liczba1 + liczba2

        if(sum != null){
            resolve(`wynik to: ${sum}`)
        }
        else{
            reject("Ups!! Error")
        }
    })
}

//funkcje do mnożenia

function multiplicationWithCallBack(liczba1, liczba2, callback){
    let sum = liczba1 * liczba2
    callback(`wynik to: ${sum}`)
}

let multiplicationWithPromise = (liczba1, liczba2) => {
    return new Promise((resolve, reject) =>{
        let sum = liczba1 * liczba2

        if(sum != null){
            resolve(`wynik to: ${sum}`)
        }
        else{
            reject("Ups!! Error")
        }
    })
}

async function main() {
    try {
        const liczba1String = await askQuestion("Podaj liczbę 1: ")
        const liczba2String = await askQuestion("Podaj liczbę 2: ")


        let operacja = await askQuestion("Jaką operację matematyczną wybierasz? Dodawanie(+) czy mnożenie(*)?\n")
        while (!isOperacjaValid(operacja)){
            console.log("Upss!! Coś poszło nie tak. Wpisałeś złą operację. Spróbuj jeszcze raz.")
            operacja = await askQuestion("Jaką operację matematyczną wybierasz? Dodawanie(+) czy mnożenie(*)?\n")
        }

        let metoda = await askQuestion("Którą metodę chcesz użyć? Callback(c) czy promises(p)?\n")
        while (!isMetodaValid(metoda)){
            console.log("Upss!! Coś poszło nie tak. Wpisałeś złą metodę. Spróbuj jeszcze raz.")
            metoda = await askQuestion("Którą metodę chcesz użyć? Callback(c) czy promises(p)?\n")
        }

        const liczba1 = parseInt(liczba1String)
        const liczba2 = parseInt(liczba2String)

        if (operacja == "dodawanie" || operacja == "+") {
            if (metoda == "callback" || metoda == "c") {
                setTimeout(() => {addingWithCallBack(liczba1, liczba2, showWynik)}, 2000)
            }
            else if(metoda == "promises" || metoda == "p"){
                setTimeout(() => addingWithPromise(liczba1, liczba2).then(
                    function(value) {showWynik(value)},
                    function(error) {showWynik(error)}
                ), 3000)
            }
        }
        else if(operacja == "mnożenie" || operacja == "*") {
            if (metoda == "callback" || metoda == "c") {
                setTimeout(() => {multiplicationWithCallBack(liczba1, liczba2, showWynik)}, 2000)
                
            }
            else if(metoda == "promises" || metoda == "p"){
                setTimeout(() => multiplicationWithPromise(liczba1, liczba2).then(
                    function(value) {showWynik(value)},
                    function(error) {showWynik(error)}
                ), 3000)

            }
        }

    } catch (error) {
        console.error(error)
    }
    finally{
        r1.close()
    }
}

main()