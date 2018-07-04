
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  //  console.log("hello");

   if(request.msg=="its_chrome_tab_baby")
   {
    //  console.log("I am in");
     sendResponse({val:"hey_there"})
   }

 });




 function call_me_to_check()
 {

   chrome.storage.sync.get(['tab_id_with_which_audio_is_cumming'], function(items) {
  //  console.log(items);
  //  console.log(items.tab_id_with_which_audio_is_cumming);

   if(items.tab_id_with_which_audio_is_cumming!=undefined)
   {

     chrome.tabs.query({audible:true},function(tab){

       if(tab.length!=0){

         // tags are audible we have to pause it
         // pause karna hain

         if(tab[0].active==true)
         {

          //  console.log('sorry cant change active tab');
         }else {

           // removing the faebook will not be entertained


             chrome.tabs.sendMessage(tab[0].id,{"message":"popup_opened_and_requested_to_close_the_current_video"},function(response){
              //  console.log(response.value);

               setTimeout(function(){

                 chrome.browserAction.setIcon({path:"play-button.png"});

                   if(response.value=="popup_requests_allowed_to_close_the_video")
                   {
                    //  console.log('old tabs video gets closed');
                   }
                  //  console.log(response);
               },400);

             });



         }
         // if it is active nahi kuch nahi karna
         // if it is inactive close that

       }else {

         // no tag is audible

         chrome.tabs.query({active:true},function(tabiinside){

           if(tabiinside[0].id==items.tab_id_with_which_audio_is_cumming.id)
           {

            //  console.log('cant change the active wala tab');

           }else {

             if(items.tab_id_with_which_audio_is_cumming.url.match(/facebook/))
             {

              //  console.log('sorry facebook is not entertained');
             }
             else {

               chrome.tabs.sendMessage(items.tab_id_with_which_audio_is_cumming.id,{"message":"popup_opened_and_requested_to_opent_the_audio_again"},function(response){
              //  console.log(response.value);

               setTimeout(function(){

                     chrome.browserAction.setIcon({path:"pause-button.png"});

                     if(response.value=="popup_requests_allowed_to_open_the_video")
                     {
                      //  console.log("last tab audio activated again");
                     }
                    //  console.log(response);
                 },400);

               });
             }
           }

         });

         // play karna hain
         // if there is old one usko on kardo and active bhi nahi hona chahiye
       }
     });

   }else {
    //  console.log("there was no tab in which audio was coming");
   }
 });

}



chrome.browserAction.onClicked.addListener(function (tab){

   call_me_to_check();

   chrome.tabs.query({active:true},function(tab){
     // whether its a youtube video or not

     if(!tab[0].url.match(/youtube/))
     {
       console.log("not a youtube video");
     }else {
           var raw_url=tab[0].url;
           var n=raw_url.indexOf("v=");
           videoId=raw_url.substr(n+2);

           var main_data={"videoId":videoId};
           $.ajax({

               type:'POST',
               crossOrigin:true,
               contentType:'application/json',
               data: JSON.stringify(main_data),
               url:'http://localhost:3000/make_csv',
               sucess:function(data){
                 console.log(data);
               },
               error: function(err){
                 console.log(err);
               }
           });

     }

   })


});


 chrome.tabs.onUpdated.addListener(function(tabId,changedInfo,tab){

   try{

     if(tab.audible==true && changedInfo.audible==true)
     {

       chrome.storage.sync.set({'tab_id_with_which_audio_is_cumming':tab}, function() {
      //  console.log('everything is saved');
       });

       chrome.browserAction.setIcon({path:"pause-button.png"});
     }

     // if there is any case ki pause icon change nahi hota hain  and all the tabs are not audible


     chrome.tabs.query({audible:true},function(tabiinside){

       if(tabiinside.length==0)
       {
         chrome.browserAction.setIcon({path:"play-button.png"});
       }

     });


   }catch(err)
   {

    //  console.log(err);
   }

 });

 chrome.tabs.onUpdated.addListener(function (tabId,changedInfo,tab){


   try{

    //  console.log(tab.url);

     if(tab.url.substring(0,9)=="chrome://")
     {

      //  chrome.runtime.sendMessage({"message":"its_chrome_tab_baby"},function(response){
      //     console.log(response);
      //  });

      //  console.log("dont require any type of functioning its google chromes tab");
     }
     else {

       if(tab.active==true &&  tab.audible==true && changedInfo.audible==true)
       {
          chrome.tabs.query({audible:true,active:false},function(tab){
               for(var i=0;i<tab.length;i++)
               {
                //  console.log("update_command_background_tabs"+tab.length);
                 chrome.tabs.sendMessage(tab[i].id,{"message":"update_commande_background_tabs_pause"},function(response){
                    //  console.log(response.value);
                 });
               }

          });
       }

     }
   }catch(err)
   {

    //  console.log(err);
   }


});





chrome.tabs.onActivated.addListener(function (activeInfo){
  try{

    var promise_object = new Promise((resolve,reject)=>{


       chrome.tabs.get(activeInfo.tabId,function(tab){

        //  console.log(tab.url);

         if(tab.url.substring(0,9)=="chrome://")
         {
          //  console.log("its an empty tab or a chrom tab");
          //  console.log("does not require any process");
         }
         else {

           if(!tab.url.match(/facebook/))
           {
             chrome.tabs.sendMessage(tab.id,{"message":"active_make_it_play_only"},function(response){
              //  console.log(response.value);

               setTimeout(function(){
                  resolve("active_tab_is_now_playing");
               },400);
             });
           }

         }

     });
   }).then(function(result){
          //  console.log(result);

           chrome.tabs.query({audible:true},function(tab){

              //  console.log("after promise "+tab.length);

               if(tab.length==1)
               {
                  // console.log('only 1 tab has audio');
               }else{

                 for(var i=0;i<tab.length;i++)
                 {
                   if(tab[i].id!=activeInfo.tabId){
                     chrome.tabs.sendMessage(tab[i].id,{"message":"changed_the_status_of_non_active_tabs"},function(response){
                    //  console.log(response.value);
                      });
                   }

                 }
               }
           });
     });

  }catch(err){

    // console.log(err);
  }

  try{

    chrome.tabs.query({audible:true},function(tabiinside){

      if(tabiinside.length==0)
      {
        chrome.browserAction.setIcon({path:"play-button.png"});
      }

    });

  }catch(err){
    // console.log(err);
  }

  });

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  if(request.message==="start_doing_things"){
      // console.log("I am in inside");
      do_things();
      sendResponse({value:"extension_started"})
    }
});
