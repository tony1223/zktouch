package org.zkoss.mobile;

public interface ListitemRenderer<T> {
	public void render(Listitem item, T data, int index) throws Exception;
}
