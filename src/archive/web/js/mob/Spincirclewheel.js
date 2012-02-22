/**
 * 20120217 1533
 */
mob.Spincirclewheel = zk.$extends(mob.Spinwheel, {
    _options: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], //default value for text attribute
    _viewsize: 30,
    _startRenderIndex: 0, //the current render index
    _endRendererIndex: 0, //the current render end
    _diffItems:10,
	$define: {
	},
	$init: function(){
		this.$supers(mob.Spincirclewheel,'$init', arguments);
		for(var i = 0 ; i < 100 ;++i){
			this._options[i] = i; 
		}
	},
	bind_: function () {
		this.$supers(mob.Spincirclewheel,'bind_', arguments);
		
		this._startRenderIndex = 0 ;
		this._endRendererIndex = ( this._viewsize -1 ) % this._options.length; 
		var diff = this.rendererPrev();
		this.setPosition(diff);
		
	},
	rendererNext: function(){
		var $body = jq(this.$n("body")),
			diffItems = this._diffItems,
			optlen = this._options.length,
			childtar = $body.find("li:nth-child("+diffItems+")"),
			diff = childtar.position().top , 
			prevs = childtar.prevAll();
		
		prevs.hide();

		var out = [];
		this.redrawChild(out,this._endRendererIndex + 1 , this._endRendererIndex + diffItems );
		
		this._startRenderIndex = (this._startRenderIndex + diffItems -1 ) % optlen;
		this._endRendererIndex = (this._endRendererIndex + diffItems -1 ) % optlen;

		this._startScrollY -= diff,
		$body.append(out.join(""));
		prevs.remove();
		return diff;
	},
	rendererPrev: function(){
		var $body = jq(this.$n("body")),
			diffItems = this._diffItems,
			optlen = this._options.length,
			childtar = $body.find("li:nth-child("+(this._viewsize - diffItems +1 )+")"),
			lastchild = $body.find("li:last"),
			diff = (lastchild.position().top ) - childtar.position().top , 
			nexts = childtar.nextAll();
		nexts.hide();
	
		var out = [];
		this.redrawChild(out,(this._startRenderIndex - diffItems +1)  , this._startRenderIndex  );
		
		this._startRenderIndex = (this._startRenderIndex - diffItems + 1 + optlen) % optlen;
		this._endRendererIndex = (this._endRendererIndex - diffItems + 1 + optlen) % optlen;
	
		this._startScrollY += diff,
		$body.prepend(out.join(""));
		nexts.remove();
		return diff;
	},
	redrawChild: function(out,start,end){
		if(this._options){
			var optlen = this._options.length;
			for(var i = start ; i < end ;++i){
				out.push('<li>',this._options[(i+optlen) % optlen],"</li>");
			}
		}
	},
	moveTo_:function(newtop){
		var  n = this.$n("body"), 
		toplimit = n.scrollHeight - 150 ,
		nowpos = this.getPosition(); //215 from parent
		
		this.setPosition(newtop);
		if( nowpos > toplimit - 250  ){ // Note we have to change startScrollY as well
			var diff = this.rendererNext();
			this.setPosition(newtop - diff + 5 );
		}else if(nowpos < 230){
			var diff = this.rendererPrev();
			this.setPosition(newtop + diff + 5 );
		}
	},
	unbind_: function () {
		this.$supers(mob.Spincirclewheel,'unbind_', arguments);
	},
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-spinwheel";
	}
});
