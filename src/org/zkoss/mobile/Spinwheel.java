package org.zkoss.mobile;

import org.zkoss.lang.Objects;

public class Spinwheel extends MobileElement  {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2854437336014083175L;
	private String _text;

	public String getText() {
		return _text;
	}

	public void setText(String text) {

		if (!Objects.equals(_text, text)) {
			_text = text;
			smartUpdate("text", _text);
		}
	}


	//super//
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "text", _text);
	}

	/**
	 * The default zclass is "z-spinwheel"
	 */
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-spinwheel");
	}
}

