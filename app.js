const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
import "./script"

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from public folder
app.use(express.static('public'));

// Get login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Send OTP to email
app.post('/sendOTP', (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = uuidv4().substr(0, 6);

  // Configure transport for nodemailer
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vimalhaasan07@gmail.com',
      pass: 'vimal007'
    }
  });

  // Configure mail options
  const mailOptions = {
    from: 'vimalhaasan07@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for login is ${otp}.`
  };

  // Send mail
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error sending OTP.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('OTP sent!');
    }
  });
});

// Verify OTP and show user details
app.post('/verify', (req, res) => {
  const { name, age, gender, email, otp } = req.body;

  // Check if OTP is valid
  if (otp !== req.session.otp) {
    res.status(400).send('Invalid OTP.');
    return;
  }

  // Show user details
  const userDetails = { name, age, gender, email };
  res.json(userDetails);
});

// Listen on port 3000
app.listen(3000, () => console.log('Server started on port 3000.'));
