package org.zkoss.mobile;


public class Listbox extends MobileElement  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1531749351114872620L;

	//super//
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);

	}

	/**
	 * The default zclass is "z-listbox"
	 */
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-listbox");
	}
}
