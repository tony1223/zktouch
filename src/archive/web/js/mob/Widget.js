mob.Widget = zk.$extends(zk.Widget,{
	/**
	 * Will be writen to data-attribute when rendering dom.
	 */
	_datas:null,
	getTouchEvt_: function (e){
		return e.domEvent.originalEvent;
	},
	$define:{
		theme: function(val){
			this.data("theme" , val);
			this.rerender();
		} 
	},
	/**
	 * Used to give default data-attributes.
	 */
	dataInit_:function(){},		
	$init: function () {
		this.$supers(mob.Widget,'$init', arguments);
		if(this.dataInit_) this.dataInit_();
	},
	data:function(){
		if(arguments.length == 2) {
			this._datas = this._datas || {};
			this._datas[arguments[0]] = arguments[1];
		}else if(arguments.length == 1){
			return this._datas && this._datas[arguments[0]]; 
		}else{
			return this._datas || {};
		}
	},
	redrawChildren: function(out){
		for(var child =this.firstChild,ind =0 ; child ; child = child.nextSibling, ind++){
			child.redraw(out);
		}
	},
	/**
	 * Just like jQuery.each , here we iterate all the children.
	 * 
	 * @param fn {function(ind,child) {} }  Note that  "this" in the fn is the child widget.
	 */
	eachChild: function(fn){
		for(var child =this.firstChild,ind =0 ; child ; child = child.nextSibling, ind++){
			fn.apply(child,[ind,child]);
		}
	},
	domAttrs_: function(no){
		var res = [this.$supers(mob.Widget ,'domAttrs_', arguments)];
		res.push(this.domDataAttrs_(no));
		return res.join("");
	},
	domDataAttrs_: function(no){
		var out = [] , datas = this.data();
		if(no){
			for(var k in datas){
				if(!no["data-"+k]){
					out.push(' data-'+k+'="', datas[k], '" ');
				}
			}
		}else{
			for(var k in datas){
				out.push(' data-'+k+'="', datas[k], '" ');
			}
		}
		return out.join("");
	}
});

