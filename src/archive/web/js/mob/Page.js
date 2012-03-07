mob.Page = zk.$extends(mob.Widget,{
	_active: true,
	_datas:{
		role:'page',
		theme:'c'
	},
	$define:{
		active: function(val){
			if(this.desktop){
				if(val){
					jq(this.$n()).addClass("ui-page-active");
				}else{
					jq(this.$n()).removeClass("ui-page-active");
				}
			}
		}
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
		
		if(!this._active) {
			return sup ;
		} else {
			return sup + " ui-page-active";
		}
		
	}
});

