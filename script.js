// Your API key from ExchangeRate-API
const apiKey = '266fcb65b0023d6950892c40';

// This function runs when user clicks "Convert" button
function convert() {

  // Step 1 — Get what the user typed and selected
  const amount = document.getElementById('amount').value;  // the number user typed
  const from = document.getElementById('from').value;      // currency converting FROM
  const to = document.getElementById('to').value;          // currency converting TO
  const resultBox = document.getElementById('result');     // the result box on page
  const errorBox = document.getElementById('error');       // the error message on page

  // Step 2 — Check if amount is valid
  // If user typed 0 or nothing, show error and stop
  if (amount <= 0 || amount === '') {
    errorBox.innerText = 'Please enter a valid amount.';
    return; // stop here, don't continue
  }

  // Step 3 — Clear any old error message
  errorBox.innerText = '';

  // Step 4 — Show "Loading..." while we wait for data
  resultBox.innerHTML = 'Loading...';

  // Step 5 — Build the API URL with user's choices
  // Example: .../pair/JPY/NPR/1000
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

  // Step 6 — Fetch live exchange rate data from the internet
  fetch(url)

    // Step 7 — Convert the response to readable JSON data
    .then(response => response.json())

    // Step 8 — Use the data to show result on page
    .then(data => {

      // If API returned an error, show message and stop
      if (data.result === 'error') {
        errorBox.innerText = 'Could not get rate. Try again.';
        resultBox.innerHTML = 'Enter an amount and click Convert';
        return;
      }

      // Get the converted amount (rounded to 2 decimal places)
      const converted = data.conversion_result.toFixed(2);

      // Get the exchange rate (rounded to 4 decimal places)
      const rate = data.conversion_rate.toFixed(4);

      // Step 9 — Show the result on the page
      resultBox.innerHTML = `
        ${amount} ${from} =
        <span>${converted} ${to}</span>
        <small style="display:block; color:#6a95b0; font-size:12px; margin-top:6px;">
          1 ${from} = ${rate} ${to}
        </small>
      `;

    })

    // Step 10 — If something goes wrong (no internet etc), show error
    .catch(error => {
      errorBox.innerText = 'Something went wrong. Please try again.';
      resultBox.innerHTML = 'Enter an amount and click Convert';
    });

}