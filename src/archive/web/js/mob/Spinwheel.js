/**
 * 20120217 1533
 */
mob.Spinwheel = zk.$extends(zk.Widget, {
    _options:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], //default value for text attribute
    _startY: null,
	_startScrollY: null,
    _pos:null , //cached properties
	$define: {
	},
	bind_: function () {
		this.$supers(mob.Spinwheel,'bind_', arguments);
	},
	setPosition: function (top){
		if(this.desktop){
			jq(this.$n("body")).css("top",(top * - 1)+"px");
			this._pos = top;
		}
	},
	getPosition: function(){
		if(this.desktop){
			if(this._pos != null) {
				return this._pos;
			}
			
			var top = jq(this.$n("body")).css("top");
			if(top == "auto") top = 0;
			else top = parseInt(top.replace(/px/,""),10) * -1 ;
			return top;
		}
	},
	moveTo_:function(newtop){
		var  n = this.$n("body"), 
		newtop = this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY) + 5 ,
		toplimit = n.scrollHeight - 150 ; //215 from parent
	
		if(newtop >= toplimit){  //up bound
			newtop = toplimit;
		}else if( newtop < -20){ //low bound
			newtop = -20;
		}
		if(this.getPosition() == newtop){
			return ;
		}
		this.setPosition(newtop);
	},	
	_getFirstTouch: function (e){
		return e.domEvent.originalEvent.targetTouches[0];
	},
	_doTouchStart: function (e){
		this._startY = this._getFirstTouch(e).pageY;
		this._startScrollY = this.getPosition();
		jq(document).bind("touchstart",function(){
			return false;
		});		
	},
	_doTouchMove: function (e){
		this.moveTo_((this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY) + 5 ));
	},
	_doTouchEnd: function (e){
		jq(document).unbind("touchstart");
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
		this.$supers(mob.Spinwheel,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-spinwheel";
	}
});
