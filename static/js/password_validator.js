

function validateUsername(){
var username=document.forms["login"]["username"].value;
if (username==null || username==""){
  alert("Please fill out the username");
  return false;
} 
}

function validatePassword(){
var password=document.forms["login"]["password"].value;
if (username==null || username==""){
  alert("Please fill out the username");
  return false;
}
else {
  isPasswordValid(password);
}
}


function hasUppercase(input) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] === input[i].toUpperCase()) {
    return true;
		}
  }
}

function hasLowercase(input) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] === input[i].toLowerCase()) {
    return true;
		}
  }
}

function isLongEnough(input) {
    if (input.length >= 8) {
    return true;
	}
}


function hasSpecialCharacter(input) {
  var specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*'];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < specialCharacters.length; j++) {
      if (input[i] === specialCharacters[j]) {
        return true;
	        }
        }
    }
}


function isPasswordValid(input) {
  if (hasUppercase(input) === true && hasLowercase(input) === true && isLongEnough(input) === true && hasSpecialCharacter(input) === true) {
			console.log("The password is valid");
  		}
  else if (hasUppercase(input) !== true) {
    console.log("The password is invalid, you need to use at least one capital letter!");
  }
  else if (hasLowercase(input) !== true) {
    console.log("The password is invalid, you need to use at least one lower letter!");
  }
  else if (isLongEnough(input) !== true) {
    console.log("The password is invalid, you need to use minimum 8 character!");
  }
  else if (hasSpecialCharacter(input) !== true) {
    console.log("The password is invalid, you need to use at least one special character!");
  }
}



