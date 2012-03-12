package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.sys.ContentRenderer;

public class Header extends JQueryMobileElement {

	private static final long serialVersionUID = -2775407902338585366L;

	private String _caption;

	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);

		render(renderer, "caption", _caption);
	}

	public String getZclass() {
		return this._zclass == null ? "zm-header" : this._zclass;
	}

	/**
	 * @return the header
	 */
	public String getCaption() {
		return _caption;
	}

	/**
	 * @param header
	 *            the header to set
	 */
	public void setCaption(String caption) {

		if (!Objects.equals(this._caption, caption)) {
			this._caption = caption;
			smartUpdate("caption", _caption);
		}
	}
}
