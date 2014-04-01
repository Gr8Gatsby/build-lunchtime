

document.addEventListener('deviceready', function(){
	var newButton = document.getElementById('resetTimer');
		newButton.addEventListener('click', function(){
		eventBecon.src = 'beacon.html?EVENT=NOTIFICATIONEVENT='+document.getElementById('timer').innerText;
	});
});