mob.inp.FormWidget = zk.$extends(mob.Widget, {
	$define:{
		mini:function(){
			this.data("mini",this._mini);
			this.rerender();
		}
	}
});