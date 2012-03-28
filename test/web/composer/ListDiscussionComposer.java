package composer;
import model.Category;
import model.Discussion;

import org.zkoss.mobile.Header;
import org.zkoss.mobile.Listbox;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.ListModelList;

import dao.CategoryDao;
import dao.DiscussionDao;


public class ListDiscussionComposer extends SelectorComposer<Component> {

	private static final long serialVersionUID = -4755244827866649332L;
	
	@Wire
	private Listbox listbox;
	
	@Wire(value="header")
	private Header header;
	
	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);

		Category category = getCategory();
		
		if(category == null){
			Executions.sendRedirect("index.mbl");
			return ;
		}
		
		header.setCaption("ZK Forum - " + category.getName() + "");
		
		DiscussionDao dao = new DiscussionDao();
		listbox.setModel(new ListModelList<Discussion>(dao.getDiscussions(category.getId())));
	}
	
	
	private Category getCategory(){
		String categoryId = Executions.getCurrent().getParameter("category");
		if(categoryId == null){
			return null;
		}
		try{
			int ind = Integer.parseInt(categoryId);
			return new CategoryDao().getCategory(ind);
		}catch(NumberFormatException ex){ //wrong input
			return null;
		}
	}
	
//	@Listen(value ="onSelect=#listbox" )
//	public void onSelect$listbox(SelectEvent evt){
//		alert(listbox.getSelectedData().toString());
//	}
	
}
