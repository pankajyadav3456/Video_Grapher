
var videoId="";

function get_video_id(){

  chrome.tabs.query({active:true},function(tab){
    // whether its a youtube video or not

    if(!tab.url.match(/youtube/))
    {
      console.log("not a youtube video");
    }else {
          var raw_url=tab.url;
          var n=raw_url.indexOf("v=");
          videoId=raw_url.substr(n+2);
          console.log(videoId);
    }

  });
}

function get_sentiments(videoId){

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
