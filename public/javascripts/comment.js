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

	$('*[comment-delete]').click(function(){

		var commentId = $(this).attr('comment-delete');

		$.ajax({
			url: '/api/comment/' + commentId,
			method: 'DELETE',
			error: function () {
				alert("Unbekannter Fehler");
			},
			success: function () {
				location.reload();
				//$(that).removeClass('glyphicon-heart-empty').addClass('glyphicon-heart').css('color', 'red').removeAttr('data-like');
			}
		});
	});

});