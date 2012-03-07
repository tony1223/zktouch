/**
 * 20120302 1753
 */
mob.sel.Listitem = zk.$extends(mob.Widget, {
	_divider:false,
	$define: {
		href:null,
		label:null,
		divider:function(){
			this._datas["role"] = "list-divider";
			if(this.desktop){
				this.rerender();
			}
		}
	},
	bind_: function () {
		this.$supers(mob.sel.Listitem,'bind_', arguments);
		if(this.parent && this.parent.refresh_){ //invoking mob.Listbox.refresh_
			this.parent.refresh_(); 
		}

//		var link = jq("> .ui-btn-inner > .ui-btn-text > .ui-link-inherit");
		
	},
	unbind_: function () {
		this.$supers(mob.sel.Listitem,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "zm-listitem";
	}
});
