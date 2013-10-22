define(["jquery"],function($){
  var waitFor = function(name, msec){
    var deff = $.Deferred(function(dfd){
      //do work
      setTimeout(function() {
        dfd.resolve({name: name, msg: "succesful with " + msec,
                    nextMsec:msec-1000})
      }, msec);
      setInterval(function(){
        dfd.notify({name: name})
      },100);
    })
    var promise = deff.promise();
    return promise;
  }
  var reportStatus = function(status){
    var name =status.name;
    var $elem = $("li#"+name);
    if($elem.length==0) {
      $elem = $("<li>").attr("id",name).appendTo("#messages");
    }
    $elem.html($elem.html()+status.msg);
  }
  var paintNotification = function(notificationFor) {
    for(var i=0;i<1000000000;i++){
      //
    }
    console.log("triggerd", notificationFor)
    var name =notificationFor.name;
    var $elem = $("li#"+name);
    if($elem.length==0) {
      $elem = $("<li>").attr("id",name).appendTo("#messages");
    }
    $elem.html($elem.html()+".");
  }
  var wireUpSync = function() {
    var def1 = waitFor(3000)
    def1.done(function(status){
      console.log(status);
    });
    var def2=def1.done( function(status){
      reportStatus(status);
      def2 = waitFor(status.nextMsec);
      return def2;
    });
    def2.done(function(status) {
      reportStatus(status);
      reportStatus({msg: "All done"});
    })
  }
  var wireUpASync = function() {
    var def1 = waitFor("d1",3000)
    var def2 = waitFor("d2",2000)

    def1.done(reportStatus).progress(paintNotification);
    def2.done(reportStatus).progress(paintNotification);

    def3 = $.when(def1,def2)
    def3.done(function(results){
      var def4 = waitFor("d4",1000).done(reportStatus).progress(paintNotification);
      var def5 = waitFor("d5",1000).done(reportStatus).progress(paintNotification);

      $.when(def4,def5).done(function(results){
        console.log(results);
        $("#messages").append("<li>All done</li>")
      });
    })
  }
  return {wireUpSync: wireUpSync,wireUpASync: wireUpASync};
})
