package org.zkoss.mobile.event;

import java.util.Map;

import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.Events;

public class SelectEvent extends Event {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2096697210751306299L;
	private String href;
	private String label;
	private Integer selectedIndex;
	
	public SelectEvent(String name, Component target, String href, String label,
			Integer selectedIndex) {
		super(name,target);
		this.href = href;
		this.label = label;
		this.selectedIndex = selectedIndex;
	}
	
	public SelectEvent(String name, Component target, Object data) {
		super(name, target, data);
	}


	public SelectEvent(String name, Component target) {
		super(name, target);
	}


	public SelectEvent(String name) {
		super(name);
	}

	public static final SelectEvent getSelectEvent(AuRequest request) {
		final Map<String, Object> data = request.getData();
		
		String href = (String) data.get("href");
		String label= (String)  data.get("label");
		Integer index =  (Integer)  data.get("selInd");
		
		return new SelectEvent(Events.ON_SELECT,request.getComponent(),href, label, index);
		
	}
	/**
	 * @return the href
	 */
	public String getHref() {
		return href;
	}
	/**
	 * @param href the href to set
	 */
	public void setHref(String href) {
		this.href = href;
	}
	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * @return the selectedIndex
	 */
	public Integer getSelectedIndex() {
		return selectedIndex;
	}
	/**
	 * @param selectedIndex the selectedIndex to set
	 */
	public void setSelectedIndex(Integer selectedIndex) {
		this.selectedIndex = selectedIndex;
	}
	
}
