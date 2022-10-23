const apikey = "IJNV4P2J1BEX9AZ5"

'use strict';


var baseURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` // URL for basic price return pull
var baseURL2 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&&outputsize=compact&apikey=${apikey}`; // URL for intraday info
var baseURL3 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY` // for weekly series, for trending tool purpose.


// Stock Price Tool

function stockChecker(stock){
    // constructing url for request
    const url = `${baseURL}&symbol=${stock}&apikey=${apikey}`

    const request = $.ajax(url)

    request.then((stock) => {

    const lastInput = stock["Meta Data"]["3. Last Refreshed"] // Get the date of the most current report

    // console.log(lastInput)


    // get the date of the last week reporting.


    const lastWeekInput = new Date(lastInput); // get the date of the report one week from last one
    let lastWeek = lastWeekInput.setDate(lastWeekInput.getDate() - 7);
    lastWeek = new Date(lastWeek).toISOString().slice(0, 10);

    // console.log(lastWeek)

    // console.log(stock["Weekly Time Series"][lastWeek]["4.close"])

    //console.log(stock)
    //console.log(stock["Time Series (Daily)"][lastInput]["4. close"])

    const $main = $("main")
        $main.empty()
        $main.html(`
        <h1>${stock["Meta Data"]["2. Symbol"]}</h1>
        <h2>Current price: ${stock["Time Series (Daily)"][lastInput]["4. close"]}</h2>
        `)


})
}


// Trend tool

function stockTrender(stock){
    // constructing url for request
    const url = `${baseURL3}&symbol=${stock}&apikey=${apikey}`

    const request = $.ajax(url)

    request.then((stock) => {

    const lastInput = stock["Meta Data"]["3. Last Refreshed"] // Get the date of the most current report

    console.log(lastInput)

    // get the date of the last week reporting.

    const lastWeekInput = new Date(lastInput);
    let lastWeek = lastWeekInput.setDate(lastWeekInput.getDate() - 7);
    lastWeek = new Date(lastWeek).toISOString().slice(0, 10);

    console.log(lastWeek)

    console.log(stock["Weekly Time Series"][lastWeek]["4. close"])

    console.log(stock)
    console.log(stock["Weekly Time Series"][lastInput]["4. close"])


    if(stock["Weekly Time Series"][lastInput]["4. close"] > stock["Weekly Time Series"][lastWeek]["4. close"]){ 
    const $main = $("main")
        //$main.empty()
        $main.append(`
        <h1>Trending Upwards</h1>
        `)}
    else if(stock["Weekly Time Series"][lastInput]["4. close"] < stock["Weekly Time Series"][lastWeek]["4. close"]) { 
        const $main = $("main")
            $main.append(`
            <h1>Trending Downwards</h1>
            `)}
     else{
        const $main = $("main")
            $main.append(`<h1>Trending Same as Previous</h1>`)
     }   

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
    stockTrender(inputText)
})
