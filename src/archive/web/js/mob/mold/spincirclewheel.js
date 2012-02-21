/**
* Here's the mold file , a mold means a HTML struct that the widget really presented.
* yep, we build html in Javascript , that make it more clear and powerful.
*/
function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		opt = this._options,
		len = opt.length < this._viewsize ? opt.length : this._viewsize;

	out.push('<div ', this.domAttrs_(), '><ul id="',uuid,'-body" class="',zcls,'-body">');
	
	if(opt != null){
		for(var i = 0 ; i < len ;++i){
			out.push('<li>',opt[i],"</li>");
		}
	}
	out.push('</ul></div>');

}