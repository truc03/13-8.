/*	Table OF Contents
==========================
1. Nav - Sticky
2. Nav - One Page 
3. TimeCircles Countdown
4. Magnific Popup
5. Ajax Form
6. Stellar Parallax
7. Owl Carrousel
*/

"use strict";
$(document).ready(function() {

    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			$("#donate-modal").show();
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}
	
	$(document).on('click', '#donate-modal .crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
	});
	
	$(document).on('click', '#donate-modal .cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});

	 function masonryGridSetting() {
		if ($('.masonry-gallery').length) {
			var $grid =  $('.masonry-gallery').masonry({
				itemSelector: '.grid',
				columnWidth: '.grid',
				percentPosition: true
			});

			$grid.imagesLoaded().progress( function() {
				$grid.masonry('layout');
			});
		}
	}
	masonryGridSetting();
	// "Portfolio Gallery with filtering category"
	$(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all"){
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }else{
            // $('.filter[filter-item="'+value+'"]').removeClass('hidden');
            // $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
        }

        $(".filter-button").removeClass("active");
        $(this).addClass("active");

    });
	/*==============================
		1. Nav - Sticky
	==============================*/
	$(window).on("load", function(){
	  $("#nav-sticky-wrapper").sticky({ topSpacing: 0 });
	});
	
	/*==============================
		2. Nav - One Page 
	==============================*/
	$('#nav_list').onePageNav({
		currentClass: 'active',
	});
	
	

	/*==============================
		4. Magnific Popup
	==============================*/
	$('.gallery-popup').magnificPopup({
	  delegate: 'a', // child items selector, by clicking on it popup will open
	  gallery:{enabled:true},
	  //type: 'image', //Detecta el tipo con la clase mfp-TYPE
	  mainClass: 'mfp-with-zoom', // this class is for CSS animation below

	  zoom: {
	    enabled: true, // By default it's false, so don't forget to enable it

	    duration: 300, // duration of the effect, in milliseconds
	    easing: 'ease-in-out', // CSS transition easing function

	    // The "opener" function should return the element from which popup will be zoomed in
	    // and to which popup will be scaled down
	    // By defailt it looks for an image tag:
	    opener: function(openerElement) {
	      // openerElement is the element on which popup was initialized, in this case its <a> tag
	      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
	      return openerElement.is('img') ? openerElement : openerElement.find('img');
	    }
	  },
	  markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
					  '<div class="mfp-title"></div>'+
					  '<div class="mfp-counter"></div>'+
					'</div>'+
				  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
	  titleSrc: 'title'
	  // other options
	});

	/*==============================
		5. Ajax Form
	==============================*/
	 if ($("#ajaxForm").length) {
        $("#ajaxForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            messages: {
                name: {
                    required: 'Vui lòng nhập tên của bạn.',
                    minlength: 'Tên phải lớn hơn 5 ký tự.',
                },
                content: {
                    required: 'Vui lòng nhập lời chúc.',
                    minlength: 'Lời chúc phải lớn hơn 10 ký tự.',
                },
                email: {
                    email: 'Địa chỉ email không hợp lệ.'
                }
            },
            errorPlacement: function(error, element) {
				if (element.attr("name") == "content" ) {
					error.insertAfter("#ajaxForm .vitualTextarea");
				} else {
					error.insertAfter(element);
				}
			},

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "/wish",
                    data: $(form).serialize(),
                    success: function (res) {
                        $( "#loader").hide();
                        $( ".error-handling-messages").slideDown( "slow" );
                        if(!res.error){
                            $('.wish-box').scrollTop(0);
                            $('.wish-box').prepend('<div class="wish-box-item bg"><strong>'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</strong><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
                            $( "#success").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                                $( ".error-handling-messages").slideUp( "slow" );
                                $( "#success").slideUp( "slow" );
                            }, 5000);
                        }else{
                            $( "#error").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                                $( ".error-handling-messages").slideUp( "slow" );
                                $( "#error").slideUp( "slow" );
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }
    
	$(document).on('click', '.BtnCloseResult', function () {
		$('#boxedResult').hide();
		$('#fullscreenloading').hide();
	});


	/*==============================
		6. Stellar Parallax
	==============================*/
	react_to_window();
        
	//only acstivate stellar for window widths above or equal to 1024
    var stellarActivated = false;
    
    $(window).on("resize", function() {
        react_to_window();
    });
    
    function react_to_window() {
        if ($(window).width() <= 1024) {
            if (stellarActivated === true) {
                $(window).data('plugin_stellar').destroy();
                stellarActivated = false;
            }
        } else {
            if (stellarActivated === false) {

                $.stellar({
                	horizontalScrolling: false,
					responsive: true,
               });
                
                $(window).data('plugin_stellar').init();
                stellarActivated = true;
            }
        }
    }

    /*==============================
		7. Owl Carrousel
	==============================*/
	$('#owl-logo').owlCarousel({
		items : 3,
		lazyLoad : true,
		navigation : false
	});

    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }
	
	/*==============================
		3. TimeCircles Countdown
	==============================*/
	/*  */
	if ($("#clock").length) {
        function timeElapse(date){
            var current = Date();
            var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
            var days = Math.floor(seconds / (3600 * 24));
            if (days < 10) {
                days = "0" + days;
            }
            seconds = seconds % (3600 * 24);
            var hours = Math.floor(seconds / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            seconds = seconds % 3600;
            var minutes = Math.floor(seconds / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var html = '<div class="box"><div><div class="time">' + days + '</div> <span>'+ $('#clock').data('text-day') +'</span> </div></div><div class="box"><div><div class="time">' + hours + '</div> <span>'+ $('#clock').data('text-hour') +'</span> </div></div><div class="box"><div><div class="time">' + minutes + '</div> <span>'+ $('#clock').data('text-minute') +'</span> </div></div><div class="box"><div><div class="time">' + seconds + '</div> <span>'+ $('#clock').data('text-second') +'</span> </div></div>';
            $('#clock').html(html);
        }
		var time = $('#clock').data('date');
        $('#clock').countdown(time.replace(/-/g,'/'), function(event) {
            if(event.type == 'stoped'){
                var together = new Date($('#clock').data('date'));           
                together.setHours(0);                           
                together.setMinutes(0);             
                together.setSeconds(0);                 
                together.setMilliseconds(0);
                setInterval(function() {
                    timeElapse(together);
                }, 1000);
            }else{
                var $this = $(this).html(event.strftime(''
                + '<div class="box"><div><div class="time">%D</div> <span>'+ $('#clock').data('text-day') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%H</div> <span>'+ $('#clock').data('text-hour') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%M</div> <span>'+ $('#clock').data('text-minute') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%S</div> <span>'+ $('#clock').data('text-second') +'</span> </div></div>'));
            }
        });
    }

        /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function() {
        $('ul.list-menu-icon').css('opacity','1');
        $('ul.list-menu-icon').css('pointer-events','');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function() {
        $('ul.list-menu-icon').css('opacity','0');
        $('ul.list-menu-icon').css('pointer-events','none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity','1');
    }, 3000); 
    if($('.bii-logo').length > 0){
       $('#menu-access').css('bottom','278px');
       document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
    }
    function shakeTooltip(){
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function(index) {
            setTimeout(() => {
                if(document.querySelector('.btn-menu-close').style.display !== "none"){  
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility','visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility','');
                        $(this).removeClass('shake');
                    }, 3000);
                } else{
                    return false;
                }
            }, index*5000); 
        });   
    }
    if($('#menu-access').length >0){
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function(){
        $('tooltiptext').css('visibility','');
        clearInterval(myInterval);
    });

    // ALBUM GALLERIES

    $(document).on('click', '.btn-see-more-gallery', function(e){
        e.preventDefault();
        let indexNumber = $(this).data('index') || 0;
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl: photoGalleries,
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
            index: parseInt(indexNumber)
        });
    });

    $(document).on('click', '.qr-code-image', function(){
        let srcImage = $(this).attr('src');
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl:  [{
                src: srcImage,
            }],
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
        });
    });
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});