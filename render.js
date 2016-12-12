var fs = require("fs");
// functions that handles the reading of files and merge in value
  function mergeValues(values, content){
    //cycle over the keys to the values
    for(var key in values){
      //replace all{{keys}} with values from the values object
      content =content.replace("{{" + key + "}}", values[key]);
    }
    //return the merged content
    return content;
  }
function view(templateName, values, response) {
  //read from template files readeing the files sychroniously because in this instance it works better
  // if sychronous does not need a callback function asynch needs a callback function
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding:"utf8"});
  //insert values into content
  fileContents = mergeValues(values, fileContents);
  
    
  //write contents to the response
  response.write(fileContents); 
 
  
  
}
module.exports.view = view;