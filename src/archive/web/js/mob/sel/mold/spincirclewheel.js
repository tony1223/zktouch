/**
* Here's the mold file , a mold means a HTML struct that the widget really presented.
* yep, we build html in Javascript , that make it more clear and powerful.
*/
function (out) {
	
	this._options = [];
	for(var i=0 , len = (this._end - this._start ); i <= len;++i){
		this._options[ i ] = this._start + i ;
	}
	
	var zcls = this.getZclass(),
		uuid = this.uuid,
		opt = this._options,
		optlen = opt.length,
		len = this._viewsize;

	out.push('<div ', this.domAttrs_(), '><ul id="',uuid,'-body" class="',zcls,'-body">');
	
	if(opt != null){
		for(var i = 0 ; i < len ;++i){
			out.push('<li>',opt[ i % optlen ],"</li>");
		}
	}
	out.push('</ul></div>');

}