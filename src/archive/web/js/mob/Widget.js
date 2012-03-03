mob.Widget = zk.$extends(zk.Widget,{
	_datas:{
	},
	getTouchEvt_: function (e){
		return e.domEvent.originalEvent;
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
		var out = [] , datas = this._datas;
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

