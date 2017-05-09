function loadInHeaderAndFooter() {
	$('#headerContainer').load('baseTemplate.html #headerContainer', function() {
	  // Header Button Events
	  $(document).on('click', "#menu-toggle", function(evt) {
	    evt.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	  });

	  $(document).on('click', "#uploadVideo", function(evt){
	  	var widthPop = 500;
	  	var heightPop = 500;
	  	var left = (screen.width/2)-(widthPop/2);
      var top = (screen.height/2)-(heightPop/2);
	    window.open("https://www.dropbox.com/request/LYTqOXoHqg2PD5SetnuE", 'Upload a video', 'width=500, height=500, top='+top+', left='+left);
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