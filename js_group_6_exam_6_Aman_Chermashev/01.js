var lastDateTime = null;
var myLink = 'http://146.185.154.90:8000/blog/bakytaman228337@gmail.com/'
var editFirstName = $('#editFirstName');
var editLastName = $('#editLastName');	
var renderOnPage = function(arr) {
	for(var i = 0; i < arr.length; i++){
			var card = $('<div class="card">');
		var cardBody = $('<div class="card-body">');
		var cardHeader = $('<div class="card-header">' + arr[i].user.firstName + ' ' + arr[i].user.lastName + '</div>');
		var cardText = $(' <p class="card-text">' + arr[i].message + '</p>');
		cardBody.html(cardText);
		card.append(cardHeader, cardBody);
		$('#posts').prepend(card);
		}
}

$(function(){
	$.ajax({
		method: 'GET',
		url: myLink + 'profile',
	}).then(function(response){
		var getName = response.firstName + ' ' + response.lastName;
		$('#name').append(getName);
	});

	
		$.ajax({
		method: 'GET',
		url: myLink + 'posts'
	}).then(function(response){
		renderOnPage(response);	
		lastDateTime = response[response.length -1].datetime;
		setInterval(function(){
			$.ajax({
				method: 'GET',
				url: myLink + 'posts?datetime=' + lastDateTime,
			}).then(function(result){
				console.log(result)
				if(result.length > 0){
			renderOnPage(result);
			lastDateTime = result[result.length -1].datetime;
		}
			})
			
		}, 2000)
		
	})
	
	
});



$('#post').click(function(){
	if ($('.newPost').val !== '') {
		$.ajax({
			method: 'POST',
			url: myLink + 'posts',
			data: {message: $('.newPost').val(),},
			dataType: "text",
		})
	} else {alert('You did not enter anything!')
	}		
	});
$('#saveNewName').click(function(){
	if (editFirstName.val() == '' || editLastName.val() == '') { 
		alert('Please, enter Your new first name and last name ');
	} else{ 
		$('#name').text(editFirstName.val() + " " + editLastName.val());
		$.ajax({
		method: 'POST',
		url: myLink + 'profile',
		data: {
			firstName: editFirstName.val(),
			lastName: editLastName.val(),
		}
	});
		}
	
});
$('#follow').click(function(){
	if ($('#newUserName').val() !== '') {
		$.ajax({
		method: 'POST',
		url: myLink + 'subscribe',
		data: {email: $('#newUserName').val()}
	})
	} else {alert('You did not enter anything')}
	
})

