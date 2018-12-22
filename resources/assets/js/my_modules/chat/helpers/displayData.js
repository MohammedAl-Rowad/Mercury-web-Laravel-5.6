export const displayUsers = (names, displayUsersHere) => {
	for (const user of names) {
		displayUsersHere.append(`
		<ul class="collection msgUser clickable hoverable mt-0" data-user="${user.name}" data-image="${user.image}">
		<li class="collection-item avatar grey darken-1">
		  <img src="${ user.image }" alt="" class="circle">
		  <time class="title">${ user.name}</time>
		  <p>
			USER_MSG
		  </p>
		  <!-- here number -->
		</li>
	  </ul>
		`);
		// <span class="new badge" data-badge-caption="custom caption">4</span>
	}
};

export const someoneIsShy = displayUsersHere => {
	displayUsersHere.html(`
	<ul class="collection msgUser clickable hoverable mt-0">
	<li class="collection-item avatar grey darken-1">
	  <img src="/images/happy.png" alt="" class="circle">
	  <p class="white-text">
		Someone is shy
	  </p>
	</li>
  </ul>
	`);
};


export const displayMessages = (msg, image,addMessagesHere ) => {
	addMessagesHere.append(`
	<div class="row">
	  <ul class="collection z-depth-5 animated flash ${msg.from_id === +$('#authUserIdForNotify').val() ? 'msgPopUpMe' : 'msgPopUp'}">
		<li class="collection-item avatar  grey darken-4">
		  <img src="${image}" alt="" class="circle">
		  <time class="title">${msg.created_at}</time>
		  <p>
			${msg.body}
		  </p>
		</li>
	  </ul>
	</div>
		`);
};