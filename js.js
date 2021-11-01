var input = document.getElementById('inputChangeBg');
var lockscreen = document.getElementsByClassName('lockscreen')[0]

var background = document.getElementById('background');

var loginPrompt = document.getElementById('login-container');

var passInput = document.getElementById('password')
var submitButton = document.getElementById('submit-login')

// var time = new Date();

var lockscreenActive = true;

//slidable lockscreen
var mouseStart = 0
var mousePos = (0,0)
var mouseDown = false

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

function openLogin() {
	passInput.value = ''

	mouseStart = 0
	mousePos = (0,0)
	mouseDown = false
	
	lockscreenActive = false

	lockscreen.classList.add('lockscreen-animate')
	lockscreen.style.bottom = '100vh';
	lockscreen.style.opacity = '0';
	background.style.filter = 'brightness(60%)'
	background.style.transform = 'scale(1.07)'

	loginPrompt.style.opacity = 1;

	setTimeout(function() {
		passInput.focus()
		passInput.value = ''
	},100)

	setTimeout(function() {
		lockscreen.offsetHeight;
		lockscreen.classList.remove('lockscreen-animate')
	},500)
}

function exitLogin() {
	mouseStart = 0
	mousePos = (0,0)
	mouseDown = false

	lockscreenActive = true

	

	lockscreen.classList.add('lockscreen-animate')
	lockscreen.style.bottom = '0';
	lockscreen.style.opacity = '1';
	background.style.filter = 'brightness(100%)'
	background.style.transform = 'scale(1.05)'

	loginPrompt.style.opacity = 0;
}

lockscreen.addEventListener('transitionend',function() {
	lockscreen.offsetHeight;
	lockscreen.classList.remove('lockscreen-animate')
})

document.onkeydown = function (e) {
	if (lockscreenActive == true && e.keyCode == 32) {
		openLogin()
	} else if (lockscreenActive == false && e.keyCode == 27) {
		exitLogin()
	}
	// console.log(lockscreenActive)
}




var lockscreen_image = document.getElementById('lockscreen-image')
document.onmousedown = function (e) {
	if (lockscreenActive) {
		mouseStart = e.clientY
		mouseDown = true

	}
}

//when onmouseup, check if mouse exceeds threshold, if not
//return to normal
document.onmouseup = function (e) {
	if (lockscreenActive) {
		mouseDown = false
		mouseStart = e.clientY
		
		lockscreen.classList.add('lockscreen-animate')
		if (parseInt(lockscreen.style.bottom.replace('vh')) > 40) {
			openLogin()
		} else {
			exitLogin()
		}
	}
}

//when mouse is moved, move the lockscreen if mouse is down
//if the distance passes a certain threshold, automatically open
document.onmousemove = function (e) {
	if (lockscreenActive) {
		mousePos = e.clientY
		if (parseInt(lockscreen.style.bottom.replace('vh')) > 40 && mouseDown) {
			openLogin()
		} else if (mouseDown) {
			var val = Math.max(Math.min(mouseStart - mousePos,10000000),1)
			lockscreen.style.bottom = (val/11) + 'vh';
			lockscreen.style.opacity = val.map(500,0,0,1)
		}
	}
}

setInterval(function() {
	if (mouseDown) {
		lockscreen.style.bottom = mouseStart[1] - mousePos[1] + 'vh';
	} 
},25)

function getOrdinalNum(dom) {
    if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
    else if (dom == 22 || dom == 2) return dom + "nd";
    else if (dom == 23 || dom == 3) return dom + "rd";
    else return dom + "th";
};

// update time on lockscreen
var textElements = document.getElementById('lockscreen-text')
function updateTime() {
	textElements.childNodes.forEach(element => {
		var time = new Date()
		
		if (time.getMinutes().toString().length == 1 ) { var minutes = '0' + time.getMinutes() }
		else { var minutes = time.getMinutes() } 

		if (element.id == 'lockscreen-minutes') {
			element.innerHTML =  time.getHours() % 12 + ':' + minutes
		} else {
			element.innerHTML = time.toLocaleDateString('default', { weekday: 'long' })   + ', ' + time.toLocaleString('default', { month: 'long' }) + ' ' + getOrdinalNum(time.getDate())
		}
		
	})
}
updateTime()
setInterval(updateTime,1000)


function callInput() {
	input.click();
	document.activeElement.blur()
}

function changeBackground() {
	bg = document.getElementById('lockscreen-image')
	
	console.log()
	
	var reader = new FileReader();
	reader.readAsDataURL(input.files[0]); // this is reading as data url

	// here we tell the reader what to do when it's done reading...
	reader.onload = readerEvent => {
		var content = readerEvent.target.result; // this is the content!
		bg.style.backgroundImage = 'url('+ content +')';
	}
}



submitButton.onmouseenter = function() {
	passInput.classList.add('forceHover')
}
submitButton.onmouseleave = function() {
	passInput.classList.remove('forceHover')
}

passInput.onfocus = function() {
	submitButton.classList.add('forceHover')
}

passInput.addEventListener('focusout', function() {
	submitButton.classList.remove('forceHover')
})

passInput.onmouseenter = function() {
	submitButton.classList.add('forceHover')
}
passInput.onmouseleave = function() {
	if (passInput != document.activeElement) {
		submitButton.classList.remove('forceHover')
	}
}


// function elementFocus(element) {
// 	element.classList.add('forceHover')
// 	console.log('hi')
// }
// function elementLostFocus(element) {
// 	element.classList.remove('forceHover')
// }

// function inputGainedFocus(element) {
	
// }

function submitDetails() {
	console.log('NAAH')
}