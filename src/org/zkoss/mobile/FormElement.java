package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.sys.ContentRenderer;

public class FormElement extends MobileElement {
	private static final long serialVersionUID = -5450395414499486848L;
	
	private Boolean _mini = false;
	
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);
		
		if( _mini ){
			render(renderer,"mini",_mini);
		}
	}
	
	/**
	 * @return the mini
	 */
	public Boolean isMini() {
		return _mini;
	}

	/**
	 * @param mini the mini to set
	 */
	public void setMini(Boolean mini) {
		if(!Objects.equals(_mini, mini)){
			this._mini = mini;
			smartUpdate("mini", _mini);
		}		
	}	
	
}
