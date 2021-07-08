'use strict';
(function () {
		
	var is_send = 'message was send, i will read soon \nотправлено и скоро будет прочитано';
	var placehold = 'leave a message up to 1500 letters \nздесь можно написать сообщение длиной до 1500 символов';
	var sending = 'sending... \nотправляется...';
	
	window.onload = function () {
		whois();
		document.getElementById('self').onclick = function(){
			if (document.getElementById('write').style.display==='block'){
				document.getElementById('write').style.display='none';
				document.getElementById('list').style.display = 'block';
			} else {
				document.getElementById('list').style.display = 'none';
				document.getElementById('write').style.display='block';
			}
		};	
		document.getElementById('send').onclick = sendMessage;
			
	}	
	function sendMessage() {
		var message = document.getElementById('message').value;
        if (!message) {
            document.getElementById('message').placeholder =
                placehold;
            return;
        }
        document.getElementById('message').value = '';
        document.getElementById('message').placeholder = sending;
        document.getElementById('send').disabled = true;
        fetch('https://api.telegram.org/bot1559844466:' + 'AAGzTnMSXuHHofA4xzASLEjnW4U7GNLy8m0/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: 1711572697,
                text: 'new message: ' + message
            })
        }).then(function (response) {
            if (!response.ok) {
                response.text().then(console.error);
                throw new Error(response.status);
            }
            return response.json();
        }).then(function (json) {
            if (!json.ok) {
                console.error(JSON.stringify(json));
                throw new Error('not ok');
            }
            document.getElementById('message').placeholder = is_send;
            document.getElementById('send').disabled = false;
            setTimeout(function () {
                if (document.getElementById('message').placeholder === is_send) {
                    document.getElementById('message').placeholder = '';
                }
            }, 5000);
        }).catch(function (error) {
            document.getElementById('message').placeholder = error;
            document.getElementById('send').disabled = false;
        });
    }
	
	function whois(){
		fetch('https://api.telegram.org/bot1559844466:' + 'AAGzTnMSXuHHofA4xzASLEjnW4U7GNLy8m0/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: 1711572697,
                text: 'metadata: '
				+ navigator.userAgent + ',\n ' 
				+ navigator.language.substr(0, 2) 				
            })
        }).then(function (response) {
            if (!response.ok) {
                response.text().then(console.error);
                throw new Error(response.status);
            }
            return response.json();
        }).then(function (json) {
            if (!json.ok) {
                console.error(JSON.stringify(json));
                throw new Error('not ok');
            }
        }).catch(function (error) {
			});
	}
	
	
})();