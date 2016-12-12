//grabbed from the example profile 
var Profile = require("./profile.js");
var querystring = require("querystring");
var render = require("./render.js");
var content = "text/html";


// handle HTTP route Get/ and Post ? i.e Home

function home(request, response){

 // if url == "/" && GET 
  if(request.url == "/"){
    if(request.method.toLowerCase() === "get"){
    //show search
      // writing to that response a header search field, and             
        
      response.writeHead(200, {'Content-type': content});
      render.view("header", {}, response);
      render.view("search", {}, response);
      render.view("footer", {}, response);
      response.end();
      } else {
       // if url == to "/" && POST
        //get the post data from body
        request.on("data", function(postBody){
          
          //extract the username
          var query = querystring.parse(postBody.toString());
           // redirect to /:username
          response.writeHead(303, {"Location": "/" + query.username});
          response.end();
         
        });
         
      }
    }
  
  
}
  
//Handle Http rout Get /:username i.e /chalkers
function user(request, response){

  // if url == "/..."
  // set a local variablei n the funciton userRoute username that replaces the slash from home     
  //request with an empty string (replace method gets and sets)
  var username = request.url.replace("/" , "");
  // set a if loop with a conditional statement dependent on the length of user name 
  if(username.length > 0){
    response.writeHead(200, {'Content-type':content});
    render.view("header", {}, response);
    
    
    //get json for TREEhouse
    var studentProfile = new Profile(username);

   
      //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile
      
      
      //store vallues which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints:profileJSON.points.JavaScript
      }
     //simple callback
      render.view("profile", values, response);
      render.view("footer", {}, response);
      response.end();
    });
    
    //on error
    studentProfile.on("error", function(error){
      //show error
       render.view("error", {errorMessage: error.message}, response);
       render.view("search", {}, response);
       render.view("footer", {}, response);
       response.end();
        
    });
   }
     }


module.exports.home = home;
module.exports.user = user;