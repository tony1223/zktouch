mob.inp.TouchScrollable = zk.$extends(zk.Object,{
    _startY: null,
	_startScrollY: 0,
	
    /* for touch momentum*/
    _timer:null,     
    _scrollV:null,
    _recordCount:10,
    _lastplist:[],
    _scrollTimes: 0,
    /* for touch momentum end*/	
	$init: function (control, node, opts) {
		
		opts = zk.$default(opts, {
		});
		
		this.opts = opts;
		this.control = control;
		this.node = node;
		zk.log(node);
		jq(node).bind("touchstart",function(){
			zk.log("touch",node);
		});
		jq(node).bind("touchstart.touchable", this.proxy(this._doTouchStart))
				.bind("touchmove.touchable", this.proxy(this._doTouchMove))
				.bind("touchend.touchable", this.proxy(this._doTouchEnd));
	},
	_getFirstTouch: function (e){
		return e.domEvent.originalEvent.targetTouches[0];
	},	
	getTouchEvt_: function (e){
		return e.domEvent.originalEvent;
	},
	_doTouchStart: function (e){
		zk.log("start");
		if(this.opts.beforeTouchStart instanceof Function){
			var res = this.opts.beforeTouchStart(this.control );
			if(res === false ) return false;
		}
		this._endMomentum(false);
		this._startY = this._getFirstTouch(e).pageY;
		this._startScrollY = this.opts.getPosition();
		e.stop();
		//clear old objects and assign new
		this._lastplist = [{y:this.opts.getPosition(), t:new Date().getTime()}];
		this._scrollTimes = 0 ;
	
	},
	_doTouchMove: function (e){
		var y = this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY)  ; 
		this.opts.moveTo_(y);
		for(var i = 0 ,len = this._recordCount - 1; i < len  ;++i){
			if(this._lastplist[i])
				this._lastplist[i + 1 ] = this._lastplist[i];
			else break;
		}
		this._lastplist[0] = {y:y, t:new Date().getTime()};
		this._scrollTimes++;
	},
	_doTouchEnd: function (e){
		if(this._scrollTimes != 0){
			var y1,y2 ;
			y1 = this._lastplist[0];
			for(var i = this._recordCount; i > 0 ;--i){
				if(this._lastplist[i]){
					y2 = this._lastplist[i];
					break;
				}
			}
			var ms = (y1.t - y2.t) ,
				pxs = (y1.y - y2.y);
			if( this._scrollTimes == 1 ){ //finetune for quick scroll
				pxs = pxs + 150 * (pxs > 0 ? 1:-1);
			}
			v = pxs/ms;
			this._startMomentum(v * 30 );
		}else{
			this.opts.fixSelectedItemViewIndex();
		}
	},
	_startMomentum: function (v){
		this._endMomentum();
		this._scrollV = v;
		this._timer = window.setInterval(
			this.proxy(function(){
				this._countSpeed();
				if(this._scrollV != 0 ){
					this.opts.moveTo_(this.getPosition() + this._scrollV, true);
				}else{
					this._endMomentum(true);
				}
			})
		,50);
	},
	_endMomentum: function (fixIndex){
		if( this._timer ){
			window.clearInterval(this._timer);
			this._timer = null;
			if(fixIndex == true){
				this.opts._fixSelectedItemViewIndex();
			}
		}
	},
	_countSpeed: function(){
		this._scrollV = this._scrollV * 0.90;
		if(parseInt(this._scrollV , 10) == 0 ){
			this._scrollV = 0 ;
		}
	},		
	destroy: function () {
		jq(node).unbind("touchstart.touchable")
				.unbind("touchmove.touchable")
				.unbind("touchend.touchable");
	}
});

