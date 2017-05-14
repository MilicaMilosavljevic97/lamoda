$(function () {
	$('*[data-like]').click(function(){
		var articleId = $(this).attr('data-like');

		$.ajax({
			url: '/api/article/' + articleId + '/like',
			method: 'POST',
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