const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/82145e4102";

  const options ={
    method: "post",
    auth: "sidb:e7ccf07b73ad664581f885799469f9f9-us7"
  }


const request = https.request(url,options,function(response){
  response.on("data",function(data){
     var dat = JSON.parse(data)
    console.log(JSON.parse(data))
    if(response.statusCode === 200)
    res.sendFile(__dirname + "/success.html")
    else
    res.sendFile(__dirname + "/failure.html")
  });
});

request.write(jsonData);
request.end();
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})

// API key
// e7ccf07b73ad664581f885799469f9f9-us7

// list id
// 82145e4102
