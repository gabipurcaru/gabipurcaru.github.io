console.log('psst! Have a look at the page source');

document.body.onload = function() {
	var random_color = function() {
		return (
			"hsla(" +
			parseInt(Math.random() * 256) +
			", 100%, " +
			parseInt(Math.random() * 40 + 30) +
			"%, 1)"
		);
	};

	function logo() {
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		var canvas = document.getElementsByClassName('drawing')[0];
		canvas.style.width = "0.74em";
		canvas.style.width = canvas.clientWidth + 'px';
		canvas.style.height = canvas.clientWidth + 'px';
		var context = canvas.getContext('2d');

		var width = canvas.clientWidth;
		var height = canvas.clientHeight;

		context.canvas.width = width;
		context.canvas.height = height;
		context.imageSmoothingEnabled = false;

		var num_blocks = 4;
		var block_size = Math.ceil(width / num_blocks);

		var update_interval = 400;  // in ms
		var hover_interval = 20;
		var is_hovering = false;

		for(var i=0; i * block_size < height; i++) {
			for(var j=0; j < num_blocks; j++) {
				context.fillStyle = random_color();
				context.fillRect(i * block_size, j * block_size, block_size, block_size);
			}
		}

		var timeout;
		var updater = function() {
			var i = parseInt(Math.random() * height / block_size);
			var j = parseInt(Math.random() * num_blocks);

			context.fillStyle = random_color();
			context.fillRect(i * block_size, j * block_size, block_size, block_size);

			link.href = canvas.toDataURL('image/png');
			document.head.appendChild(link);

			if(is_hovering) {
				timeout = setTimeout(arguments.callee, hover_interval);
			} else {
				timeout = setTimeout(arguments.callee, update_interval);
			}
		};
		updater();

		canvas.addEventListener('mouseover', function() {
			is_hovering = true;
			clearTimeout(timeout);
			updater();
		});

		canvas.addEventListener('mouseout', function() {
			is_hovering = false;
		});
	}

	logo();

	document.getElementsByClassName('more')[0].addEventListener('click', function() {
		this.style.display = 'none';
		document.getElementsByClassName('more-projects')[0].style.display = 'block';
	});
};
