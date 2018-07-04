var counter=0;


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

  var a =document.getElementsByTagName('video');


  if(request.message=="popup_opened_and_requested_to_opent_the_audio_again")
  {

    // console.log("popup requested to open the audio again");

    try{

        if(a!=undefined)
        {
          a[0].play();
        }

        sendResponse({value:"popup_requests_allowed_to_open_the_video"});


    }catch(err){

      // console.log(err);
      sendResponse({value:"popup_requests_allowed_to_open_the_video"});


    }
  }

  if(request.message=="popup_opened_and_requested_to_close_the_current_video")
  {
    // console.log("popup requested to close the audio");
    try{
         if(a!=undefined)
         {
          a[0].pause();
         }

     sendResponse({value:"popup_requests_allowed_to_close_the_video"});


    }catch(err){
      // console.log(err);

      sendResponse({value:"popup_requests_allowed_to_close_the_video"});

    }
  }

  if(request.message=="active_make_it_play_only")
  {
    try{
      if(a!=undefined)
      {
        a[0].play();
      }
      sendResponse({value:"active_tab_is_played"});

    }catch(err)
    {
      // console.log(err);
      sendResponse({value:"active_tab_is_played"});

    }

  }

  if(request.message=="changed_the_status_of_non_active_tabs")
  {

    try{

      if(a!=undefined)
      {
        for(var i=0;i<a.length;i++)
        {
          a[i].pause();
        }
      }
      sendResponse({value:"non_active_tab_are_paused"});

    }catch(err){

      sendResponse({value:"non_active_tab_are_paused"});

    }


 }

  if(request.message=="update_commande_background_tabs_pause")
  {

    try{

      if(a!=undefined)
      {
        for(var i=0;i<a.length;i++)
        {
          a[i].pause();
        }
      }
      sendResponse({value:"non_active_tabs_are_paused_due_to_update_command"});

    }catch(err){

      sendResponse({value:"non_active_tabs_are_paused_due_to_update_command"});
    }
  }

});
