

(function( $ ) 
 {
     var templates = {};
     $.extend(
	 {
	     jplates: function(options,cb,debug)
	     { 
		 var urls = {};
		 var counter = 0;		 
		 var loadTemplates = function(tids,html)
		 {
		     //console.log(tids)
		     for (var _t in tids)
		     {
			 
			 var t = tids[_t];
			 if ($.template[t])
			 {
			     continue;
			 }
			 var temphtml = $(html).filter(function(){ return $(this).is('.template#'+t) });
			 if(temphtml.length != 0)
			 {
			     // this is wrong but works for now
			     if (t=='jtk-table-row')		
			     {
				 //console.log('found template')
				 temphtml =temphtml.find('tbody')
			     }
			     if (t=='jtk-table-cell')		
			     {
				 //console.log('found template')
				 temphtml =temphtml.find('tr')
			     }
			     var thtml = (temphtml.html()+'').replace(/href_="/g,'href="')
			     thtml = thtml.replace(/src_="/g,'src="')
			     $.template(t, thtml)
			 } else
			 {
			     console.log('template not found: '+t+' in '+url);
			 }				    
		     }
		 }
		 //console.log(options)
		 for (var url in options)
		 {	
		     if (url in templates)
		     {
			 //console.log('adding from cache')
			 loadTemplates(options[url],templates[url])
		     } else
		     {
			 counter++;
			 var req = $.ajax({
			     url: url,
			     type: "GET",
			     processData: false,
			     dataType: 'html',
			     success: function(msg){				 
				 templates[this.url] = msg		    
				 loadTemplates(options[this.url],msg);
			     },
			     error: function(msg){
				 //console.log('loading template url '+url+' failed');
			     }
			 })
			 var complete = function()
			 {
			     //console.log(templates)
			     counter--;		
			     if (counter == 0)
				 if (cb) cb()					
			 };
			 req.done(complete);
			 req.fail(complete);		    
		     };	   
		     if (counter == 0)
		     {
			 if (cb) cb()					
		     }
		 };
	     },
	 });

 })( jQuery );


