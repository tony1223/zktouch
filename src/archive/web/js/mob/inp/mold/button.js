function (out){
//	<a href="buttons-types.html" data-role="button" data-transition="fade" class="ui-btn-active">Basics</a>
	var zcls = this.getZclass(),
	uuid = this.uuid;

	out.push('<a ', this.domAttrs_(), ' ');	
	if(this._href) {
		out.push(' href="', this._href,'" ');
	}
	out.push('>');
	if(this._label) {
		out.push(this._label);
	}
	this.redrawChildren(out);
	out.push("</a>");
	
}