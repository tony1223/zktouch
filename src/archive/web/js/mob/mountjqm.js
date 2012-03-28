

zk.afterMount(function(){
	jq("body > script").remove(); //ZK-991 workaround 
	jq.mobile.initializePage(); 
})
