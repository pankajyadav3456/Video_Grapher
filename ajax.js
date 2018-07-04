
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
