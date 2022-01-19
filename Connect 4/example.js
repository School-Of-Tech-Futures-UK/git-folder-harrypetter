const fetch = require('node-fetch');



fetch('https://api.github.com/usersxxxxx/torvalds/repos?page=0')
.then(response => {
if (response.status !== 200) {
console.log("something went wrong:" + response.status + ": ", response)
return
}
response.json()
.then(data => {
console.log(data)
})
}, error => {
console.log("there was an error: " + error)
})



fetch('https://api.github.com/users/torvalds/repos', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
name: 'Windows 11'
}),
})
.then(response => {
const text = response.status === 200 ? 'ok' : 'bad'
console.log(text, response.status)
})