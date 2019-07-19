const express = require("express");
var nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
var bodyParser = require('body-parser');
const app = express();


//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
//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Static Files and View Engine
app.use(express.static('public'));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.render("index");
})

//Routes
app.post("/contact",(req,res)=>{
  const {name,email,message,subject} = req.body;
  console.log(name,email,message,subject);
  
  const apiKey = "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";

  sgMail.setApiKey(apiKey);
  const msg = {
    to: 'M.Alvee8101@gmail.com',
    from: email,
    subject: subject,
    text: message,
    html: `
    <div>
      <strong style="font-size:30px;color:#50c880;">Username: ${name} </strong>
      <p style="font-size:25px;">
      <strong>
      <strong style="color:#50c880;">${name}'s</strong> message is:</strong> ${message} 
      </p>
    </div>
    `,
  };
  sgMail.send(msg);
});


//Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT);