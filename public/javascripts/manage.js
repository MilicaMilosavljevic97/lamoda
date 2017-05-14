$(function () {
	$('*[data-delete]').click(function(){
		var articleId = $(this).attr('data-delete');

		$.ajax({
			url: '/api/article/' + articleId,
			method: 'DELETE',
			error: function () {
				alert("Unbekannter Fehler");
			},
			success: function () {
				location.reload();
			}
		});
	});
});