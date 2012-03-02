package org.zkoss.mobile;

import java.io.IOException;

import org.zkoss.zk.ui.sys.ContentRenderer;


public class Spincirclewheel extends Spinwheel  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6582977528114690170L;

	private Integer start;
	private Integer end;
	
	protected void renderProperties(ContentRenderer renderer)
			throws IOException {
		super.renderProperties(renderer);
		
		render(renderer, "start", start);
		render(renderer, "end", end);
		
	}
	
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-spinwheel");
	}


	/**
	 * @return the start
	 */
	public Integer getStart() {
		return start;
	}


	/**
	 * @param start the start to set
	 */
	public void setStart(Integer start) {
		this.start = start;
	}


	/**
	 * @return the end
	 */
	public Integer getEnd() {
		return end;
	}


	/**
	 * @param end the end to set
	 */
	public void setEnd(Integer end) {
		this.end = end;
	}
}

