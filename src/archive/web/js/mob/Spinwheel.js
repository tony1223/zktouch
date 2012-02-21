/**
 * 20120217 1533
 */
mob.Spinwheel = zk.$extends(zk.Widget, {
    _options:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], //default value for text attribute
    _startY: null,
	_startScrollY: null,
    _pos:null , //cached properties
    _timer:null,
    _scrollV:null,
    _recordCount:10,
    _lastplist:[],
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
	_stopMoving: function(){
		if(this._timer) {
			window.clearInterval(this._timer);
			this._timer = null;
		}
	},
	_startMoving: function (v){
		this._stopMoving();
		var wgt = this;
		wgt._scrollV = v;
		this._timer = window.setInterval(function(){
			wgt._countSpeed();
			if(wgt._scrollV != 0 ){
				wgt.moveTo_(wgt.getPosition() + wgt._scrollV);
			}else{
				window.clearInterval(wgt._timer);
				wgt._timer = null;
			}
		},50);
	},
	_countSpeed: function(){
		this._scrollV = this._scrollV * 0.90;
		if(parseInt(this._scrollV * 10 , 10) == 0 ){
			this._scrollV = 0 ;
		}
		
	},	
	_doTouchStart: function (e){
		this._stopMoving();
		this._startY = this._getFirstTouch(e).pageY;
		this._startScrollY = this.getPosition();
		jq(document).bind("touchstart",function(){
			return false;
		});
		this._lastplist[0] = {y:this.getPosition(), t:new Date().getTime()};
		this.n = 0 ;
	},
	_doTouchMove: function (e){
		var y = this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY)  ; 
		this.moveTo_(y);
		for(var i = 0 ,len = this._recordCount - 1; i < len  ;++i){
			if(this._lastplist[i])
				this._lastplist[i + 1 ] = this._lastplist[i];
			else break;
		}
		this._lastplist[0] = {y:y, t:new Date().getTime()};
		this.n++;
	},
	_doTouchEnd: function (e){
		zk.log("times",this.n);
		jq(document).unbind("touchstart");
		if(this._lastplist[1]){
			var y1,y2 ;
			y1 = this._lastplist[0];
			for(var i = this._recordCount; i > 0 ;--i){
				if(this._lastplist[i]){
					y2 = this._lastplist[i];
					break;
				}
			}			
			var ms = (y1.t - y2.t) ;
			var pxs = (y1.y - y2.y);
			v = pxs/ms;
			this._startMoving(v *30 );
		}
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
