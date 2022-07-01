const express = require("express")
const app = express();
const rp = require("request-promise-native")
const diff = require("dialogflow-fulfillment")
const fetch = require("cross-fetch")

app.post("/", express.json(), function (request, response) {
    dialogflow(request, response)
})
async function test() {
    const url = "https://sheetdb.io/api/v1/79dv9wya64dka/"
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    const response = await fetch(url)
    const data = await response.json()
    let l = [];
    let c = 0;
    const n = Object.keys(data).length;
    console.log(n)
    for (let i = 0; i < n; i++) {
        let t = data[i].Manager;
        if (l.includes(t)) {
            continue;
        }
        else {
            c++;
            l.push(t);
        }
    }
    console.log(c)
    return c;
}
const dialogflow = (request, response) => {
    const agent = new diff.WebhookClient({ request, response })

    async function enqbot(agent) {
        try {
            const name = request.body.queryResult.parameters.Name
            const details = request.body.queryResult.parameters.details
            const ohr = request.body.queryResult.parameters.ohr
            const prac = request.body.queryResult.parameters.practice
            const man = request.body.queryResult.parameters.manager
            const sick = request.body.queryResult.parameters.sick
            const casual = request.body.queryResult.parameters.casual
            const location = request.body.queryResult.parameters.location
            const food = request.body.queryResult.parameters.food
            const total = request.body.queryResult.parameters.total
            const five = request.body.queryResult.parameters.five
            const f1 = await request.body.queryResult.parameters.f1
            const tman = request.body.queryResult.parameters.tman
            if (f1) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?PRACTICE=" + f1
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url);
                const data = await response.json();
                const count = Object.keys(data).length;
                let c = count.toString()
                agent.add("Total number of interns in " + f1 + " team: " + c)
            }
            if (tman && man) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/"
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                let l = [];
                let c = 0;
                const n = Object.keys(data).length;
                for (let i = 0; i < n; i++) {
                    let t = data[i].Manager;
                    if (l.includes(t)) {
                        continue;
                    }
                    else {
                        c++;
                        l.push(t);
                    }
                }
                let r = c.toString()
                agent.add("Total number of unique managers: "+r)
            }
            if (tman && prac) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/"
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                let l = [];
                let c = 0;
                const n = Object.keys(data).length;
                for (let i = 0; i < n; i++) {
                    let t = data[i].PRACTICE;
                    if (l.includes(t)) {
                        continue;
                    }
                    else {
                        c++;
                        l.push(t);
                    }
                }
                let r = c.toString()
                agent.add("Total number of unique practices: "+r)
            }

            if (ohr && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const ohrSheet = data[0].OHR
                agent.add("OHR id : " + ohrSheet)
            }


            else if (prac && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const pracSheet = data[0].PRACTICE
                agent.add("Practice is " + pracSheet)
            }
            else if (man && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const manSheet = data[0].Manager
                agent.add("Reporting manager is " + manSheet)
            }
            else if (sick && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const sickSheet = data[0].Sick
                agent.add("Sick leaves : " + sickSheet)
            }
            else if (location && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const locSheet = data[0].Location
                agent.add("Location is " + locSheet)
            }
            else if (casual && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const casualSheet = data[0].Casual
                agent.add("Casual leaves : " + casualSheet)
            }
            else if (food && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const foodSheet = data[0].Food
                agent.add("The favourite food is " + foodSheet)
            }

            else if (total) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/count"
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const tot = data['rows']
                agent.add("Total number of employees/interns is " + tot)
            }
            else if (five) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?sno=<=5"
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                let fiv = data[0].Name + ", " + data[1].Name + ", " + data[2].Name + ", " + data[3].Name + ", " + data[4].Name
                agent.add("Top five employees are: " + fiv)
            }

            else if (details && name) {
                const url = "https://sheetdb.io/api/v1/79dv9wya64dka/search?Name=" + name
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                const response = await fetch(url)
                const data = await response.json()
                const det = "OHR Id: " + data[0].OHR + ", Manager: " + data[0].Manager + ", Practice: " + data[0].PRACTICE
                agent.add("Details of " + name + ": " + det)
            }

        }
        catch {
            agent.add("Sorry, could you give the correct name?")
        }

    }

    let intentMap = new Map()
    intentMap.set("Enqbot", enqbot)
    agent.handleRequest(intentMap)
}


app.listen(5000, function () {
    console.log("we are live");
})
