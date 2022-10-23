const apikey = "IJNV4P2J1BEX9AZ5"



'use strict';


var baseURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` // URL for basic price return pull
var baseURL2 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&&outputsize=compact&apikey=${apikey}`; // URL for intraday info
var baseURL3 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${apikey}` // for weekly series, for trending tool purpose.

console.log(baseURL3)

function stockChecker(stock){
    // constructing url for request
    const url = `${baseURL}&symbol=${stock}&apikey=${apikey}`

    




const request = $.ajax(url)

request.then((stock) => {

    const lastInput = stock["Meta Data"]["3. Last Refreshed"] // Get the date of the most current report

   // Get the Date of the last week posting

//     const today = new Date()  // Obtained from https://flaviocopes.com/how-to-get-lastWeek-date-javascript/
// const lastWeek = new Date(today)

//  lastWeek.setDate(lastWeek.getDate()- 7)

// today.toDateString()
// lastWeek.toDateString()

// const lastWeekInput = new Date(lastInput.getDate() - 7).toISOString().slice(0, 10)

// console.log(lastWeekInput)

// console.log(stock["Weekly Time Series"][lastWeekInput]["4.close"])

    console.log(stock)
    console.log(stock["Time Series (Daily)"][lastInput]["4. close"])

    const $main = $("main")
        $main.empty()
        $main.html(`
        <h1>${stock["Meta Data"]["2. Symbol"]}</h1>
        <h2>Current price: ${stock["Time Series (Daily)"][lastInput]["4. close"]}</h2>
        `)


})
}



// Submission operators

$("input[type=submit]").on("click", (event) => {

    //prevent the refresh
    event.preventDefault()

    // grab text from input box
    const inputText = $("input[type=text]").val()

    // update the screen
    stockChecker(inputText)
})


// const today = new Date()  // Obtained from https://flaviocopes.com/how-to-get-lastWeek-date-javascript/
// const lastWeek = new Date(today)

//  lastWeek.setDate(lastWeek.getDate()- 1)

// today.toDateString()
// lastWeek.toDateString()

// const lastInput = lastWeek.toISOString().slice(0, 10)

// console.log(lastInput)