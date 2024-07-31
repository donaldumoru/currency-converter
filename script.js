function convertCurrency() {
    // Get the selected first and second currencies and the input amount
    let firstCurrency = document.getElementById("firstCurrency").value;
    let secondCurrency = document.getElementById("secondCurrency").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let displayResult = document.getElementById("result")
    let date = document.getElementById("date");

    // Fetch exchange rates from API based on the first currency
    fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency}`)
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {

            console.log(data);

            let displayDate = data.date;

            // Get exchange rate for the second currency
            let exchangeRate = data.rates[secondCurrency];

            // Calculate the converted amount
            let convertedAmount = amount * exchangeRate;


            // If statment to check if amount is less than 1
            if (amount < 1) {
                displayResult.textContent = ("Please input an amount above 0 " + firstCurrency);
            }

            // If amount is 1 or greater, display conversation rate
            else {
                displayResult.textContent = `${amount} ${firstCurrency} is approximately ${convertedAmount.toFixed(2)} ${secondCurrency}`;
            }

            date.textContent = `${firstCurrency} to ${secondCurrency} conversion rate - Last updated ${displayDate}`;

        })
        .catch(error => {
            console.error(error);
        });
};
