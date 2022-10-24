const apikey = "IJNV4P2J1BEX9AZ5"

// when hover over stock price, gives all stock info for the day
// when hover trending gives price for last 4 weeks, if price was higher show green if lower show red

// 'use strict';

var baseURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` // URL for basic price return pull


// Stock Price Tool

function stockChecker(stock){
    // constructing url for request
    const url = `${baseURL}&symbol=${stock}&apikey=${apikey}`

    const request = $.ajax(url)

    request.then((stock) => {

    const symbol = stock["Meta Data"]["2. Symbol"]

    const lastInput = stock["Meta Data"]["3. Last Refreshed"] // Get the date of the most current report
    // console.log(lastInput)


    // get the date of the last weeks reporting. original code source: http://bluegalaxy.info/codewalk/2018/04/27/javascript-add-subtract-days-iso-date-time-strings/

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
    const trendMonthPrice = (lastWeekPrice + last2WeekPrice + last3WeekPrice + last4WeekPrice) / 4;
    // console.log(trendMonthPrice)


    const latestDayInfo = JSON.stringify(stock["Time Series (Daily)"][lastInput]);
    console.log(latestDayInfo)
    const latestDayInfoClean = latestDayInfo.replace(/"/g," ")

    // console.log(stock["Weekly Time Series"][lastWeek]["4.close"])

    // console.log(stock)
    // console.log(stock["Time Series (Daily)"][lastInput]["4. close"])

    const $main = $("main")
        $main.empty()
        $main.html(`
        <h1 id="symbol">${symbol}</h1>
        <h2 id="price"> Current Price: $${lastPrice}</h2>
        <h5 id="hideInfo">Stock Info: ${latestDayInfoClean}</h5>
        `)
        if(trendMonthPrice < lastPrice){ 
                $main.append(`
                <h2 id="trending">Trending <span style="color: rgb(111,244,74)">Upwards</span></h2>
                `)}
        else if(trendMonthPrice > lastPrice) { 
                $main.append(`
                <h2 id="trending">Trending <span style="color: red">Downwards</span></h2>
                `)}
        else{
                $main.append(`<h2 id="trending">Trending Same as Previous</h2>`)
            }   
        $main.append(`
        <h5 id=fourWeeks> <span id=fourWeeksAgo>4 Weeks Ago: $${last4WeekPrice}</span> /
        <span id=threeWeeksAgo>3 Weeks Ago: $${last3WeekPrice}</span> /
        <span id=twoWeeksAgo>2 Weeks Ago: $${last2WeekPrice}</span> /
        <span id=oneWeekAgo>1 Week Ago: $${lastWeekPrice}</span></h5>`
        )
        if(last4WeekPrice > lastPrice) {
            document.getElementById("fourWeeksAgo").style.color = "rgb(111,244,74)"
        }
        else if(last4WeekPrice < lastPrice){
            document.getElementById("fourWeeksAgo").style.color = "red"
        }
        if(last3WeekPrice > lastPrice) {
            document.getElementById("threeWeeksAgo").style.color = "rgb(111,244,74)"
        }
        else if(last3WeekPrice < lastPrice){
            document.getElementById("threeWeeksAgo").style.color = "red"
        }
        if(last2WeekPrice > lastPrice) {
            document.getElementById("twoWeeksAgo").style.color = "rgb(111,244,74)"
        }
        else if(last2WeekPrice < lastPrice){
            document.getElementById("twoWeeksAgo").style.color = "red"
        }
        if(lastWeekPrice > lastPrice) {
            document.getElementById("oneWeekAgo").style.color = "rgb(111,244,74)"
        }
        else if(lastWeekPrice < lastPrice){
            document.getElementById("oneWeekAgo").style.color = "red"
        }
})
.catch(err=>console.log(err)) 
};




// ------------------
// History Generator
// ------------------

// object to hold application data
const data = {
    todos: []
}

// object to hold main dom nodes

const $nodes = {
    div: $("div.todos"),
    form: $("form"),
    textInput: $("input[type='text']"),
}

// function that saves the todos in local storage / you can only store strings in local storage
function saveTodos() {
    // turn the data obnject into a JSON
    const json = JSON.stringify(data) //stringify turns the input into a string
    localStorage.setItem("tickerSearch", json) // saves the string in local storage
}

// function for loading todos from local storage
function loadTodos() {
    // get data from local storage
    const json = localStorage.getItem("tickerSearch")
    // update data if json isn't undefined/falsey
    if(json){
        // parse json string into JS object
        const savedData = JSON.parse(json)
        // update data with the saved array
        data.todos = savedData.todos.slice(0,5)
    }
}



// function that renders todos to the div
function renderTodos(){

    //empty out the div before rendering
    $nodes.div.empty()

    for(let todo of data.todos){
        const $todoDiv = $("<div>").addClass("todo") //creates a div in the loop with class todo
        $todoDiv.text(todo) // adds to the div the text from the data.todos at the [todo] number
        $nodes.div.append($todoDiv) //adds it to the div
     
        // add click event to reload with previous stock
        $todoDiv.on("click", function(event){
            // get the text of the thing
            const text = $(event.target).text()// wrap this node in jQuery object
            
            stockChecker(text)
            // get the text of the thing
            renderTodos()
            
        })    
    
    }
    saveTodos()
}

// function for adding todos
function addTodo(newTodo){
    data.todos.unshift(newTodo) // adds the newTodo to the todos in the data node
    data.todos.pop()
    renderTodos() // runs the renderTodos function after
}

// Submission operators

$("input[type=submit]").on("click", (event) => {

    //prevent the refresh
    event.preventDefault()

    // grab text from input box
    const inputText = $("input[type=text]").val()

    // update the screen
    stockChecker(inputText)
    addTodo(inputText)
});
 

loadTodos()
renderTodos()

