
function callAPIs(obj) {
	$('.google,.youtube').children().remove();
	$
			.ajax({
				url : 'https://kgsearch.googleapis.com/v1/entities:search',
				method : 'GET',
				data : {
					'query' : $(obj).val(),
					'key' : 'AIzaSyBjKAGSPxy48Mzlhc4yu2-xfGCGkG5IxCY',
					'limit' : '5',
					'indent' : 'True'
				},
				success : function(data, status) {

					mainTitle = $('<h1>').css({
						'margin-top' : '20px',
						'margin-bottom' : '20px',
					}).html('Google API Results').appendTo('.google');

					for (x = 0; x < data.itemListElement.length; x++) {

						container = $('<div>').css({
							'width' : '90%',
							'padding' : '10px',
							'margin' : '0 auto',
							'text-align' : 'left',
							'margin-top' : '10px',
							'margin-bottom' : '10px',
							'box-shadow' : '0 0 5px 1px gray',
							'background-color':'#294F8A',
							'color':'white'
						}).appendTo($('.google'));

						if (data.itemListElement[x].result.image) {
							imageUrl = $('<img>')
									.attr(
											{
												'src' : data.itemListElement[x].result.image.contentUrl
											}).css({
										'width' : '100px',
										'height' : '100px',
										'margin-bottom' : '10px',
										'display' : 'block'
									}).appendTo(container);
						}

						name = $('<a>')
								.css({
									'padding' : '2px',
									'font-size' : '18px',
									'margin' : '5px',
									'margin-top' : '10px',
									'color':'white'

								})
								.attr(
										{
											'href' : data.itemListElement[x].result.detailedDescription.url
										}).html(
										data.itemListElement[x].result.name)
								.appendTo(container);

						description = $('<p>').css({
							'padding' : '2px',
							'font-size' : '10px',
							'color' : 'white'

						}).attr({
							'href' : 'description'
						}).html(data.itemListElement[x].result.description)
								.appendTo(container);

						detailedDescription = $('<p>')
								.css({
									'padding' : '2px',
									'font-size' : '12px',
									'color' : 'white'
								})
								.html(
										data.itemListElement[x].result.detailedDescription.articleBody)
								.appendTo(container);
					}

				}

			});

	$.ajax({
		url : 'https://www.googleapis.com/youtube/v3/search',
		method : 'GET',
		data : {
			'part' : 'snippet',
			'q' : $(obj).val(),
			'key' : 'AIzaSyBjKAGSPxy48Mzlhc4yu2-xfGCGkG5IxCY',
			'limit' : '5'
		},
		success : function(data, status) {

			YouTitle = $('<h1>').css({
				'margin-top' : '20px',
				'margin-bottom' : '20px'
			}).html('Youtube API Results').appendTo('.youtube');

			for (x = 0; x < data.items.length; x++) {
				container = $('<div>').css({
					'width' : '90%',
					'padding' : '10px',
					'margin' : '0 auto',
					'text-align' : 'left',
					'margin-top' : '10px',
					'margin-bottom' : '10px',
					'box-shadow' : '0 0 5px 1px gray',
					'background-color':'#294F8A',
					'color':'white'
				}).appendTo($('.youtube'));

				if (data.items[x].snippet.thumbnails.high) {
					imageUrl = $('<img>').attr({
						'src' : data.items[x].snippet.thumbnails.high.url
					}).css({
						'width' : '100px',
						'height' : '100px',
						'margin-bottom' : '10px',
						'display' : 'block'
					}).appendTo(container);
				}

				name = $('<a>').css({
					'padding' : '2px',
					'font-size' : '18px',
					'margin' : '5px',
					'margin-top' : '10px',
					'color':'white'

				}).attr(
						{
							'href' : 'https://www.youtube.com/watch?v='
									+ data.items[x].id.videoId
						}).html(data.items[x].snippet.title)
						.appendTo(container);

				channelTitle = $('<p>').css({
					'padding' : '2px',
					'font-size' : '12px',
					'color':'white'

				}).attr({
					'href' : 'description'
				}).html(data.items[x].snippet.description).appendTo(container);
			}

		}

	});

}

$(document).ready(function() {
});