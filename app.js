const express = require('express')
const request = require('request')
const https = require('https')

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const mail = req.body.email;

    var data = {
        members : [{
            email_address : mail,
            status : "subscribed",
            merge_fields : {
                "FNAME" : fname,
                "LNAME" : lname
            }
        }]
    };

    var jsonData  = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/43433fd176";
    const options = {
        method : "POST",
        auth : "rajneel:8c6788ffb1725330b8043afe359103fe-us6"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})

// API key : 8c6788ffb1725330b8043afe359103fe-us6
// list ID : 43433fd176