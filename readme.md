# Stock Checker

This is an application to check the stock price of any public company, and whether the stock is trending up or down.

### Technologies used:

- HTML
- Cascading Style Sheet (CSS)
- JavaScript
- jQuery

### Wireframes

![Wireframe Homepage](https://i.imgur.com/XsGP6dV.jpg)
![Wireframe Stock Result](https://i.imgur.com/7R1BVNh.jpg)

### Daily Plan

| Day | Goal |
|-----|------|
| 1 | Choose API / Learn full API functionality |
| 2 | Render data to screen |
| 3 | Create form |
| 4 | Bug testing, add trend functionality and last checked stocks history |
| 5 | Website Styling / Responsive |
| 6 | Final debugging and styling |
| 7 | Presentation Day |

### Project Functions

- Input Form: On page open, page contains a input form which will accept stock tickers (e.g. "AAPL", "MSFT"...) and return that stock's price info, and trend. It will additionally store that search into the search history section of the app.

- Price Box: The price box will show the searched stock ticker's current price based on last day submitted. On hover of the price, the app will reveal the stock's daily information, such as price at open, close, peak, bottom, and daily volume.

- Trend return: Shows the stock's current trend, either "Upwards" or "Downwards" based on the average of the last 4 week's prices compared to the current price. Hovering over the element will show the prices of the last four weeks color-coded for green if the price was higher than the current price, or red if it was lower.

- Search History: When searching for a stock, the query will be stored at the bottom of the page in the search history. The last 5 searches will be stored there, and can be clicked to return to that stock's price info.


### Link to Project

[Stock Checker App](https://jeanbrigo.github.io/Project-1/)

### Plannned future enhancements:

- Adding graphed data
- Updating price every 5 mins (chosen API max free setting)