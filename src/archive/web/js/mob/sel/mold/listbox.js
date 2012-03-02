function (out) {
	var zcls = this.getZclass(),
		uuid = this.uuid;

	out.push('<ul ', this.domAttrs_(), '  data-role="listview" data-inset="true" ' , /*'data-filter="true"', */ ' >');
	
	for(var child =this.firstChild ; child ; child = child.nextSibling){
		child.redraw(out);
	}
	
	out.push('</ul>');
}
