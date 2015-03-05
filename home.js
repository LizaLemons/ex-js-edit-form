

var Questions = []; 	// Rails ==> Question.all
Questions[0] = {}; 		// Rails ==> Question.create() or Question.all.first

//// To do:
// Hide "Add Question" functionality  
// Add "Add Question" button
// 


$(document).ready(function(){

	// Initially hide edit/delete/save buttons 
	$('.edit-btns').hide();
	$('.delete-btns').hide();
	$('.save-btns').hide();
	$('#add-question').hide(); 
	$('#append-edited-q').hide();

	// Setup jQuery UI sortable/draggable
	$('#sortable-container').sortable({
		stop: function(){
			var questionsInOrder = $('.draggable');
			for (var i = 0; i < questionsInOrder.length; i++) {
				$(questionsInOrder[i]).find('.dyn-num').html(i+1);
			}
		}
	});

	// Click "Edit App" button
	$('#edit-app-btn').on('click', function() {
		$('.edit-btns').show();
		$('.delete-btns').show();
		$('#edit-app-btn').hide(); 
		$('<button type="button" class="btn btn-default" id="save-app-btn">Save</button>').appendTo('#sortable-container');
		$('#add-question').show(); 
	});

	// Click "Edit Question #1" button
	$('#edit-1').on('click', function() {
		$('#append-edited-q').show();

		$('#q1').hide();
		$('.edit-btns').hide();
		$('.delete-btns').hide();
		$('.save-btns').show();
		// Create input box to edit question name:
		$('<p>Edit Question:</p><input type="text" placeholder="Name:" id="q1-text-edit">').prependTo('#append-edited-q');
		// Select question type
		$('#append-edited-q').append('<br><br><p>Question Type: </p><div><radiogroup><input type="radio" name="question-type" value="dropdown" id="dropdown-selected"> Dropdown</input><br><input type="radio" name="question-type" value="text-box" id="text-area-selected"> Text Box</input><br><input type="radio" name="question-type" value="radio-buttons" id="radio-selected"> Radio Buttons</input><br><input type="radio" name="question-type" value="checkboxes" id="checkbox-selected"> Checkboxes</input></radiogroup></div><br>'); 

		// if select "dropdown"
		$('#dropdown-selected').on('click', function() {
			Questions[0].questionType = 'dropdown';
			$('#dropdown-type').removeClass('hide');
			$('#dropdown-type').show("slow"); 
			// hide other 3 options
			$('#text-area-type').addClass('hide');
			$('#radio-type').addClass('hide');
			$('#checkbox-type').addClass('hide');
		});
		
		// if select "textbox"
		$('#text-area-selected').on('click', function() {
			Questions[0].questionType = 'textarea';
			console.log('Text box selected');
			$('#text-area-type').removeClass('hide');
			$('#text-area-type').show("slow"); 
			// hide other 3 options
			$('#dropdown-type').addClass('hide');
			$('#radio-type').addClass('hide');
			$('#checkbox-type').addClass('hide');
		});

		// if select "checkboxes"
		$('#radio-selected').on('click', function() {
			Questions[0].questionType = 'radio';
			console.log('Radio selected');
			$('#radio-type').removeClass('hide');
			$('#radio-type').show("slow"); 
			// hide other 3 options
			$('#text-area-type').addClass('hide');
			$('#dropdown-type').addClass('hide');
			$('#checkbox-type').addClass('hide');
		});

		// if select "radio"
		$('#checkbox-selected').on('click', function() {
			Questions[0].questionType = 'checkbox';
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
			// find the num selected
			var drpdwnNumOptions = $("#dropdown-num-selected :selected").val();
			Questions[0].dropdownOptionsNum  = drpdwnNumOptions;
			Questions[0].dropdownOptions = [];
			console.log(drpdwnNumOptions);
			// append the amount of text boxes (with ID) and a submit button
			for (var i = 0; i < drpdwnNumOptions; i++) {
				$('#dropdown-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
			}

			// ?? Appending two submit buttons ?? 
			$('#dropdown-type').append("<button type='button' class='btn btn-default' id='dropdown-options-text-submit'>Submit</button>");

			// Capture answers for dropdown upon click of submit button
			$('#dropdown-options-text-submit').on('click', function() {
				// Capture vals of text boxes
				// Set them as options for the dropdown
				$('.dynamic-text-box').each(function(i, el) {
					Questions[0].dropdownOptions.push($(el).val());
				});
				generateForm(Questions[0]);
			});
		});

		// Radio buttons: fill in options 
		$('#radio-num-options-submit').on('click', function() {
			// remove any already-created text boxes first
			$('.dynamic-text-box').remove();
			// find the num selected
			var radioNumOptions = $("#radio-num-selected :selected").val();
			Questions[0].radioOptionsNum  = radioNumOptions;
			Questions[0].radioOptions = [];
			console.log(radioNumOptions);
			// append the amount of text boxes (with ID) and a submit button
			for (var i = 0; i < radioNumOptions; i++) {
				$('#radio-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
			}

			$('#radio-type').append("<button type='button' class='btn btn-default' id='radio-options-text-submit'>Submit</button>");

			// Capture answers for radio upon click of submit button
			$('#radio-options-text-submit').on('click', function() {
				// Capture vals of text boxes
				// Set them as options for the radio
				$('.dynamic-text-box').each(function(i, el) {
					Questions[0].radioOptions.push($(el).val());
				});

				generateForm(Questions[0]);
			});
		});

		// Checkbox buttons: fill in options 
		$('#checkbox-num-options-submit').on('click', function() {
			// remove any already-created text boxes first
			$('.dynamic-text-box').remove();
			// find the num selected
			var checkboxNumOptions = $("#checkbox-num-selected :selected").val();
			Questions[0].checkboxOptionsNum  = checkboxNumOptions;
			Questions[0].checkboxOptions = [];
			console.log(checkboxNumOptions);
			// append the amount of text boxes (with ID) and a submit button
			for (var i = 0; i < checkboxNumOptions; i++) {
				$('#checkbox-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
			}

			$('#checkbox-type').append("<button type='button' class='btn btn-default' id='checkbox-options-text-submit'>Submit</button>");

			// Capture answers for checkbox upon click of submit button
			$('#checkbox-options-text-submit').on('click', function() {
				// Capture vals of text boxes
				// Set them as options for the checkbox
				$('.dynamic-text-box').each(function(i, el) {
					Questions[0].checkboxOptions.push($(el).val());
				});

				generateForm(Questions[0]);
			});
			
		});
	}); // end 'click edit question #1'



	// Save the edited name of question #1
	$('#save-1').on('click', function() {
		var q1_edit = $('#q1-text-edit').val();
		// alert(q1_edit); 

	});



///////////////////////////////////////////////////////


	// Hide all elements except div#question-label
	$('.hide').hide();

	////////////////////////////////////////
	
	// Capture question name upon submit
	$('#question-label-submit').on('click', function() {
		Questions[0].questionName = $('#question-name-text').val();
	});

	// Choose question input type 
	$('#question-label-submit').on('click', function() {
		$('#question-type').removeClass('hide');
		$('#question-type').show("slow");
	});

	// Show selected input type / hide other options
	$('#dropdown-selected').on('click', function() {
		Questions[0].questionType = 'dropdown';
		console.log('Dropdown selected');
		$('#dropdown-type').removeClass('hide');
		$('#dropdown-type').show("slow"); 
		// hide other 3 options
		$('#text-area-type').addClass('hide');
		$('#radio-type').addClass('hide');
		$('#checkbox-type').addClass('hide');
	});

	$('#text-area-selected').on('click', function() {
		Questions[0].questionType = 'textarea';
		console.log('Text box selected');
		$('#text-area-type').removeClass('hide');
		$('#text-area-type').show("slow"); 
		// hide other 3 options
		$('#dropdown-type').addClass('hide');
		$('#radio-type').addClass('hide');
		$('#checkbox-type').addClass('hide');
	});

	$('#radio-selected').on('click', function() {
		Questions[0].questionType = 'radio';
		console.log('Radio selected');
		$('#radio-type').removeClass('hide');
		$('#radio-type').show("slow"); 
		// hide other 3 options
		$('#text-area-type').addClass('hide');
		$('#dropdown-type').addClass('hide');
		$('#checkbox-type').addClass('hide');
	});

	$('#checkbox-selected').on('click', function() {
		Questions[0].questionType = 'checkbox';
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
		// find the num selected
		var drpdwnNumOptions = $("#dropdown-num-selected :selected").val();
		Questions[0].dropdownOptionsNum  = drpdwnNumOptions;
		Questions[0].dropdownOptions = [];
		console.log(drpdwnNumOptions);
		// append the amount of text boxes (with ID) and a submit button
		for (var i = 0; i < drpdwnNumOptions; i++) {
			$('#dropdown-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
		}

		$('#dropdown-type').append("<button type='button' class='btn btn-default' id='dropdown-options-text-submit'>Submit</button>");

		// Capture answers for dropdown upon click of submit button
		$('#dropdown-options-text-submit').on('click', function() {
			// Capture vals of text boxes
			// Set them as options for the dropdown
			$('.dynamic-text-box').each(function(i, el) {
				Questions[0].dropdownOptions.push($(el).val());
			});

			generateForm(Questions[0]);
		});
		
	});

	// Radio buttons: fill in options 
	$('#radio-num-options-submit').on('click', function() {
		// remove any already-created text boxes first
		$('.dynamic-text-box').remove();
		// find the num selected
		var radioNumOptions = $("#radio-num-selected :selected").val();
		Questions[0].radioOptionsNum  = radioNumOptions;
		Questions[0].radioOptions = [];
		console.log(radioNumOptions);
		// append the amount of text boxes (with ID) and a submit button
		for (var i = 0; i < radioNumOptions; i++) {
			$('#radio-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
		}

		$('#radio-type').append("<button type='button' class='btn btn-default' id='radio-options-text-submit'>Submit</button>");

		// Capture answers for radio upon click of submit button
		$('#radio-options-text-submit').on('click', function() {
			// Capture vals of text boxes
			// Set them as options for the radio
			$('.dynamic-text-box').each(function(i, el) {
				Questions[0].radioOptions.push($(el).val());
			});

			generateForm(Questions[0]);
		});
		
	});

	// Checkbox buttons: fill in options 
	$('#checkbox-num-options-submit').on('click', function() {
		// remove any already-created text boxes first
		$('.dynamic-text-box').remove();
		// find the num selected
		var checkboxNumOptions = $("#checkbox-num-selected :selected").val();
		Questions[0].checkboxOptionsNum  = checkboxNumOptions;
		Questions[0].checkboxOptions = [];
		console.log(checkboxNumOptions);
		// append the amount of text boxes (with ID) and a submit button
		for (var i = 0; i < checkboxNumOptions; i++) {
			$('#checkbox-type').append("<textarea class='dynamic-text-box' id='box"+ i +"'</textarea>");
		}

		$('#checkbox-type').append("<button type='button' class='btn btn-default' id='checkbox-options-text-submit'>Submit</button>");

		// Capture answers for checkbox upon click of submit button
		$('#checkbox-options-text-submit').on('click', function() {
			// Capture vals of text boxes
			// Set them as options for the checkbox
			$('.dynamic-text-box').each(function(i, el) {
				Questions[0].checkboxOptions.push($(el).val());
			});

			generateForm(Questions[0]);
		});
		
	});


}); //end document ready fxn

// produces question upon submit
function generateForm(data) {
	var questionString = '';

	if (data.questionType === 'dropdown') {
		
		questionString += '<p>' + data.questionName + '</p>';
		questionString += '<select id="dynamic-last-select">'
		
		for (var i = 0; i < data.dropdownOptions.length; i++) {
			questionString += '<option val="'+data.dropdownOptions[i]+'">' + data.dropdownOptions[i] + '</option>';
		}

		questionString += '</select><br><br><button id="dynamic-last-button">Done</button>';

		$('body').on('click', '#dynamic-last-button', function(){
			alert('you selected ' + $("#dynamic-last-select :selected").val());
		});

	} else if (data.questionType === 'textarea') {

	} else if (data.questionType === 'checkbox') {

		questionString += '<p>' + data.questionName + '</p>';
		
		for (var i = 0; i < data.checkboxOptions.length; i++) {
			questionString += '<input class="dynamic-input" type="checkbox" value="'+data.checkboxOptions[i]+'"> ' + data.checkboxOptions[i] + '</input><br/>';
		}

		questionString += '</select><br><br><button id="dynamic-last-button">Done</button>';

		$('body').on('click', '#dynamic-last-button', function(){
			var boxes = $("input[type='checkbox'].dynamic-input:checked");
			result = [];
			for (var i = 0; i < boxes.length; i++) {
				result.push(boxes[i].value);
			};
			alert('you selected ' + result.join(', '));
		});

	} else if (data.questionType === 'radio') {
		questionString += '<p>' + data.questionName + '</p>';
		
		for (var i = 0; i < data.radioOptions.length; i++) {
			questionString += '<input class="dynamic-input" type="radio" name="radio-option" value="'+data.radioOptions[i]+'"> ' + data.radioOptions[i] + '</input><br/>';
		}

		questionString += '</select><br><br><button id="dynamic-last-button">Done</button>';

		$('body').on('click', '#dynamic-last-button', function(){
			alert('you selected ' + $("input[type='radio'].dynamic-input:checked").val());
		});

	}

	$('#dynamic-form-container').append(questionString);
}