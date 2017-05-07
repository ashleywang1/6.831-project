function loadInHeaderAndFooter() {
	$('#headerContainer').load('baseTemplate.html #headerContainer', function() {
	  // Header Button Events
	  $(document).on('click', "#menu-toggle", function(evt) {
	    evt.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	  });

	  $(document).on('click', "#uploadVideo", function(evt){
	    window.location="https://www.dropbox.com/request/LYTqOXoHqg2PD5SetnuE";
	  });

	  $(document).on('keydown', "#searchBar", function(evt){
	  	if (evt.which == 13) {
	  		window.location="search.html";
	  	}
	  });

	});
	$('#footerContainer').load('baseTemplate.html #footerContainer');
}

function loadInMenu(highlight_index=null) {
	$('#sidebar-wrapper').load('baseTemplate.html #sidebar-wrapper', function() {
		if (highlight_index != null) {
			$(".sidebar-nav a")[highlight_index].id = "highlight";
		}
	});
}