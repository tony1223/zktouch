package org.zkoss.mobile;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.event.Events;

public class Button extends FormElement {
	private static final long serialVersionUID = 8032044902725737099L;
	//FIXME Icons
	static{
		addClientEvent(Button.class, Events.ON_CLICK, 0);
	}
	
	private String _label;
	private String _href;
	private Boolean _inline = false;

	//super//
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);

		if( _label != null)
			render(renderer, "label", _label);
		
		if( _href != null)
			render(renderer, "href", _href);

		if(_inline){
			render(renderer,"inline" , _inline);
		}
		
	}

	/**
	 * @return the _label
	 */
	public String getLabel() {
		return _label;
	}

	/**
	 * @param _label the _label to set
	 */
	public void setLabel(String label) {
		if(!Objects.equals(_label, label)){
			this._label = label;
			smartUpdate("label",label);
		}
	}

	/**
	 * @return the _href
	 */
	public String getHref() {
		return _href;
	}

	/**
	 * @param _href the _href to set
	 */
	public void setHref(String href) {
		this._href = href;
		if(!Objects.equals(_href, href)){
			this._href = href;
			smartUpdate("href", href);
		}		
	}
	
	public String getZclass() {
		return this._zclass == null ? "zm-button" : this._zclass;
	}

	/**
	 * @return the inline
	 */
	public Boolean getInline() {
		return _inline;
	}

	/**
	 * @param inline the inline to set
	 */
	public void setInline(Boolean inline) {
		
		if(!Objects.equals(this._inline , inline)){
			this._inline = inline;
			smartUpdate("inline",_inline);
		}		
	}

}
