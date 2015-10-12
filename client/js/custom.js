

(function($){
	$(document).ready(function(){
		console.log("custom is ready");
			$(".button-collapse").sideNav();
		$(".button-collapse").click(function(event){
			console.log("test1");
    		event.preventDefault();

		});
		// Initialize collapse button
  		

	});
})(jQuery);