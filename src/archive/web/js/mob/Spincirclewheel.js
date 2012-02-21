/**
 * 20120217 1533
 */
mob.Spincirclewheel = zk.$extends(mob.Spinwheel, {
    _options: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], //default value for text attribute
    _viewsize: 20,
    _startRenderIndex: 0,
    _endRendererIndex: 0,
    _diffItems:7,
	$define: {
	},
	bind_: function () {
		this.$supers(mob.Spincirclewheel,'bind_', arguments);
		
		this._endRendererIndex = this._viewsize -1 ; 
		//A example for domListen_ , REMEMBER to do domUnlisten in unbind_.
		//this.domListen_(this.$n("cave"), "onClick", "_doItemsClick");
		var diff = this.rendererPrev();
		this.setPosition(diff);
		 zk.log("totalitems",jq(this.$n("body")).find("li").size(),this.$n("body").scrollHeight);
		
	},
	rendererNext: function(){
		var $body = jq(this.$n("body")),
			diffItems = this._diffItems,
			optlen = this._options.length,
			childtar = $body.find("li:nth-child("+diffItems+")");
		var diff = childtar.position().top , prevs = childtar.prevAll();
		prevs.hide();

		var out = [];
		this.redrawChild(out,this._endRendererIndex+1 , this._endRendererIndex+diffItems );
		
		this._startRenderIndex = (this._startRenderIndex + diffItems ) % optlen;
		this._endRendererIndex = (this._endRendererIndex + diffItems ) % optlen;

		this._startScrollY -= diff,
		$body.append(out.join(""));
		prevs.remove();
	    
	    zk.log("next",diff,$body.find("li").size());
		return diff;
	},
	rendererPrev: function(){
		var $body = jq(this.$n("body")),
			diffItems = this._diffItems,
			optlen = this._options.length,
			childtar = $body.find("li:nth-child("+(this._viewsize - diffItems +1 )+")"),
			diff = ($body[0].scrollHeight - 150) - childtar.position().top  , 
			nexts = childtar.nextAll();
		nexts.hide();
	
		var out = [];
		this.redrawChild(out,(this._startRenderIndex - diffItems)  , this._startRenderIndex  );
		
		this._startRenderIndex = (this._startRenderIndex - diffItems + optlen) % optlen;
		this._endRendererIndex = (this._endRendererIndex - diffItems + optlen) % optlen;
		
	
		this._startScrollY += diff,
		$body.prepend(out.join(""));
		nexts.remove();
	    
	    zk.log("prev",diff,$body.find("li").size(),"removed",nexts.size());
		return diff;
	},
	redrawChild: function(out,start,end){
		if(this._options){
			var optlen = this._options.length;
			zk.log("redraw", (start+optlen) % optlen,(end+optlen) % optlen);
			for(var i = start ; i < end ;++i){
				out.push('<li>',this._options[(i+optlen) % optlen],"</li>");
			}
		}
	},
	_doTouchMove: function (e){
		var  n = this.$n("body"), 
		newtop = this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY) + 5 ,
		toplimit = n.scrollHeight - 150 ,
		nowpos = this.getPosition(); //215 from parent
		
		this.setPosition(newtop);
		
		zk.log("check",180,nowpos,toplimit - 150);
		if( nowpos > toplimit - 150  ){ // Note we have to change startScrollY as well
			var diff = this.rendererNext();
			zk.log("go next",newtop,diff);
			this.setPosition(newtop - dif + 5 );
		}else if(nowpos < 130){
			var diff = this.rendererPrev();
			zk.log("go prev",newtop,diff);
			this.setPosition(newtop + dif + 5 );
		}
			
	},
	_doTouchEnd: function (e){
		try{
			this.$n("body").scrollTop = this._startScrollY  - (this._getFirstTouch(e).pageY - this._startY) + 5 ;
		}catch(ex){
			console.log(ex);
		}
		jq(document).unbind("touchstart");
		if(window.parent) parent.console.log("hi");
	},
	lockScreen: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},
	unbind_: function () {
		this.$supers(mob.Spinwheel,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-spinwheel";
	}
});
