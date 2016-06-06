$(function() {

    $('.submit-updates-1').on('click', function(e) {
        e.preventDefault();
		var email = $('.updates-1 input[type="email"]').val().toLowerCase();
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
		$.ajax({
			type: 'POST',
			url: '/subscribe',
			data: {
				email: email
			},
			success: function (err, res) {
				$('.submit-updates-1').text('Success!');
			}
		});
    });

    $('.submit-updates-2').on('click', function(e) {
        e.preventDefault();
		var email = $('.updates-2 input[type="email"]').val().toLowerCase();
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
		$.ajax({
			type: 'POST',
			url: '/subscribe',
			data: {
				email: email
			},
			success: function (err, res) {
				$('.submit-updates-2').text('Success!');
			}
		});
    });

    $('.submit-sketch-1').on('click', function(e) {
        e.preventDefault();
		var email = $('.sketch-1 input[type="email"]').val().toLowerCase();
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
		$.ajax({
			type: 'POST',
			url: '/subscribe',
			data: {
				email: email,
			},
			success: function (err, res) {
				$('.submit-sketch-1').text('Success!');
                window.location = 'https://stream-cabin.s3.amazonaws.com/defaults/stream-io_cabin-freebie.zip';
			}
		});
    });

});
