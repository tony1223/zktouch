mob.Page = zk.$extends(mob.Widget,{
	_datas:{
		role:'page',
		theme:'c'
	},
	redraw: function(out){
		out.push('<div ',this.domAttrs_(),' >');
		this.eachChild(function(index,child){ 
			this.redraw(out);
		});
		out.push('</div>');
	},
	bindChildren_: function(){
		if(!$.data(this.$n(),"page")){
			$.data( this.$n(), "page", new $.mobile.page( null, this.$n() ) );
		}		
		this.$supers(mob.Page ,'bindChildren_', arguments);
	},
	bind_: function () {
		this.$supers(mob.Page ,'bind_', arguments);
	},	
	domClass_: function(){
		var sup = this.$supers(mob.Page,'domClass_', arguments);
		return sup + " ui-page-active";
	}
});

