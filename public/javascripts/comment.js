$(function () {
	$('#commentForm').submit(function (e) {
		e.preventDefault();

		var message = $('#commentMessage').val();
		var url = $(this).attr('action');

		$.ajax({
			url: url,
			method: 'POST',
			data: {
				message: message
			},
			error: function () {
				alert("Unbekannter Fehler");
			},
			success: function () {
				location.reload();
			}
		});
	});
});