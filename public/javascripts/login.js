$(function () {
	$("#loginForm").submit(function (e) {
		e.preventDefault();

		var email = $('#loginEmail').val();
		var password = $('#loginPassword').val();

		$.ajax({
			url: '/api/login',
			method: 'POST',
			data: {
				email: email,
				password: password
			},
			error: function () {
				alert("Ein unbekannter Fehler ist aufgetreten");
			},
			success: function () {
				location.reload();
			}
		});
	});

	$("#registerForm").submit(function (e) {
		e.preventDefault();

		var firstname = $('#registerFirstname').val();
		var lastname = $('#registerLastname').val();
		var email = $('#registerEmail').val();
		var password = $('#registerPassword').val();

		$.ajax({
			url: '/api/register',
			method: 'POST',
			data: {
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password
			},
			error: function () {
				alert("Ein unbekannter Fehler ist aufgetreten");
			},
			success: function () {
				alert("Erfolgreich registriert");
				$('#registerForm').trigger('reset');
			}
		});
	});
});