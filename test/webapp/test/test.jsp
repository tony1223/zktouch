<!DOCTYPE html>
<html class="ui-mobile-rendering">
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<title>jQuery Mobile Docs - Data Attribute Reference</title>
	<style type="text/css"></style>
</head>
<body>
	
	<div class="container" style="width:500px;height:400px;background:red;" xmlns:w="client" w:ontouchstart="zk.log('client start')">
		<div class="content">
			this is the content; 												
		</div>
	</div>
	
	<script src="lib/jquery-1.7.2.min.js"></script>
	<script>
		$(".container").bind("click",function(e){
			
			var data = [] ,par= e.target;
			$(e.target).css("background","yellow");
			data.push(e.target.id);
			while(par = par.parentNode){
				data.push(par.id);
			}
			console.log("body start" + e.target,data.join("> "));
			
		});
		$(document.body).wrapInner("<div></div>");
	</script>


</body>
</html>
