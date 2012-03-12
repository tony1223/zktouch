mob.Footer = zk.$extends(mob.Header,{
	_datas:{
		role:'footer'
	},
	bindChildren_: function(){
		this.$supers(mob.Footer,'bindChildren_', arguments);
		//FIXME check pagecreate event to handle dynamic add headers.
	}
});

