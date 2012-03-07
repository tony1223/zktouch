package org.zkoss.mobile.event;

import org.zkoss.mobile.Page;

public class Pages {
	public static void changePage(Page from , Page to ,boolean detachOld){
		from.getParent().appendChild(to);
		from.detach();
	}
}
