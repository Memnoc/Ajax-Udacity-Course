/**
 * Example of fecth request
 */

//  Prints the response object in console
fetch('http://www.omdbapi.com/?s=batman&y=2018&apikey=')
    .then(response => console.log(response))

// Fetch the response in JSON format
// Prints the response in console
fetch('http://www.omdbapi.com/?s=batman&y=2018&apikey=')
    .then(response => response.json())
    .then(data => console.log(data));