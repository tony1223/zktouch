package org.zkoss.mobile;



public class Page extends MobileElement  {
	
	private static final long serialVersionUID = -2775407902338585366L;

	public String getZclass() {
		return this._zclass == null ? "zm-page" : this._zclass;
	}
}
