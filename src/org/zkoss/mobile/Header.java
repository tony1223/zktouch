package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.sys.ContentRenderer;

public class Header extends JQueryMobileElement {

	private static final long serialVersionUID = -2775407902338585366L;

	private String _label;

	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);

		render(renderer, "label", _label);
	}

	public String getZclass() {
		return this._zclass == null ? "zm-header" : this._zclass;
	}

	/**
	 * @return the header
	 */
	public String getLabel() {
		return _label;
	}

	/**
	 * @param header
	 *            the header to set
	 */
	public void setLabel(String label) {

		if (!Objects.equals(this._label,label)) {
			this._label = label;
			smartUpdate("caption", _label);
		}
	}
}
