$(function () {
	$('#createForm').submit(function (e) {
		e.preventDefault();

		var data = new FormData(this);

		$.ajax({
			url: '/api/article/add',
			method: 'POST',
			processData: false,
			contentType: false,
			data: data,
			error: function () {
				alert("Unbekannter Fehler");
			},
			success: function () {
				location.href = '/';
			}
		});
	});
});