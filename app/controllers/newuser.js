var args = arguments[0] || {};
var Cloud = Alloy.Globals.Cloud;

function doRegister() {

	Cloud.Users.create({
		email : $.email.value,
		first_name : $.name.value,
		last_name : $.lastname.value,
		password : $.password.value,
		password_confirmation : $.confirmpassword.value
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			alert('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
			
			$.newuser.close();

		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

function doCancel() {
	$.newuser.close();
}
