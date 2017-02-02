function submitClick() {
	localStorage.firstName = "BilalAhmad";
	localStorage.lastName = "Country";
	localStorage.fname = $("#fname").val();
	localStorage.sname = $("#sname").val();
	localStorage.uname = $("#uname").val();
	localStorage.pass = $("#pass").val();
	localStorage.email = $("#email").val();
	localStorage.cell = $("#cell").val();
	
	
	$('#uInfo').html(
			'Registration Complete'+'<br><br>User Name : ' + $('#uname').val() + '<br>Last Name : '
					+ $('#sname').val() + '<br>First Name : '
					+ $('#fname').val() + '<br>Email : '
					+ $('#email').val() + '<br>Cell Number : '
					+ $('#cell').val());

}
