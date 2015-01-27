
$(document).ready(function(){



// Hide all elements except div#question-label
$('.hide').hide();

// Choose question input type 
$('#question-label-submit').on('click', function() {
	console.log('oh hai');
	$('#question-type').removeClass('hide');
	$('#question-type').show("slow"); 
});

// Show selected input type / hide other options
$('#dropdown-selected').on('click', function() {
	console.log('Dropdown selected');
	$('#dropdown-type').removeClass('hide');
	$('#dropdown-type').show("slow"); 
	// hide other 3 options
	$('#text-area-type').addClass('hide');
	$('#radio-type').addClass('hide');
	$('#checkbox-type').addClass('hide');
});

$('#text-area-selected').on('click', function() {
	console.log('Text box selected');
	$('#text-area-type').removeClass('hide');
	$('#text-area-type').show("slow"); 
	// hide other 3 options
	$('#dropdown-type').addClass('hide');
	$('#radio-type').addClass('hide');
	$('#checkbox-type').addClass('hide');
});

$('#radio-selected').on('click', function() {
	console.log('Radio selected');
	$('#radio-type').removeClass('hide');
	$('#radio-type').show("slow"); 
	// hide other 3 options
	$('#text-area-type').addClass('hide');
	$('#dropdown-type').addClass('hide');
	$('#checkbox-type').addClass('hide');
});

$('#checkbox-selected').on('click', function() {
	console.log('Checkbox selected');
	$('#checkbox-type').removeClass('hide');
	$('#checkbox-type').show("slow"); 
	// hide other 3 options
	$('#text-area-type').addClass('hide');
	$('#radio-type').addClass('hide');
	$('#dropdown-type').addClass('hide');
});

// Dropdown: fill in options 
$('#dropdown-num-options-submit').on('click', function() {
	// remove any already-created text boxes first
	$('.dynamic-text-box').remove();

	var drpdwnNumOptions = $("#dropdown-num-selected :selected").val();
	console.log(drpdwnNumOptions);

	// append the amount of text boxes = drpdwnNumOptions
	for (var i = 0; i < drpdwnNumOptions; i++) {
		$('#dropdown-type').append("<textarea class='dynamic-text-box' id='msg'></textarea><br class='dynamic-text-box' />");	
	};
});


























}); //end document ready fxn
