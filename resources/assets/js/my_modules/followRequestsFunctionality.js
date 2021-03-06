/*eslint no-console: */
let followRequestsNumber = null;

export default function followRequestsFunctionality(){
	const axios = window.axios;
	const M = window.M;
	//  follow Requests Modal modal init start
	$('.followRequestsModal').modal({
		onOpenStart: () => {
			axios.post('/show/follow-Requests')
				.then(success => {                     
					success.data.forEach(user => {
						// console.log(user)
						$('#usersRequestedToFollowYou').append(`
                        <section id="usersRequestedToFollowYouData">                    
                            <div class="card deep-orange lighten-2 black-text" data-username="${user.user.name}">
                            <div class="card-content">
                                <ul class="collection  deep-orange lighten-2 commentCollectionRemoveUl">
                                    <li class="collection-item avatar deep-orange lighten-2 commentCollectionRemoveUl ${user.user.id}-userRequest">
                                        <img src="${user.user.image}" alt="user image" class="circle">
                                        <span class="title strongChips searchFollowRequestsBasedOnNames" id="${user.user.name}">${user.user.name}</span>
                                        <p>sent you a request</p>
                                        <a href="/${user.user.name}" target="_blank" class="secondary-content"><i class="material-icons blue-grey-text text-darken-4">account_box</i></a>
                                    </li>
                                </ul>
                                <button class="aprroveFollowRequestButtons btn-floating btn-large waves-effect waves-light light-blue darken-3 z-depth-5" id="${user.user.id}-${user.user.name}-approve">
                                    <i class="material-icons">check</i>
                                </button>
                                <button class="declineFollowRequestButtons btn-floating btn-large waves-effect waves-red  red accent-2 userInfoRevealCard z-depth-5" id="${user.user.id}-${user.user.name}-delete"><i class="material-icons">clear</i></button>
                            </div>
                            <div class="card-tabs">
                                <ul class="tabs tabs-fixed-width tabs-transparent">
                                <li class="tab"><a href="#${user.user.id}aboutTheUserWhoSentRequest">About</a></li>
                                <li class="tab"><a class="active" href="#${user.user.id}whenTheRequestHaveBeenSent">When</a></li>
                                </ul>
                            </div>
                            <div class="card-content deep-orange lighten-1 userRequest-tabs-${user.user.id}">
                                <div id="${user.user.id}aboutTheUserWhoSentRequest" class="truncate">${user.user.about}</div>
                                <div id="${user.user.id}whenTheRequestHaveBeenSent">${user.created_at}</div>
                            </div>
                            </div>
                            </section>
                        `);
					});
					$('.tabs').tabs(); // for the tabs, for each user
					followRequestsNumber = success.data.length;
					$('#numberOfFollowRequests').html(`Follow requests ${success.data.length}`);
					$('#preloaderfollowRequestsModal').hide();
					aprroveFollowRequest();  
					declineFollowRequest();
					searchFollowRequests(); // need to be here beacuse of the promise (if this is out side the then promiss it will load empty array)
				})
				.catch(error => {
					console.log(error);
					M.toast({html: 'something went wrong 🤖', classes: 'red accent-3'});
				});
                
		},
		onCloseEnd: () => {
			$('#followRequestsModal').html(`
                <div class="row">
                <div class="input-field col s12 m12">
                    <i class="material-icons prefix grey-text text-lighten-3">search</i>
                    <input id="searchFollowRequests" type="text">
                    <label for="searchFollowRequests">Filter by first name</label>
                </div>
            </div>    
            <div class="modal-content white-text">
                <h4 id="numberOfFollowRequests">Follow requests</h4>
                <section id="usersRequestedToFollowYou">
        
                <div class="preloader-wrapper big active" id="preloaderfollowRequestsModal">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            
                </section>
            </div>
            <div class="modal-footer blue-grey darken-4">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat white-text">Dismiss</a>
            </div>
            `);
		}
	});
	//  follow Requests Modal modal end
    
}

function aprroveFollowRequest(){
	const axios = window.axios;
	const M = window.M;
	// if you use arrow function here,
	// you will not get the id !!!!!
	$('.aprroveFollowRequestButtons').on('click',function(){
		// console.log( $( this ).attr('id') ) 
		let [userId, userName] = $( this ).attr('id').split('-');
		// console.log(userId, userName)
		$(this).addClass('disabled');
		// $(`#${userId}.${userName}.delete`).addClass('disabled')
		$(this).next().addClass('disabled'); // disable the delete button
		axios.post('/approve/follow', {
			from_id : userId
		})
			.then(success => {
				// console.log(success)
				// console.log(`#${userId}.${userName}.delete`)
				$(this).hide();
				$(this).next().hide(); // hiding the delete button
				M.toast({html: `${success.data.success} ${userName}`, classes: 'rounded light-blue accent-4'});
				updateFollowRequestNumbers();
				// $(`.userRequest-${userId}`).removeClass('deep-orange lighten-2').addClass('light-blue lighten-2')
				chagneColorBasedOnResult(true, userId);
			})
			.catch(error => {
				$(this).removeClass('disabled');
				$(this).next().removeClass('disabled');
				console.log(error);
				M.toast({html: 'Something went wrong 🤖', classes: 'rounded red lighten-2'});
				// $(`.userRequest-${userId}`).removeClass('deep-orange lighten-2').addClass('red lighten-2')
				chagneColorBasedOnResult(false, userId);
			});
	});
}

function declineFollowRequest(){
	const axios = window.axios;
	const M = window.M;
	// if you use arrow function here,
	// you will not get the id !!!!!
	$('.declineFollowRequestButtons').on('click',function(){
		// console.log( $( this ).attr('id') ) 
		let [userId, userName] = $( this ).attr('id').split('-');
		// console.log(userId, userName)
		$(this).addClass('disabled');
		$(this).prev().addClass('disabled'); // disable the approve button
		axios.post('/decline/follow', {
			from_id: userId
		})
			.then(success => {
				$(this).hide();
				$(this).prev().hide();
				M.toast({html: `${success.data.success} ${userName}`, classes: 'rounded light-blue accent-44'});
				updateFollowRequestNumbers();
				// $(`.userRequest-${userId}`).removeClass('deep-orange lighten-2').addClass('light-blue lighten-2')
				chagneColorBasedOnResult(true, userId, true);
			})
			.catch(error => {
				$(this).removeClass('disabled');
				$(this).prev().removeClass('disabled');
				console.log(error);
				M.toast({html: 'Something went wrong 🤖', classes: 'rounded red lighten-2'});
				// $(`.userRequest-${userId}`).removeClass('deep-orange lighten-2').addClass('red lighten-2')
				chagneColorBasedOnResult(false, userId);
			});
	});
}

function updateFollowRequestNumbers(){
	$('#numberOfFollowRequests').html(`Follow requests ${followRequestsNumber - 1}`);
	$('.updateFollowRequestsNumber').html(`${followRequestsNumber - 1}`);
	followRequestsNumber--;
}

function chagneColorBasedOnResult(result, userId, decline = false){
	$(`.userRequest-${userId}`).removeClass('deep-orange lighten-2' ).addClass((result) ? (decline) ?  'purple accent-2' : 'light-blue lighten-2' :'red lighten-2');
	$(`.userRequest-tabs-${userId}`).removeClass('deep-orange lighten-1').addClass((result) ? (decline) ? 'purple accent-1' : 'light-blue lighten-1' :'red lighten-1');
}


function searchFollowRequests(){
	let followRequestUserNsmes = []; 
	$('.searchFollowRequestsBasedOnNames').each(function(i, obj) {
		followRequestUserNsmes.push(obj.innerHTML);
	});
	$(document).on('keyup', '#searchFollowRequests', function(){
		let input = $('#searchFollowRequests');
		followRequestUserNsmes.forEach(name => {
			let x = name.toUpperCase(),
				y = input.val().toUpperCase();
			if((x.indexOf(y) > -1 ) && input.val() ) {
				// console.log(`${name} !== ${$('#searchFollowRequests').val()}`) 
				$('#usersRequestedToFollowYou').find(`div[data-username='${name}']`).fadeIn();
			}else if(! input.val() ){
				$('#usersRequestedToFollowYou').find(`div[data-username='${name}']`).fadeIn();
			}else {
				$('#usersRequestedToFollowYou').find(`div[data-username='${name}']`).fadeOut();
			}
		});
	});
}

 