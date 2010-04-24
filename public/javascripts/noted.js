(function($) {

	// configure our sammy app
	var app = $.sammy(function() {
		// add templating
		this.use(Sammy.Template);
		
		// ignore everything but the main div
		this.element_selector = '#main';

		// create a base route (equivalent to get '/' in sinatra)
		this.get('#/', function(context){
			$.ajax({
				url: 'data/items.js',
				dataType: 'json',
				success: function(items) {
					// render a partialeach of the items
					$.each(items, function(i, item) {
						context.partial('templates/item.template', {item: item}, function(rendered){
							context.$element().append(rendered);
						});
					});
				}
			});
		});
	});

	// start our sammy app, redirecting us to the # anchor (our "home")
	$(function() {
		app.run('#/');
	});

})(jQuery);