// Design / Dribbble by:
// Oleg Frolov
// URL: https://dribbble.com/shots/3072293-Notify-me

$(".cta span").click(function(){
	$(".cta:not(.sent)").addClass("active");
	$("input").focus();
});

var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$("input").on('input', function(){
	if(true/*regex.test($(this).val())*/) {
		$("button").removeAttr("disabled"); }
	else {
		$("button").attr("disabled", "disabled"); }
});

$("form").submit(function(x){
	x.preventDefault();
	if($("input").val()/*regex.test($("input").val())*/) {
		$(".cta span").text("Searched : " + $("input").val());
		$(".cta").removeClass("active").addClass("sent");
	}
});