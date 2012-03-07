/**
 * 20120217 1718
 */


mob.sel.Listbox = zk.$extends(mob.Widget, {
	_datas:{
		role:'listview',
//		inset:true,
		filter:false
	},	
	$define: {
	},
	bind_: function () {
		this.$supers(mob.sel.Listbox,'bind_', arguments);
		var wgt= this,ary = [];
		jq(this.$n()).delegate("a.ui-link-inherit","click.listbox",function(e){
			wgt.doSelectListem_.apply(wgt,[e,this]); //Note this is the delegated target
		});
	},
	bindChildren_: function(){
		if(!$.data(this.$n(),"listview")){ //FIXME handle refreshcornors;
			$.data( this.$n(), "listview", new $.mobile.listview( null, this.$n() ) );
		}		
		this.$supers(mob.sel.Listbox ,'bindChildren_', arguments);
	},	
	doSelectListem_: function(e,dom){ //Note the e is jQuery event
		var wid = zk.Widget.$(dom); //assume this should be listitem
		if(wid){
			if(wid._ajaxLink && wid._href){
				this.fire("onAjaxLink",{href: wid._href });
				return false;
			}else{
				this.fire("onSelect",{ 
					selInd:wid.getChildIndex(), 
					href: wid._href ,
					label: wid._label
				});
				if(this.isListen("onSelect")){
					return false;
				}
			}
		}
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
		jq(this.$n()).undelegate("a.ui-link-inherit", "click.listbox",this.proxy(this.doSelect_));
		this.$supers(mob.sel.Listbox,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "zm-listbox";
	}
});
