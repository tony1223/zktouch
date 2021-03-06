package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.sys.ContentRenderer;

public class Listitem extends JQueryMobileElement {
	private static final long serialVersionUID = -4349016012482103087L;
	private String _label;
	private String _href;
	private String _mode;
	private boolean _divider = false;
	
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);

		render(renderer, "label", _label);

		render(renderer, "href", _href);

		render(renderer, "mode", _mode);
		
		if(_divider)
			render(renderer,"divider",_divider);
		
	}

	/**
	 * @return the label
	 */
	public String getLabel() {
		return _label;
	}

	/**
	 * @param label
	 *            the label to set
	 */
	public void setLabel(String label) {
		if(!Objects.equals(label, this._label)){
			this._label = label;
			smartUpdate("label", _label);
		}
		
	}

	/**
	 * @return the href
	 */
	public String getHref() {
		return _href;
	}

	/**
	 * @param href
	 *            the href to set
	 */
	public void setHref(String href) {
		this._href = href; //FIXME smartupdate
	}

	public String getZclass() {
		return _zclass == null ? "zm-listitem" : _zclass;
	}

	/**
	 * "divider"
	 * 
	 * @return the mode
	 */
	public String getMode() {
		return _mode;
	}

	/**
	 * @param mode
	 *            the mode to set
	 */
	public void setMode(String mode) {
		this._mode = mode; //FIXME smartupdate
	}

	/**
	 * @return the divider
	 */
	public boolean isDivider() {
		return _divider;
	}

	/**
	 * @param divider the divider to set
	 */
	public void setDivider(boolean divider) {
		this._divider = divider; //FIXME smartupdate
	}
}
