export default function profileFollowFunctions(){
	$('.modal').modal();
	// still not working ....
	if($('#sendConfirmed').length) {
		$('#sendConfirmed').click(()=>{
			$('#sendConfirmed').addClass('disabled');
		});
	}
	if($('#cancelConfirmed').length) {
		$('#cancelConfirmed').click(()=>{
			$('#cancelConfirmed').addClass('disabled');
		});
	}
	if($('#unFollowConfirmed').length) {
		$('#unFollowConfirmed').click(()=>{
			$('#unFollowConfirmed').addClass('disabled');
		});
	}
}
