define(["jquery"],function($){
  var waitFor = function(msec,callback){
      //do work
    setTimeout(function() {
      callback({msg: "succesful with " + msec})
    }, msec);
  }
  var reportStatus = function(status){
    $("#messages").append("<li> Vanilla: "+status.msg+"</li>");
  }
  var wireUpSync = function() {
    waitFor(3000,function(msg){
      reportStatus(msg);
      console.log(msg);
      waitFor(2000,function(msg){
        reportStatus(msg)
        reportStatus({msg: "All done"});
        console.log("All wired up")
      });
    })
  }
  return {wireUpSync: wireUpSync};
});
