mob.Footer = zk.$extends(mob.Widget,{
	_datas:{
		role:'footer'
	},
	$define:{
		label:function(){
			this.rerender();
		}
	},	
	bindChildren_: function(){
		this.$supers(mob.Footer,'bindChildren_', arguments);
		//FIXME check pagecreate event to handle dynamic add headers.
	},
	redraw: function(out){
		out.push('<div ',this.domAttrs_(),' >');
		
		if(this._label){//FIXME handling escaping
			out.push('<h1> ' , this._label , ' </h1>');
		}
		this.eachChild(function(index,child){ 
			this.redraw(out);
		});
		out.push('</div>');
		
	}
});

