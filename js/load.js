
jQuery(function () {

    jQuery('.bg').parallax("50%", 0.6, true, Math.round(jQuery(window).height() * 0.2));
    jQuery('.bg2').parallax("50%", 1.6, true, Math.round(jQuery(window).height() * 0.2));
    jQuery('.bg3').parallax("50%", 5, true, Math.round(jQuery(window).height() * 0.5));
    jQuery('.bg4').parallax("100%", 0.1);
    jQuery('.bgParallax1').parallax("100%", 0.1);


    jQuery(window).scrollTo(0, {
        duration: 1000
    });

    jQuery(".divPannel").children().css({
        "height": jQuery(window).height(),
        "width": jQuery(window).width()
    });
    
    jQuery(".home-presentation").css({
        "margin-top": ((jQuery(window).height() / 2) - jQuery(".home-presentation").height() / 2)
    })


    jQuery(".bg, .bg2, .bg3, .bg4").css({
        "height": jQuery(window).height()
    });


	jQuery(".divPannel").each(function( idx, divPanel ){
		
		
		jQuery(divPanel).find(".contentDivSlide:gt(0)").each(function(idxSlide, divSlide){
			
			var divMenu = jQuery("<div>", {
				"class" : "DivMenu"
			});
			var html = jQuery("<div>").appendTo( divMenu );
			
			var len = jQuery(divSlide).siblings().andSelf().length;
			for (var i=0; i < len; i++) {
	  			  	
			  	html.append( jQuery("<div>", {
			  		'data-position' : i,
			  		'class' : (i==0 ? 'firstH': 'bulletH') + " " + ( i == (idxSlide+1) ? "selectedH" : "" )
			  	}) );
			  
			};
			
			jQuery(divSlide).append(divMenu);
			
		});
		
		
	});
	
    jQuery('div.bgParallax').each(function (idx, obj) {
        var $obj = jQuery(this);

//        jQuery(window).scroll(function () {
//            var yPos = -(jQuery(window).scrollTop() / $obj.data('speed'));
//
//            var bgpos = '50% ' + yPos + 'px';
//
//            $obj.css('background-position', bgpos);
//
//
//        });

        jQuery(".menu-center").append("<div class='bullet' title='" + jQuery($obj).find("h1").html() + "'></div>");
        jQuery(".bullet").first().addClass("selected");
    });



    jQuery('.multi').children().each(function (idx, child) {

        var c = jQuery(child).children();

        c.first().append("<div class='right-slide'></div>");

        c.not(":first").each(function (idx, childchild) {

            jQuery(childchild).append("<div class='left-slide'></div><div class='right-slide'></div>");

        });

    });


    jQuery('.bullet').each(function (idx, $obj) {

        jQuery($obj).qtip({
            position: {
                corner: {
                    target: 'rightMiddle',
                    tooltip: 'leftMiddle'
                },
                adjust: {
                    x: 2,
                    y: 0
                }
            },
            style: {
                tip: 'leftMiddle'
                //	name: 'blue' // Inherit from preset style
            }
        });

        jQuery($obj).click(function () {

            scrollToV("body", (jQuery(window).height() * idx), 2000);
            scrollToH("body>div", 0, 2000);
            jQuery(".selected-panel").removeClass("selected-panel");
            jQuery(".multi").eq(idx - 1).find(".divPannel").children().first().addClass("selected-panel")

        });
    });


    jQuery(".firstH").click(function () {
        var $bulletH = jQuery(this);
        var $divPanel = jQuery($bulletH).closest('.bgParallax');

        scrollToH(jQuery($divPanel), jQuery(window).width() * ($bulletH.data('position')), 1000);

        jQuery(".selected-panel").removeClass("selected-panel");
        $bulletH.parent().parent().parent().siblings().andSelf().eq(0).addClass("selected-panel");
    });


    jQuery(".bulletH").click(function () {
        var $bulletH = jQuery(this);
        var $divPanel = jQuery($bulletH).closest('.bgParallax');

        scrollToH(jQuery($divPanel), jQuery(window).width() * (jQuery($bulletH).data('position')), 1000);

        jQuery(".selected-panel").removeClass("selected-panel");
        $bulletH.parent().parent().parent().siblings().andSelf().eq($bulletH.data('position')).addClass("selected-panel");

    });

    jQuery(".left-slide").each(function () {
        var $leftSlide = jQuery(this);
        var $iddiv = ($leftSlide).closest('.multi'); //.parent().parent().parent();
        jQuery($leftSlide).click(function () {

            jQuery(".selected-panel").removeClass("selected-panel");
            $leftSlide.parent().prev().addClass("selected-panel");

            scrollToH(jQuery($iddiv), "-=" + jQuery(window).width(), 1000);

        });
    });

    jQuery(".right-slide").each(function () {
        var $rightSlide = jQuery(this);
        var $iddiv = ($rightSlide).closest('.multi') //parent().parent().parent();


        $rightSlide.click(function () {
            //jQuery("#groupID").scrollTo( "+=" + jQuery(window).width(), 0 , {duration:1000});
            jQuery(".selected-panel").removeClass("selected-panel");
            $rightSlide.parent().next().addClass("selected-panel");

            scrollToH(jQuery($iddiv), "+=" + jQuery(window).width(), 1000);

        });


    });

    jQuery(".right-slide").parent().parent().find(':last').click(function () {
        jQuery('.selected').next().click();
    });

    jQuery(document).on("keydown", function (event) {

        switch (event.which) {
        case 40: //down
            jQuery('.selected').next().click();
            return false;
            break;
        case 13: //down
            jQuery('.selected').next().click();
            return false;
            break;
        case 38: //up
            jQuery('.selected').prev().click();
            return false;
            break;


        case 39: //right

            //jQuery('.selected').click();

            jQuery(".selected-panel .right-slide").click();

            return false;
            break;
        case 37: //left


            jQuery(".selected-panel .left-slide").click();

            // jQuery('.selected').prev().click();
            return false;
            break;
        default:
            break;
        } //end switch

        //return false;

    }); //end keypress




    jQuery(window)
        .mousewheel(function (event, delta, deltaX, deltaY) {
            var o = '';
            if (delta > 0)
                jQuery('.selected').prev().click();
            else if (delta < 0)
                jQuery('.selected').next().click();

            if (deltaX > 0)
                o = o + ', east (' + deltaX + ')';
            else if (deltaX < 0)
                o = o + ', west (' + deltaX + ')';

            if (deltaY > 0)
                o = o + ', north (' + deltaY + ')';
            else if (deltaY < 0)
                o = o + ', south (' + deltaY + ')';

            if (o != '')
            //	console.log( o );
                return false; // prevent default
        });
    /*
	jQuery(window).resize(function() {
        clearTimeout(this.id);
        this.id = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
		jQuery('.selected').click();
		jQuery(".groupDiv").css({"height":jQuery(window).height(), "width":jQuery(window).width()});
		jQuery(".bg, .bg2, .bg3, .bg4").css({"height":jQuery(window).height()});
    }

    jQuery(window).resize();
*/
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() < jQuery(window).height()) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(0)').addClass("selected");
            return false;
        }

        if (jQuery(window).scrollTop() < jQuery(window).height() * 2) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(1)').addClass("selected");
            return false;
        }

        if (jQuery(window).scrollTop() < jQuery(window).height() * 3) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(2)').addClass("selected");
            return false;
        }

        if (jQuery(window).scrollTop() < jQuery(window).height() * 4) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(3)').addClass("selected");
            return false;
        }

        if (jQuery(window).scrollTop() < jQuery(window).height() * 5) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(4)').addClass("selected");
            return false;
        }

        if (jQuery(window).scrollTop() < jQuery(window).height() * 6) {
            jQuery('.bullet').removeClass("selected");
            jQuery('.bullet:eq(5)').addClass("selected");
            return false;
        }

    });


});



function scrollToV(elem, value, duration) {

    jQuery(elem).stop().animate({
        scrollTop: value
    }, duration || 2000);

}

function scrollToH(elem, value, duration) {

    jQuery(elem).stop().animate({
        scrollLeft: value
    }, duration || 2000);

}