

zk.afterMount(function(){
	jq("body > script").remove();
	jq.mobile.initializePage();
})
