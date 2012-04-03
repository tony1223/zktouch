package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.IdSpace;
import org.zkoss.zk.ui.sys.ContentRenderer;



public class View extends JQueryMobileElement implements IdSpace {
	
	private static final long serialVersionUID = -2775407902338585366L;

	private Boolean active = true;
	private String title;
	
	
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);
		
		render(renderer,"active",active);
		render(renderer,"title",title);
		
	}
	
	public String getZclass() {
		return this._zclass == null ? "zm-page" : this._zclass;
	}

	/**
	 * @return the active
	 */
	public Boolean isActive() {
		return active;
	}

	/**
	 * @param active the active to set
	 */
	public void setActive(Boolean active) {
		if(!Objects.equals( this.active,active)){
			this.active = active;
			smartUpdate("active",active);
		}
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
}
