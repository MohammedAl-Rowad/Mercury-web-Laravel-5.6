/*eslint no-console: */

export default function sendExchangeRequestInit(){
	const axios = window.axios;
	const M = window.M;
	// let username = $('#authUserName').val();
	$('#sendExchangeRequestModal').modal({
		onOpenEnd: () => {
			let search = $('#searchFilter-postsExchangeRequest'),
				keyword = $('#searchFilter-postsExchangeRequest').val();
			search.keyup(()=>{
				keyword = search.val();
			});
            
			$('#searchPostsSendExchangeRequestModal').click(()=>{
				appendPreLoaderCardsPostsExchangeRequests();
				$('#searchPostsSendExchangeRequestModal').addClass('disabled');
				if(keyword.length !== 0){
					axios.get(`/search/posts/${keyword}`)
						.then(success => {
							// console.log(success.data.length,typeof success.data)
							if(success.data.length === undefined){
								let str = success.data.header.replace('\'', '\\\'');
								if($(`span[data-header='${str}']`).length){
									M.toast({html: 'already got that 🤖', classes: 'rounded'});
									removePreLoaderCardsPostsExchangeRequests();
									$('#searchPostsSendExchangeRequestModal').removeClass('disabled');
								}else {
									// $("#searchPostsSendExchangeRequestModal").off('click')
									// $(".sendExchangeRequestWithThisId").off('click')
									removePreLoaderCardsPostsExchangeRequests();
									$('#addExchangeRequestPostsCards').append(`
                                    <div class="col s12 m6">
                                        <div class="card blue-grey darken-3 hoverable z-depth-5">
                                            <div class="card-content white-text">
                                                <span class="card-title" data-header="${success.data.header}">${success.data.header}</span>
                                            </div>
                                            <div class="card-action">
                                                <a class="sendExchangeRequestWithThisId waves-effect waves-light btn blue-grey darken-1 hoverable" id="sendExchangeRequestWithThisId-${success.data.id}">Choose This !</a>
                                            </div>
                                        </div>
                                    </div>
                                `);
									$('#searchPostsSendExchangeRequestModal').removeClass('disabled');
									// $('.sendExchangeRequestWithThisId').off('click')
									sendExchangeRequest();
								}
							} else {
								removePreLoaderCardsPostsExchangeRequests();
								$('#searchPostsSendExchangeRequestModal').removeClass('disabled');
								M.toast({html: 'Nothing found 🤖', classes: 'rounded'});
							}
						}).catch(error => {
							console.log(error);
						}); 
				}
			});
		},
		onCloseStart: () => {
			$('#searchPostsSendExchangeRequestModal').removeClass('disabled');
			$('#searchPostsSendExchangeRequestModal').off('click');
			$('#exchangeRequestCardsPostsPreLoader').parent().remove();
			// $(".sendExchangeRequestWithThisId").off('click')
		}
	});
	$('#sendExchangeRequestTrigger').click(()=>{  
		let themModal = $('#sendExchangeRequestModal');
		M.Modal.getInstance(themModal).open();
	});
    
}
function appendPreLoaderCardsPostsExchangeRequests(){
	$('#addExchangeRequestPostsCards').append(
		`
        <div class="col s12 m6">
            <div class="progress" id="exchangeRequestCardsPostsPreLoader">
                <div class="indeterminate"></div>
            </div>
        </div>
        `
	);
}
function removePreLoaderCardsPostsExchangeRequests(){
	if($('#exchangeRequestCardsPostsPreLoader').length)
		$('#exchangeRequestCardsPostsPreLoader').parent().remove();
}
function sendExchangeRequest(){
	const axios = window.axios;
	const M = window.M;
	$('.sendExchangeRequestWithThisId').on('click', e => {
		const [, onwer_post_id] = e.target.id.split('-');
		const userId = $('.selectMeuseridpost').attr('data-useridpost');
		axios.post('/sendExchangeRequest', {
			user_post_id: $('#showPostId').text(), // the post for the user who recieved the request
			owner_post_id:onwer_post_id, // the offerd Post
			user_id: userId // who recived the request
		}).then(success => {
			// console.log(success.data)
			$(e.target).addClass('disabled');
			M.toast({html: `${success.data.message}`, classes: 'rounded'});
		}).catch(err => {
			console.log(err);
			M.toast({html: 'Something went wrong 🤖', classes: 'rounded'});
		});
		// console.log(e.target.id)
		// console.log("postId => ", postId, " theAuthUserIdPost =>", theAuthUserIdPost)
	});
}
