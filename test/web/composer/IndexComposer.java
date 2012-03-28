package composer;
import model.Category;

import org.zkoss.mobile.Listbox;
import org.zkoss.mobile.event.SelectEvent;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.ListModelList;

import dao.CategoryDao;


public class IndexComposer extends SelectorComposer<Component> {

	private static final long serialVersionUID = -4755244827866649332L;
	
	@Wire
	private Listbox listbox;
	
	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);
		
		CategoryDao dao = new CategoryDao();
		listbox.setModel(new ListModelList<Category>(dao.getAllCategorys()));
	}
	
//	@Listen(value ="onSelect=#listbox" )
//	public void onSelect$listbox(SelectEvent evt){
//		alert(listbox.getSelectedData().toString());
//	}
	
}
