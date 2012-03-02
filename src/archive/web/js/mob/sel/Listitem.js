/**
 * 20120302 1753
 */
mob.sel.Listitem = zk.$extends(mob.Widget, {
	$define: {
		href:null,
		label:null
	},
	bind_: function () {
		this.$supers(mob.sel.Listitem,'bind_', arguments);
		if(this.parent && this.parent.refresh_){ //invoking mob.Listbox.refresh_
//			this.parent.refresh_(); 
		}
	},
	unbind_: function () {
		this.$supers(mob.sel.Listitem,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "zm-listitem";
	}
});
