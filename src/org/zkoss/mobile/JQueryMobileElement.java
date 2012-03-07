package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.sys.ContentRenderer;

abstract public class JQueryMobileElement extends MobileElement{
	
	private static final long serialVersionUID = 876179161515520301L;

	private String theme;
	
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);
		
		if(theme != null){
			render(renderer,"theme",theme);
		}
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
		
		if(!Objects.equals(theme, this.theme)){
			this.theme = theme;
			smartUpdate("theme", theme);
		}
		
	}

}
