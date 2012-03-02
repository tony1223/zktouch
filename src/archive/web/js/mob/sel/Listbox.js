/**
 * 20120217 1718
 */
mob.sel.Listbox = zk.$extends(mob.Widget, {
	$define: {
	},
	bind_: function () {
		this.$supers(mob.inp.Slot,'bind_', arguments);
		this.domListen_( node, "onTouchend", "_doTouchEnd");
		
	},
	unbind_: function () {
		var node = this.$n("frame");
		this.domUnlisten_( node, "onTouchstart", "_doTouchStart");
		this.domUnlisten_( node, "onTouchmove", "_doTouchMove");
		this.domUnlisten_( node, "onTouchend", "_doTouchEnd");
		this.$supers(mob.inp.Slot,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-listbox";
	}
});
