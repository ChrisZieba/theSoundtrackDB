
/*!
 * popupush
 *
 * Hits a database for a list of drop down items and displays them nicely. 
 *
 * Usage
 *
 * Original author: @ChrisZieba
 * Further changes, comments: @ChrisZieba
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
	
	// undefined is used here as the undefined global 
	// variable in ECMAScript 3 and is mutable (i.e. it can 
	// be changed by someone else). undefined isn't really 
	// being passed in so we can ensure that its value is 
	// truly undefined. In ES5, undefined can no longer be modified
	

	// Create the defaults once
	var pluginName = 'pgSearch',
		defaults = {
			// this is the class name of the ul list holding all the items in the dropdown
			ulname: "pgSearch_kyg"
		};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.$element = $(element);

		// jQuery has an extend method that merges the 
		// contents of two or more objects, storing the 
		// result in the first object. The first object 
		// is generally empty because we don't want to alter 
		// the default options for future instances of the plugin
		this.options = $.extend( {}, defaults, options) ;
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}


	Plugin.prototype = {
		init: function () {
			//console.log(this.$elem.val());
			this.$element.bind('keyup', this, this.listen);

			// this element is not created until we query for titles, so we need to use .on instead of bind
			$('html').on('click', '.' + this.options.ulname + ' li', this, this.select);

			// this is to hide the drop down if a click is registered outside of the dropdown
			$('html').bind('click', this, function (event) {
				var self = event.data;
				self.hide(self.options.results);
			});
		},

		// Listen for keystrokes into the text box.
		listen: function (event) {

			

			var query = $(this).val(),
				self = event.data;


			// attempt to get the new content
			$.ajax({
				url: self.options.uri,
				dataType: 'json',
				crossDomain: false,
				data: 'data=' + query + '&limit=10',
				success: function (data) {
					// the server should respond with an array of items to display in the drop down
					// e.g. ['item 1', 'item2'] once parsed from JSON
					self.populate(self, data);
				},
				complete: function () {
					
				},
				error: function (xhr, text, error) {
					console.log(text,error);
					// Nothing to be done if a request to youtube comes back with an error
				}
			});
		},


		/**
		 * Create the drop down in realtion to the text box and fill it with the results from the database
		 * @param {Object} obj This is the plugin object
		 * @param {Array} list The results returned from the aja request
		 * @return {Null} 
		 */
		populate: function (self, list) {


			// if the list is not empty create the list container and show the results
			if (list.length !== 0) {

				// hold the list of items to be shown in the drop down
				var items = [];

				// if the cache is set to true, store the results
				if (self.options.cache) {
					self.$element.data('cache', list);
				}


				items.push('<ul class="' + self.options.ulname + '">');
				// go through each title and wrap it in a div
				for (var i = 0; i < list.length; i+=1) {
					if (list[i].songs) {
						items.push('<li data-id="'+list[i].id+'">' + list[i].title + '</li>');
					}
					
				}
				items.push('</ul>')

				// look for the parent of the text box and append the results wrapper to it
				self.$element.nextAll('.' + self.options.results).first().show().html(items.join(''));
			} else {
				// this will hide the drop down
				self.hide(self.options.results);
			}
			
		},

		/**
		 * Handle the selection of an item from a dropdown list
		 * @param {String} chosen
		 * @return {Null} 
		 */
		select: function (event) {

			// self referes to the plugin object
			var self = event.data;

			// this will take the text from the li elemetn that was clicked and insert it into the value of the textbox
			self.$element.val($(this).text());

			// add the id of the clicked element to the data cache of the plugin
			self.$element.data('id', $(this).data('id'));

			// hide the drop down list
			self.hide(self.options.results);

			// if we are provided a function, for the option onItemSelect, run it
			if (typeof self.options.onItemSelect === 'function') {
				self.options.onItemSelect(null, $(this).text());
			}
		},

		/**
		 * Hide the drop down list
		 * @param {String} name
		 * @return {Null} 
		 */
		hide: function (name) {
			// hide the drop down if it currently shown
			if ($('.' + name).is(":visible")) {
				$('.' + name).hide();
			}
		}


	};

	



	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, 
				new Plugin( this, options ));
			}
		});
	}

})( jQuery, window, document );