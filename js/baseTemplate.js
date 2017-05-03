function loadInHeader() {
	$('#headerContainer').load('baseTemplate.html #headerContainer', function() {
	  // Header Button Events
	  $(document).on('click', "#menu-toggle", function(evt) {
	    evt.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	  });

	  $(document).on('click', "#uploadVideo", function(evt){
	    window.location="https://www.dropbox.com/request/LYTqOXoHqg2PD5SetnuE";
	  });
	});
}

function loadInMenu(highlight_index) {
	$('#sidebar-wrapper').load('baseTemplate.html #sidebar-wrapper', function() {
		$(".sidebar-nav a")[highlight_index].id = "highlight";
	});
}
