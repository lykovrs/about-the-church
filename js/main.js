$(function() {
	var createUser, loginUser, form,

	// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
		emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		name = $( "#name" ),
		email = $( "#email" ),
		password = $( "#password" ),
		allFields = $( [] ).add( name ).add( email ).add( password ),
		tips = $( ".validateTips" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( "Length of " + n + " must be between " +
			min + " and " + max + "." );
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
			return false;
		} else {
			return true;
		}
	}

	createUser = $( "#create-user-form" ).dialog({
		autoOpen: false,

		modal: true,
        buttons: {
            Отправить: function() {
                $( this ).dialog( "close" );
            }
        },
		close: function() {
					$("#registration").reset();
					allFields.removeClass( "ui-state-error" );
		}
	});

	loginUser = $( "#login-user-form" ).dialog({
		autoOpen: false,

		modal: true,
        buttons: {
            Отправить: function() {
                $( this ).dialog( "close" );
            }
        },
		close: function() {
					$("#registration").reset();
					allFields.removeClass( "ui-state-error" );
		}
	});


	$( "#createUser" ).button().on( "click", function() {
		createUser.dialog( "open" );
	});

	$( "#loginUser" ).button().on( "click", function() {
		loginUser.dialog( "open" );
	});


	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '',
		nextText: '',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
			'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
			'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$( "#datepicker" ).datepicker($.datepicker.regional['ru']);



	/*
	 Carousel initialization
	 */
	$('.jcarousel')
		.jcarousel({
			// Options go here
		});

		/*
		 Prev control initialization
		 */
		$('.jcarousel-control-prev')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				// Options go here
				target: '-=1'
			});

		/*
		 Next control initialization
		 */
		$('.jcarousel-control-next')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				// Options go here
				target: '+=1'
			});


    $('.scroll-pane').jScrollPane({showArrows: true});


    $(".finder__btn_t_load").on("click", function(){
        $(this).find(".finder__btn-icon_t_loader").show();
    });
});


