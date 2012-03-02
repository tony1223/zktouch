/**
 * 20120217 1718
 */
mob.sel.Listbox = zk.$extends(mob.Widget, {
	_inited :false,
	$define: {
	},
	bind_: function () {
		this.$supers(mob.sel.Listbox,'bind_', arguments);
		
		if(!$.data(this.$n(),"listview")){
			$.data( this.$n(), "listview", new $.mobile.listview( null, this.$n() ) );
		}
		this._inited = true;
	},
	/**
	 * ask jQuery mobile to update children when children updated. 
	 */
	refresh_: function (){
		var listview;
		if(this.desktop && ( listview = $.data(this.$n(),"listview") )){
			listview.refresh(false); //false means updating
		}
	},
	unbind_: function () {
		this.$supers(mob.sel.Listbox,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "zm-listbox";
	}
});
