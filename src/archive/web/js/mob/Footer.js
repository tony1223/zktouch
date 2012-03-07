mob.Footer = zk.$extends(mob.Widget,{
	_datas:{
		role:'footer'
	},
	$define:{
		caption:null
	},
	redraw: function(out){
		out.push('<div ',this.domAttrs_(),' >');
		
		this.eachChild(function(index,child){ 
			this.redraw(out);
		});
		out.push('</div>');
		
	},
	bindChildren_: function(){
		this.$supers(mob.Footer,'bindChildren_', arguments);
		//FIXME check pagecreate event to handle dynamic add headers.
	}
});

