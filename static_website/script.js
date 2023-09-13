// Replace the YOUR_API_ENDPOINT_URL with yours
// It should look something like this:
// https://example1a2s3d.execute-api.us-east-1.amazonaws.com/prod/reminders

let API_ENDPOINT = 'https://ataodmhwtl.execute-api.us-east-1.amazonaws.com/production/reminders'

// Setup divs that will be used to display interactive messages
let errorDiv = document.getElementById('error-message')
let successDiv = document.getElementById('success-message')
let resultsDiv = document.getElementById('results-message')

// Setup easy way to reference values of the input boxes
function waitSecondsValue() {
  return document.getElementById('waitSeconds').value
}

function messageValue() {
  return document.getElementById('message').value
}

function emailValue() {
  return document.getElementById('email').value
}

function phoneValue() {
  return document.getElementById('phone').value
}


// Clear any exisiting notifications in the browser notifications divs
function clearNotifications() {
  errorDiv.textContent = ''
  resultsDiv.textContent = ''
  successDiv.textContent = ''
}

// Add listeners for each button that make the API request
document.getElementById('bothButton').addEventListener('click', (e) => sendData(e, 'both'))
document.getElementById('emailButton').addEventListener('click', (e) => sendData(e, 'email'))
document.getElementById('smsButton').addEventListener('click', (e) => sendData(e, 'sms'))

function sendData(event, pref) {
  // Prevent the page reloading and clear exisiting notifications
  event.preventDefault()
  clearNotifications()
  // Prepare the appropriate HTTP request to the API with fetch
  // create uses the root /prometheon endpoint and requires a JSON payload
  fetch(API_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      waitSeconds: waitSecondsValue(),
      preference: pref,
      message: messageValue(),
      email: emailValue(),
      phone: phoneValue()
    })
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      successDiv.textContent = 'Looks ok. But check the result below!'
      resultsDiv.textContent = JSON.stringify(data)
    })
    .catch((err) => {
      console.error(err)
      errorDiv.textContent = 'There was an error:\n' + err.toString()
    })
};
