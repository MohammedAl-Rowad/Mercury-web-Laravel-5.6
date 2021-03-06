<!-- If Not profile display them on top each other -->
@if(isset($sm) && !isset($nextToEachOther))
  <div class="col {{$sm ? $sm : ''}}">
@endif
@forelse ($posts as $post)
          <!-- If profile display them next to each other -->
          @if(isset($nextToEachOther))
          <div class="col {{isset($sm) && isset($nextToEachOther) ? $sm : 's12 m4'}}">
         @endif
         <div class="card  cyan darken-3 customShadow z-depth-5 ">
            <div class="row">
               <div class="col s12 m12 right-align">
                  <div class="chip z-depth-5 tagChip" data-aos="zoom-in-up">
                     <a href="#!" class="right-align">
                     {{ $post->tag->name }}
                     </a>
                  </div>
               </div>
            </div>
            <div class="card-image">
               <div class="progress imageLoader{{$post->postImages[0]->id}}">
                  <div class="indeterminate"></div>
               </div>
               <img src="{{$post->postImages[0]->location}}"  onerror="brokenImageHandling(this, {{$post->postImages[0]->id}})" 
                  onload="removeSpecificLoader({{$post->postImages[0]->id}})" 
                  onabort="removeSpecificLoader({{$post->postImages[0]->id}})"  class="responsive-img z-depth-5" data-aos="zoom-in-left">
               <span class="card-title">
               <strong class="chip strongChips grey darken-3 blue-text" data-aos="zoom-out-up">
               {{ $post->header }}
               </strong>   
               </span>
               <a class="btn-floating halfway-fab  waves-effect waves-teal blue-grey darken-4 z-depth-5"
                  href="/show/post/{{$post->id}}" target="_blank" rel="noreferrer"  >
               <i class="material-icons">free_breakfast</i>
               </a>
            </div>
            <div class="card-content cyan lighten-3">
               <div class="row">
                  <div class="col s12 m12">
                     <a class="chip z-depth-5 strongChips" data-aos="fade-down-left" href="/{{$post->user->name}}">
                          <img src="{{$post->user->image}}" alt="">
                          {{ $post->user->name }}
                     </a>
                     <div class="chip z-depth-5" data-aos="fade-down-right">
                        📅 {{  $post->created_at->diffForHumans() }} 
                     </div>
                     <div class="chip z-depth-5" data-aos="fade-up-left">
                        💬 {{ sizeof($post->comments) }}
                     </div>
                  </div>
               </div>
               <p class="flow-text truncate">
                  {{ $post->body }}
               </p>
            </div>
         </div>
         @if(isset($nextToEachOther))
      </div>
      @endif
@empty
   <h1>No posts</h1>
@endforelse
@if(!isset($nextToEachOther) && isset($sm))
</div>
@endif