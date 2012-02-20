/**
* Here's the mold file , a mold means a HTML struct that the widget really presented.
* yep, we build html in Javascript , that make it more clear and powerful.
*/
function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid,
		opt = this._options;

	out.push('<div ', this.domAttrs_(), '>');
	
	out.push('<div class="',zcls,'-cave">');
	
	out.push('<div class="',zcls,'-body">');
	for (var w = this.firstChild; w; w = w.nextSibling)
		w.redraw(out);
	out.push('</div>');
	
	out.push('</div>');
	
	out.push('<div class="',zcls,'-frame" id="',uuid,'-frame"></div>');
	
	out.push('</div>');
}
