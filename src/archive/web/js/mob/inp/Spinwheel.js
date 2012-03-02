/**
 * 20120217 1533
 */
mob.inp.Spinwheel = zk.$extends(mob.Widget, {
    _options:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], //default value for text attribute
    _startY: null,
	_startScrollY: 0,
    _pos:null , //cached properties
    
    /* for touch momentum*/
    _timer:null,     
    _scrollV:null,
    _recordCount:10,
    _lastplist:[],
    _scrollTimes: 0,
    /* for touch momentum end*/
	$define: {
		hello:function(val){
			
		}
	},
	bind_: function () {
		this.$supers(mob.inp.Spinwheel,'bind_', arguments);
		this._fixSelectedItemViewIndex();		
	},
	proxy: function (fn){
	     var wgt = this;
	     return function(){
	         fn.apply(wgt,arguments);
	     };
	},
	_fixSelectedItemViewIndex: function(){
		this._test = 0 ;//FIXME remove this
		
		var itemset = jq("li" ,this.$n("body")) , ind;
		ind = this._searchPos(itemset, 0, itemset.size() -1 , this.getPosition());
		this._selectItemFromViewIndex(ind);
	},
	_test: 0,
	_selectItemFromViewIndex: function(ind){
		var body = this.$n("body") , 
			target = jq("li:eq("+ind+")" ,body) , 
			top	= target.position().top,
			zcls = this.getZclass() ;
		
		target.addClass(zcls+"-sel");
		$(body).animate({
			top : target.position().top * -1 + 2
		},100,
			this.proxy(function(){
				this._pos = top;
			})
		);
	},
	//Binary search for items 
	// Note: pos is current position of the wheel , 
	// so it's not actually match the number of each item's top.
	// We have to find closest one.
	_searchPos:function(itemset,minInd,maxInd,pos){
		this._test++;
		if(this._test > 15) { // remove this in last step
			zk.log("endless loop");
			return -1;
		}
		
		if( minInd == maxInd ) {
			return minInd;
		}else if(minInd == maxInd - 1){ 
			var start = itemset.eq(minInd).position().top,
				end = itemset.eq(maxInd).position().top;
				
			if(pos > (start + end*3)/ 4 ){
				return maxInd;
			}else{
				return minInd;
			}
		}
		
		var avgInd = parseInt((maxInd + minInd) /2,10) ,
			avg = itemset.eq(avgInd).position().top;

		if(pos >= avg){
			return this._searchPos(itemset, avgInd, maxInd, pos);
		}else{
			return this._searchPos(itemset, minInd, avgInd, pos );			
		}
		
		return -1;
		
	},
	setPosition: function (top){
		if(this.desktop){
			this.$n("body").style.top = (top * - 1)+"px";
			this._pos = top;
		}
	},
	/**
	 * Note: you could only get the position value when dom is rendered.
	 */
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
	/**
	 * @param String momentum if it's under momentum
	 */
	moveTo_:function(newtop, momentum){
		var  n = this.$n("body"), 
			nexttop = newtop,
			max = n.scrollHeight - 130 ,
			min = -20 ; //215 from parent
		
		if(nexttop >= max){  //up bound
			nexttop = max;
		}else if( nexttop < min){ //low bound
			nexttop = min;
		}
		if(this.getPosition() == nexttop){
			return ;
		}
		this.setPosition(nexttop);
		if( momentum && (nexttop == min || nexttop == max)  ){ //means reach the limit
			this._endMomentum(true);
		}
	},	
	_getFirstTouch: function (e){
		return e.domEvent.originalEvent.targetTouches[0];
	},
	_startMomentum: function (v){
		this._endMomentum();
		this._scrollV = v;
		this._timer = window.setInterval(
			this.proxy(function(){
				this._countSpeed();
				if(this._scrollV != 0 ){
					this.moveTo_(this.getPosition() + this._scrollV, true);
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
				this._fixSelectedItemViewIndex();
			}
		}
	},
	_countSpeed: function(){
		this._scrollV = this._scrollV * 0.90;
		if(parseInt(this._scrollV , 10) == 0 ){
			this._scrollV = 0 ;
		}
	},	
	_doTouchStart: function (e){
		var zcls = this.getZclass() ;
		jq(this.$n("body")).find("."+ zcls +"-sel").removeClass(zcls+"-sel");
		this._endMomentum(false);
		this._startY = this._getFirstTouch(e).pageY;
		this._startScrollY = this.getPosition();
		e.stop();
		//clear old objects and assign new
		this._lastplist = [{y:this.getPosition(), t:new Date().getTime()}];
		this._scrollTimes = 0 ;
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
			this._fixSelectedItemViewIndex();
		}
	},
	unbind_: function () {
		// this.domUnlisten_(this.$n("cave"), "onClick", "_doItemsClick");
		this.$supers(mob.inp.Spinwheel,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-spinwheel";
	}
},{});
