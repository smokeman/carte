(function($){
    var Carte = {

        init: function(){
            var self = this;
            window.addEventListener('push', function(e) {
                self.siteBootUp(e);
            });
            self.siteBootUp();

        },

        /*
        * Things to be execute when normal page load
        * and pjax page load.
        */
        siteBootUp: function(e){
            var self = this;
            if(e == undefined){
            }
            else{
            	//console.log(e.detail.state.url);
            }
            self.toggleButton();
            self.ratingStar();
            self.initImageLightbox();
            self.pullToRefresh();
            
        },

        toggleButton: function(){
            if(document.querySelector('#priceToggle')){
                document.querySelector('#priceToggle').addEventListener('toggle', function(e) {
                    if(e.detail.isActive){
                        console.log(1);
                    }
                    else{}
                    /*"Event subscriber on "+e.currentTarget.nodeName+", "
                    +e.detail.time.toLocaleString()+": "+e.detail.message*/
                });
            }
        },

        ratingStar: function(){
            $('.ui.rating.enable').rating();
        },
        pullToRefresh: function(){
            var self = this;
            var opts = {
                nav: '#pullHeader',
                scrollEl: '#pullContent',
                onBegin: function(){
                    console.log('Begin refresh');
                },
                onEnd: function(){
                    console.log('End refresh');
                },
                maxTime: 2000,
                //freeze: true
            }
            mRefresh(opts);

            $('.refreshAction').on('tap click', function(){
                mRefresh.refresh();
            });
             // prevent browser scroll
            /*$('#pullHeader').on('touchstart', function(e){
                 e.preventDefault();
            });
            // Handle the start of interactions
            $('#pullContent').on('touchmove', function(e){
                var el = document.getElementById("pullContent");
                var startTopScroll = el.scrollTop;

                if (startTopScroll <= 0) {
                    el.scrollTop = 1;
                }
                if(startTopScroll + el.offsetHeight >= el.scrollHeight) {
                    el.scrollTop = el.scrollHeight - el.offsetHeight - 1;
                }
            });*/
            /*  var opts = { 
                    nav: '', //String, using for Type2 
                    scrollEl: '', //String  
                    onBegin: null, //Function 
                    onEnd: null, //Function 
                    top: '0px', //String 
                    theme: 'mui-blue-theme', //String 
                    index: 10001, //Number
                    maxTime: 6000, //Number 
                    freeze: false //Boolen 
                } 
                mRefresh(opts);
            */
        },

        initImageLightbox: function(){
            // ACTIVITY INDICATOR
            var activityIndicatorOn = function()
            {
                $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
            },
            activityIndicatorOff = function()
            {
                $( '#imagelightbox-loading' ).remove();
            },

            // OVERLAY
            overlayOn = function()
            {
                $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
            },
            overlayOff = function()
            {
                $( '#imagelightbox-overlay' ).remove();
            },

            // CLOSE BUTTON
            closeButtonOn = function( instance )
            {
                $( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
            },
            closeButtonOff = function()
            {
                $( '#imagelightbox-close' ).remove();
            },

            // CAPTION
            captionOn = function()
            {
                var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
                if( description.length > 0 )
                    $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
            },
            captionOff = function()
            {
                $( '#imagelightbox-caption' ).remove();
            },

            // NAVIGATION
            navigationOn = function( instance, selector )
            {
                var images = $( selector );
                if( images.length )
                {
                    var nav = $( '<div id="imagelightbox-nav"></div>' );
                    for( var i = 0; i < images.length; i++ )
                        nav.append( '<button type="button"></button>' );

                    nav.appendTo( 'body' );
                    nav.on( 'click touchend', function(){ return false; });

                    var navItems = nav.find( 'button' );
                    navItems.on( 'click touchend', function()
                    {
                        var $this = $( this );
                        if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
                            instance.switchImageLightbox( $this.index() );

                        navItems.removeClass( 'active' );
                        navItems.eq( $this.index() ).addClass( 'active' );

                        return false;
                    })
                    .on( 'touchend', function(){ return false; });
                }
            },
            navigationUpdate = function( selector )
            {
                var items = $( '#imagelightbox-nav button' );
                items.removeClass( 'active' );
                items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
            },
            navigationOff = function()
            {
                $( '#imagelightbox-nav' ).remove();
            },

            // ARROWS
            arrowsOn = function( instance, selector )
            {
                var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );
                $arrows.appendTo( 'body' );
                $arrows.on( 'click touchend', function( e )
                {
                    e.preventDefault();

                    var $this   = $( this ),
                        $target = $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
                        index   = $target.index( selector );

                    if( $this.hasClass( 'imagelightbox-arrow-left' ) )
                    {
                        index = index - 1;
                        if( !$( selector ).eq( index ).length )
                            index = $( selector ).length;
                    }
                    else
                    {
                        index = index + 1;
                        if( !$( selector ).eq( index ).length )
                            index = 0;
                    }
                    instance.switchImageLightbox( index );
                    return false;
                });
            },
            arrowsOff = function()
            {
                $( '.imagelightbox-arrow' ).remove();
            };
            var selectorF = 'a[data-imagelightbox="a"]';
            var instanceF = $( selectorF ).imageLightbox(
            {
                onStart:        function() { overlayOn(); closeButtonOn( instanceF ); navigationOn( instanceF, selectorF ); /*captionOff(); arrowsOn( instanceF, selectorF );*/},
                onEnd:          function() { overlayOff(); closeButtonOff(); navigationOff(); /* arrowsOff(); captionOff(); */activityIndicatorOff();},
                onLoadStart:    function() { activityIndicatorOn(); },
                onLoadEnd:      function() { /*captionOn(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); */ navigationUpdate( selectorF ); activityIndicatorOff(); }
            });
        },
    	
    }
    window.Carte = Carte;
})(jQuery);

$(document).ready(function()
{
    Carte.init();
});
    //window.addEventListener('push', myFunction);
    //document.querySelector('#mySlider').addEventListener('slide', myFunction)