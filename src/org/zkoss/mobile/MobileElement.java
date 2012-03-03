package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.zk.ui.HtmlBasedComponent;
import org.zkoss.zk.ui.sys.ContentRenderer;

abstract public class MobileElement extends HtmlBasedComponent {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1084591057145426578L;

	private String theme;
	
	@Override
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);
		render(renderer, "'_datas.role'", theme);
	}

	/**
	 * @return the theme
	 */
	public String getTheme() {
		return theme;
	}

	/**
	 * @param theme the theme to set
	 */
	public void setTheme(String theme) {
		this.theme = theme;
	}
	
	
}
