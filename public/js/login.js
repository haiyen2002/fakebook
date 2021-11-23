async function login(){
    const userName = $('input[name="username"]').val();//get username
    const password = $('input[name="password"]').val();//get password
    const res = await $.ajax({
        url: '/user/login',
		type: 'POST',                   
		data: {userName, password}          //send to server
	});

	if (res.status == 200) {
		alert('Đăng nhập thành công')
        createCookie('userId', res.id)
        window.location.href = '/'
	} else {
		alert('Đăng nhập thất bại')
	}
}

function createCookie(name, value, days = 15) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
