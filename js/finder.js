(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<label>" )
                .addClass( "finder__input-wrapper" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "finder__input" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<span>" )
                .attr( "tabIndex", -1 )
                .attr( "alt", "Показать все" )
                .attr( "class", "finder__icon" )
                .tooltip()
                .appendTo( this.wrapper )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();
                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });
            

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
//                .attr( "title", value + " didn't match any item" )
//                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );

$(function() {
    $( "#sel-city" ).combobox({
        open: function(event, ui) {
            alert("!")
        }
    });
});

$(function() {
    $( "#finder-datepicker" ).datepicker({
        showOn: "button",
        buttonImage: "images/finder-icon-calendar.png",
        buttonImageOnly: true,
        buttonText: "Выберите дату"
//        onSelect: function(dateText, inst) {
//            var buttonImage = $("selector").datepicker( "option", "buttonImage" );
//            $( "#finder-datepicker" ).datepicker( "option", "buttonImage", 'images/finder-icon-calendar-selected.png' );
//        }

    });


});

$(function() {
	$( "#finder-type" ).selectmenu();
});

$(function() {
	$( "#finder-distance" ).selectmenu();
});


