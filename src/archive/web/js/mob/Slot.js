/**
 * 20120217 1718
 */
mob.Slot = zk.$extends(zk.Widget, {
    _touching:false,
    _startY:0,
    _currentTouchWheel:null,
	$define: {
	},
	bind_: function () {
		this.$supers(mob.Slot,'bind_', arguments);
	},
	bind_: function () {
		this.$supers(mob.Slot,'bind_', arguments);
		
		var node = this.$n("frame");
		this.domListen_( node, "onTouchstart", "_doTouchStart");
		this.domListen_( node, "onTouchmove", "_doTouchMove");
		this.domListen_( node, "onTouchend", "_doTouchEnd");
		
	},
	_getFirstTouch: function (e){
		return e.domEvent.originalEvent.targetTouches[0];
	},
	_doTouchStart: function (e){
		var x = this._getFirstTouch(e).pageX ;
		this._currentTouchWheel = null;
		
		var wheels = jq("@spinwheel",this);
		if(wheels.length <= 1 ){
			this._currentTouchWheel = zk.Widget.$(wheels[0]);
		}else{
			var left = wheels.eq(0).offset().left;
			zk.log(x,left);
			if(x < left ) return true;
			
			for(var k = 0 ,len = wheels.length; k < len ;++k){
				var width = wheels.eq(k).width(); 
				left += width;
				if ( x < (left) ) {
					this._currentTouchWheel = zk.Widget.$(wheels[k]);
					break ;
				}
			}
		}
		if(this._currentTouchWheel)
			this._currentTouchWheel._doTouchStart(e);
		
	},
	_doTouchMove: function (e){
		if(this._currentTouchWheel) this._currentTouchWheel._doTouchMove(e);
	},
	_doTouchEnd: function (e){
		if(this._currentTouchWheel) this._currentTouchWheel._doTouchEnd(e);
	},
	lockScreen: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},
	/*
	  A example for domListen_ listener.
	*/
	/*
	_doItemsClick: function (evt) {
		alert("item click event fired");
	},
	*/
	unbind_: function () {

		// this.domUnlisten_(this.$n("cave"), "onClick", "_doItemsClick");
		this.$supers(mob.Slot,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-slot";
	}
});
