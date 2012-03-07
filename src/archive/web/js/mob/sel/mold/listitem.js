function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid;
	
	out.push('<li ',this.domAttrs_(),' >');
	
	if(!this._divider)
		out.push('<a href="', (this._href == null ? '#' : this._href ),'">');
	
	/*
	 * TODO XML escaping
	 */
	out.push( this._label );
	
	this.eachChild(function(index,child){ 
		this.redraw(out);
	});
	
	if(!this._divider)
		out.push('</a>');
	
	out.push('</li>');
	
}
