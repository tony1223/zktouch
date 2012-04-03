package org.zkoss.mobile.event;

import org.zkoss.mobile.View;

public class Pages {
	public static void changePage(View from , View to ,boolean detachOld){
		from.getParent().appendChild(to);
		from.detach();
	}
}
