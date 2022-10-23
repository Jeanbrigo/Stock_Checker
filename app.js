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


    // get the date of the last weeks reporting.

    const lastWeekInput = new Date(lastInput); // get the date of the report one week from last one
    let lastWeek = lastWeekInput.setDate(lastWeekInput.getDate() - 7);
    lastWeek = new Date(lastWeek).toISOString().slice(0, 10);

    const last2WeekInput = new Date(lastInput); // get the date of the report one week from last one
    let last2Week = last2WeekInput.setDate(last2WeekInput.getDate() - 14);
    last2Week = new Date(last2Week).toISOString().slice(0, 10);

    const last3WeekInput = new Date(lastInput); // get the date of the report one week from last one
    let last3Week = last3WeekInput.setDate(last3WeekInput.getDate() - 21);
    last3Week = new Date(last3Week).toISOString().slice(0, 10);

    const last4WeekInput = new Date(lastInput); // get the date of the report one week from last one
    let last4Week = last4WeekInput.setDate(last4WeekInput.getDate() - 28);
    last4Week = new Date(last4Week).toISOString().slice(0, 10);

    // console.log(lastWeek)
    // console.log(last2Week)
    // console.log(last3Week)
    // console.log(last4Week)

    // Price returns (Last price, Last week price, last 2 week price...)

    const lastPrice = parseFloat(stock["Time Series (Daily)"][lastInput]["4. close"]);
    console.log(lastPrice);

    const lastWeekPrice = parseFloat(stock["Time Series (Daily)"][lastWeek]["4. close"]);
    console.log(lastWeekPrice);

    const last2WeekPrice = parseFloat(stock["Time Series (Daily)"][last2Week]["4. close"]);
    console.log(last2WeekPrice);

    const last3WeekPrice = parseFloat(stock["Time Series (Daily)"][last3Week]["4. close"]);
    console.log(last3WeekPrice);

    const last4WeekPrice = parseFloat(stock["Time Series (Daily)"][last4Week]["4. close"]);
    console.log(last4WeekPrice);


    // average price for the last month trender
    const trendMonthPrice = (lastWeekPrice + last2WeekPrice + last3WeekPrice + last4WeekPrice) / 4

    console.log(trendMonthPrice)

    // console.log(stock["Weekly Time Series"][lastWeek]["4.close"])

    //console.log(stock)
    //console.log(stock["Time Series (Daily)"][lastInput]["4. close"])

    const $main = $("main")
        $main.empty()
        $main.html(`
        <h1>${stock["Meta Data"]["2. Symbol"]}</h1>
        <h2>Current price: $${lastPrice}</h2>
        `)
        if(trendMonthPrice < lastPrice){ 
            const $main = $("main")
                //$main.empty()
                $main.append(`
                <h2>Trending <span style="color: green">Upwards</span></h2>
                `)}
        else if(trendMonthPrice > lastPrice) { 
            const $main = $("main")
                $main.append(`
                <h2>Trending <span style="color: red">Downwards</span></h2>
                `)}
        else{
            const $main = $("main")
                $main.append(`<h2>Trending Same as Previous</h2>`)
            }   

})
}


// Trend tool

// function stockTrender(stock){
//     // constructing url for request
//     const url = `${baseURL3}&symbol=${stock}&apikey=${apikey}`

//     const request = $.ajax(url)

//     request.then((stock) => {

//     const lastInput = stock["Meta Data"]["3. Last Refreshed"] // Get the date of the most current report

//     console.log(lastInput)

//     // get the date of the last week reporting.

//     const lastWeekInput = new Date(lastInput);
//     let lastWeek = lastWeekInput.setDate(lastWeekInput.getDate() - 7);
//     lastWeek = new Date(lastWeek).toISOString().slice(0, 10);

//     console.log(lastWeek)

//     console.log(stock["Weekly Time Series"][lastWeek]["4. close"])

//     console.log(stock)
//     console.log(stock["Weekly Time Series"][lastInput]["4. close"])

//     // trend function 
//     if(stock["Weekly Time Series"][lastInput]["4. close"] > stock["Weekly Time Series"][lastWeek]["4. close"]){ 
//     const $main = $("main")
//         //$main.empty()
//         $main.append(`
//         <h2>Trending Upwards</h2>
//         `)}
//     else if(stock["Weekly Time Series"][lastInput]["4. close"] < stock["Weekly Time Series"][lastWeek]["4. close"]) { 
//         const $main = $("main")
//             $main.append(`
//             <h2>Trending Downwards</h2>
//             `)}
//      else{
//         const $main = $("main")
//             $main.append(`<h2>Trending Same as Previous</h2>`)
//      }   

// })
// }



// Submission operators

$("input[type=submit]").on("click", (event) => {

    //prevent the refresh
    event.preventDefault()

    // grab text from input box
    const inputText = $("input[type=text]").val()

    // update the screen
    stockChecker(inputText)
   // stockTrender(inputText)
})
