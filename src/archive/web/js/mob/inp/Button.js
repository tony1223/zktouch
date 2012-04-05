/* Button.js

	Purpose:
		
	Description:
		
	History:
		Tue Apr  3 18:36:23     2012, Created by tonyq

Copyright (C) 2012 Potix Corporation. All Rights Reserved.

	This program is distributed under LGPL Version 2.1 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
*/
mob.inp.Button = zk.$extends(mob.inp.FormWidget, {
	$define: {
		href:function(){
			if(this.desktop){
				this.$n().href = this._href;
			}
		},
		label:function(){
			this.rerender();
		},
		inline:function(){
			this.data("inline",this._inline);
			this.rerender();
		}
	},
	dataInit_: function(){
		this.$supers(mob.inp.Button,'dataInit_', arguments);
		this.data("role","button");
	},
	bind_:function(){
		this.$supers(mob.inp.Button,'bind_', arguments);
		var node = this.$n();
		this.domListen_( node, "onClick", "doClick_");
	},
	doClick_:function(e){
		if(this.isListen("onClick")){
			this.fire("onClick");
			e.stop();
		}
	},
	unbind_: function () {
		var node = this.$n();
		this.domUnlisten_( node, "onClick", "doClick_");
		this.$supers(mob.inp.Button,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "zm-button";
	}	
});
