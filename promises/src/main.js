requirejs.config({
  paths: {
    "jquery": "/bower_components/jquery/jquery"
  }
});
define(["jquery", "./promises", "./vanilla"],function($, promises,vanilla){
  $(function(){
    console.log("We now have jquery");
    promises.wireUpASync();
    //vanilla.wireUpSync();

  })
});
