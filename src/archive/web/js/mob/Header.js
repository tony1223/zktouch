mob.Header = zk.$extends(mob.Widget,{
	_datas:{
		role:'header',
		theme:'f'
	},
	$define:{
		caption:null
	},
	redraw: function(out){
		out.push('<div ',this.domAttrs_(),' >');
		
		if(this._caption){//FIXME handling escaping
			out.push('<h1> ' , this._caption , ' </h1>');
		}
		this.eachChild(function(index,child){ 
			this.redraw(out);
		});
		out.push('</div>');
		
	},
	bindChildren_: function(){
		this.$supers(mob.Header,'bindChildren_', arguments);
		
		//FIXME check pagecreate event to handle dynamic add headers.
	},
	bind_: function () {
		this.$supers(mob.Header,'bind_', arguments);
	}	
});

