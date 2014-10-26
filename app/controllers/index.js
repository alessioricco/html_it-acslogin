var Cloud = Alloy.Globals.Cloud;

function update() {
	Ti.API.info("update " + Cloud.sessionId);
	$.logout.visible = (Cloud.sessionId != null);
	$.username.visible = !(Cloud.sessionId);
	$.password.visible = !(Cloud.sessionId);
	$.confirm.visible = !(Cloud.sessionId);
	$.newuser.visible = !(Cloud.sessionId);
}

function doLogin(e) {

	if ($.username.value && $.password.value) {

		Cloud.Users.login({
			login : $.username.value,
			password : $.password.value
		}, function(e) {

			update();

			Ti.API.info(JSON.stringify(e));

			if (e.success) {
				var user = e.users[0];
				alert('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

	} else {
		alert("Username o password mancanti");
	}

	$.username.blur();
	$.password.blur();

}

function doLogout(e) {

	Ti.API.info(JSON.stringify(e));

	Cloud.Users.logout(function(e) {
		
		update();
		
		if (e.success) {
			alert('Success: Logged out');
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function doNewUser() {
	var controller = Alloy.createController('newuser');
	var win = controller.getView();
	win.open();
}

$.index.open();

