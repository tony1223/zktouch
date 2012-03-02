function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid;
	
	out.push('<li ',this.domAttrs_(),' ><a href="', (this._href == null ? '#' : this._href ),'">', this._label ,'</a></li>');
	
}
