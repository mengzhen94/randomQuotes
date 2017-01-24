function inIframe () { 
	try { return window.self !== window.top; } 
	catch (e) {return true; }
}

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', 
			'#e74c3c', '#9b59b6', '#FB6964', 
			'#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote(){
	$.ajax({
		url:'http://quotes.stormconsultancy.co.uk/random.json',
		success: function(response) {
			currentQuote = response.quote;
			currentAuthor = response.author;
			if(inIframe()){
        		$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      		}
			$( ".quote-text" ).animate({
    			opacity: 0
  			}, 500, function() {
  				$(this).animate({
            		opacity: 1
         		 }, 500);
    			$('#text').text(currentQuote);
			});
			$( ".quote-author" ).animate({
    			opacity: 0
  			}, 500, function() {
  				$(this).animate({
            		opacity: 1
         		 }, 500);
    			$('#author').text(currentAuthor);
			});
			var color = Math.floor(Math.random() * colors.length);
			$("body").animate({
        		backgroundColor: colors[color],
        		color: colors[color]
      		}, 1000);
      		$(".button").animate({
        		backgroundColor: colors[color]
      		}, 1000);

		}
	});
}
$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click',getQuote);
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' 
      	+ encodeURIComponent( currentQuote  + currentAuthor));
    }
  });
});
