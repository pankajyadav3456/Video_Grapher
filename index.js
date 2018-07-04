var PythonShell = require('python-shell');
const fetchCommentPage = require('youtube-comment-api')
var videoId = "";
var fs = require("fs");
var comment_array=[]
var all_text="";

var express = require('express');
var cors = require('cors');
#The spec defines a set of headers that allow the browser and server to communicate about which requests are (and are not) allowed
#​​​​Cross-origin resource sharing (CORS) is a standard for accessing web resources on different domains

var app = express();
var bodyParser= require('body-parser');
#body-parser extract the entire body portion of an incoming request stream and exposes it on req.body .
app.use(cors());
app.use(bodyParser.json());

var jsonfile = require('jsonfile')
var file = 'test.json'

app.post('/check',function(req,res){
		console.log("hello");
		res.send({"val":"1"});
});

app.post('/make_csv',function(req,res){

	all_text="";
	comment_array=[];
	console.log("hello");
	videoId=req.body.videoId;
  console.log(videoId);
	fetchCommentPage(videoId)
	  .then(commentPage => {

		try{
			if(commentPage.comments.length!=0)
			{
				for(var i=0;i<commentPage.comments.length;i++)
				{
					comment_array.push(commentPage.comments[i].text);
					all_text=all_text+commentPage.comments[i].text;
				}
			}
		}catch(err)
		{
			console.log(err);
		}


	    return fetchCommentPage(videoId, commentPage.nextPageToken)
	  })
	  .then(commentPage => {

		try{
			if(commentPage.comments.length!=0)
			{
				for(var i=0;i<commentPage.comments.length;i++)
				{
					comment_array.push(commentPage.comments[i].text);
					all_text=all_text+commentPage.comments[i].text;
				}

			}

		}catch(err)
		{
			console.log(err);
		}
	})

	setTimeout(function(){
		console.log(comment_array);
		var array_tatti=[];
		var comment_object={text:all_text};
		array_tatti.push(comment_object);
		fs.writeFile("./comments.csv", JSON.stringify(array_tatti), function(err) {
		  if(err) {
			console.log(err);
		  }
		  else {
		    console.log("Output saved to /comments.csv");
			if(comment_array.length!=0)
			{
				PythonShell.run('script.py', function (err) {
					// file reading results .csv
					console.dir(jsonfile.readFileSync(file))
					res.send({"val":jsonfile.readFileSync(file)});
				  console.log('finished');
				});
			}else {
				res.send({"val":"-1"});
			}
		  }
		});

 },15000)
});

app.listen(3000);
