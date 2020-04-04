/**
 * Header enhancements for more intelligent dynamic headers.
 *
 * This sets the masthead to the height of an uploaded image and applies sticky navigation.
 */

( function( $ ) {

	// Fit header into the available space
	function fitHeader() {
		var windowWidth = $( window ).width();
		var headerHeight = $( '#pique-header-image' ).height();
		var navHeight = $( '#primary-menu' ).height();
		var brandingHeight = $( '.site-branding' ).height();

		// Make sure we're not on the homepage, since that handles stuff differently
		if ( ! $( 'body' ).hasClass( 'pique-frontpage' )) {
			if ( 0 < $( '#pique-header-image' ).length ) {
				// Add the height of our header image and the height of our nav
				$( '#masthead' ).css( 'height', headerHeight + navHeight );
			} else {
				// Give enough room for our branding
				console.log('no header');
				$( '#masthead' ).css( 'height', brandingHeight + navHeight + 40 );
			}
		}
	};

	// Okay, now we want to stick-ify our menu when we reach it
	function stickyNav() {
		var nav_container = $( '#site-navigation-wrapper' );
		var nav = $( '#site-navigation' );

		nav_container.waypoint( {
			handler: function(direction) {
				nav.toggleClass( 'sticky', direction == 'down' );

				// Ensure we don't have an awkward jump when the menu sticks
				if ('down' === direction) {
					nav_container.css( { 'height':nav.outerHeight() } );
				} else {
					nav_container.css( { 'height':'auto' } );
				}
			}
		});
	};

	// Run our functions once the window has loaded fully
	$( window ).on( 'load', function() {
		fitHeader();
		stickyNav();
	});

	// Annnnnd also every time the window resizes
	var isResizing = false;
	$( window ).on('resize', function() {
		if (isResizing) {
			return;
		}

		isResizing = true;
		setTimeout(function() {
			fitHeader();
			isResizing = false;
		}, 150);
	});

} )( jQuery );
