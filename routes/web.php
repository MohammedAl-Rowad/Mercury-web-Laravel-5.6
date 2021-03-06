<?php

// loads the landaing page
Route::get('/', 'HomeController@welcome')->name('wlcome');

Auth::routes();

// loads the homr page after the user logged in
Route::get('/home', 'HomeController@index')->name('home');

// loads posts VIA AJAX
Route::post('/home/loadMorePosts', 'HomeController@loadMorePosts')->name('loadMorePosts');

// show a single post for visitor & user
Route::get('/show/post/{post}', 'PostController@show')->name('showPost');

// display the posts for a visitor
Route::get("/posts", "PostController@showWithNoAuth")->name('showPostsNoAuth');

// loads more posts for a visitor // TODO :: might make them in the same function 'controller function'
Route::post("/show/all/postsNoAuth", "PostController@loadMorePostsNoAuth")->name('loadshowPostsNoAuth');

// adds a post to the wish list
Route::post("/addToWishList/{post}", "WishController@addPostToWishList")->name('addPostToWishList');

// deleting a wish // TODO :: make the request delete , it won't work now because of PostFunctionalities line 24 logic
Route::post("/deleteWishedPost/{post}", "WishController@deleteWish")->name('deleteWish');

// show the wished posts
Route::post("/wishedPosts", "WishController@showWishedPosts")->name('showWishedPosts');

// adding a comment
Route::post("/post/{post}/addComment", "CommentController@addComment")->name('addComment');

// displaying ta user profile
Route::get("/{user}", "UserController@profile")->name('profile');

// checking for a new follow requests
// opens a modal
Route::post("/show/follow-Requests", "UserController@showFollowingRequests")->name('showFollowingRequests');

// approve the follow request
Route::patch("/approve/follow", "UserController@approveFollow")->name('approveFollow');

// decline the follow request http request
Route::delete("/decline/follow", "UserController@declineFollow")->name('declineFollow');

// getting all the followers
Route::post("/user/followers", "UserController@seeFollowers")->name('seeFollowers');

// // unFollow the user from the profile page
// Route::post("/unFollow", "UserController@unFollow")->name('unfollow');

// // Follow the user from profile page
// Route::post("/Follow", "UserController@follow")->name('follow');

// cancel the follow from the profile page
Route::delete("/cancelFollow", "UserController@cancelFollow")->name('cencelFollowRequest');

// Follow the user from profile page
Route::post("/followUser", "UserController@followUser")->name('followUser');

// unFollow the user from the profile page
Route::delete("/unfollowUser", "UserController@unfollowUser")->name('unfollowUser');

// get a user's posts from sortShowUserPosts page
Route::get('/posts/{user}', "PostController@DescendingNAvailable")->name('allUserPosts'); // old name is allUserPosts

// get all the user followers
Route::post('/user/following', "UserController@seeTheUsersYouAreFollowing")->name('seeTheUsersYouAreFollowing');

// 6 routes for sorting the data with pagination from sortShowUserPosts page
// this in not good
// DRY
Route::prefix('/posts/{user}')->group(function () {
    Route::get('/DescendingNAvailable', "PostController@DescendingNAvailable")->name('DescendingNAvailable');
    Route::get('/AscendingNAvailable', "PostController@AscendingNAvailable")->name('AscendingNAvailable');
    Route::get('/DescendingNArchived', "PostController@DescendingNArchived")->name('DescendingNArchived');
    Route::get('/AscendingNArchived', "PostController@AscendingNArchived")->name('AscendingNArchived');
    Route::get('/commentsNAvailable', "PostController@commentsNAvailable")->name('commentsNAvailable');
    Route::get('/commentsNArchived', "PostController@commentsNArchived")->name('commentsNArchived');
});

Route::post('/show/user/posts/profile', 'PostController@loadUserPosts')->name('loadUserPosts');

Route::get('user/getChatNames', "ChatController@getNames");
Route::view('/user/chat', 'user.chat.chat')->name('openChat')->middleware('auth');
Route::get('/user/chat/{name}', 'ChatController@getMessages');

Route::get('/json/{json}', 'HomeController@particles');
Route::get('/search/posts/{keyword?}', 'PostController@getPostdataExchangeRequest');
Route::post('/sendExchangeRequest', 'UserController@sendExchangeRequest');

Route::post('/exchangeRequest/loadMore', 'UserController@exchangeRequestLoadMore')->name('exchangeRequestLoadMore');

Route::prefix('/show/exchangeRequests')->group(function () {
    Route::get('/', 'UserController@seeExchangeRequest')->name('exchangeRequest');
    Route::middleware(['onlyAjax'])->group(function () {
        Route::get('/DESC', 'UserController@seeExchangeRequestDESC');
        Route::get('/ASC', 'UserController@seeExchangeRequestASC');
    });
    Route::patch('/accept', 'UserController@acceptExchangeRequest');
    Route::delete('/delete', 'UserController@deleteExchangeRequest');
});

Route::prefix('/register')->group(function () {
    Route::get('/user/{name?}', 'registerValidation@chackName');
    Route::get('/email/{email?}', 'registerValidation@checkEmail');
});

Route::get('/review/users', 'UserController@reviewPage')->name('review');
Route::post('/addReview', 'UserController@addReview');

Route::prefix('/realTime')->group(function () {
    Route::get('get/user/{id}', 'RealTimeController@getUser');
});

Route::view('/add/post', 'user.post.add')->middleware('auth')->name('addPost');
Route::get('/get/tags', 'PostController@getTags');
Route::post('/new/post', 'PostController@newPost');

/**
 * Your Route Mohammed !
 */
Route::get('/search/all', 'UserController@searchPage')->name('search');

use Illuminate\Support\Facades\Input;
use Mercury\Post;
Route::get('/posts/search/cus', function () {

    $q = Input::get('q');
    $posts = Post::where('body', 'LIKE', "%{$q}%")->take(10)->get();
    $data = [
        'posts' => $posts,
    ];
    return view('visitor.showAllPosts')->with($data);
});

Route::get('/testing/now', function () {
    return Mercury\ExchangeRequest::dataForTheExchangeRequstsView();
});

Route::post('/message', 'ChatController@addMessage');
