let token = document.getElementById("token").value;

while(true) {

    setTimeout(function(){

        const request = new XMLHttpRequest();
		
		// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
		const url = "https://wordpress.defispace.com/wp-content/plugins/login-ssi-qr-code-everscale/check_auth.php";
			
		// Так же как и в GET составляем строку с данными, но уже без пути к файлу 
		const params = `token=${token}`;
			
		/* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
		асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
			параметр тоже необязателен.*/ 
		request.open("POST", url, true);
			
		//В заголовке говорим что тип передаваемых данных закодирован. 
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
		request.addEventListener("readystatechange", () => {
		
			if(request.readyState === 4 && request.status === 200) {       
				if(request.responseText == "true") {

                    window.location.replace("https://wordpress.defispace.com/member-account/");

                } else {
                    console.log(false);
                }
			}
		});	

		request.send(params);

    }, 5000);

}