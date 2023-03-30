function sendOTP() {
    const email = document.getElementById('email').value;
  
    if (!email) {
      document.getElementById('error').innerHTML = 'Please enter your email.';
      return;
    }
  
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert('OTP sent!');
      }
    };
    xhr.open('POST', '/sendOTP');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({ email }));
  }

  module.exports(sendOTP);
  