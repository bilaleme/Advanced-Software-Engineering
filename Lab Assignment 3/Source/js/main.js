//Google knowledge base
//https://kgsearch.googleapis.com/v1/entities:search?query=taylor+swift&key=AIzaSyDpcq4MWfxC576c_8WSQikWbK-duzkYt4I	&limit=1&indent=True


function getOAuth(){
	window.fbAsyncInit = function() {
		FB.init({
			appId : '1791560551169849',
			xfbml : true,
			version : 'v2.8'
		});
		FB.AppEvents.logPageView();
		

		if(page != 'index.html'){
			FB.login(function(response){
				if(response.status === 'connected'){
					
				} else {
					window.location = 'index.html'
				}
			});
		}
		
	};
	
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	
	
}

function Login(){
	FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
		    uid = response.authResponse.userID;
		    accessToken = response.authResponse.accessToken;
		    window.location='index-mash.html';
		  } else {
			  FB.login(function(response){
				  if(response.authResponse){
					  window.location = 'index-mash.html';
				  } else
					  {
					  window.location = 'index.html';
					  }
			  });
			  
			  
		  }
		 });
}

$(document).ready(function() {
	getOAuth();
});