package composer;
import java.util.Date;

import model.Category;
import model.Comment;

import org.zkoss.mobile.Header;
import org.zkoss.mobile.Listbox;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.ListModelList;

import dao.CategoryDao;


public class ListCommentComposer extends SelectorComposer<Component> {

	private static final long serialVersionUID = -4755244827866649332L;
	
	@Wire
	private Listbox listbox;
	
	@Wire(value="header")
	private Header header;
	
	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);
//
//		Category category = getCategory();
//		
//		if(category == null){
//			Executions.sendRedirect("index.mbl");
//			return ;
//		}
//		
		header.setCaption("Discussion - ZK6, MVVM and Include.setSrc() question ");
		
		ListModelList<Comment> list = new ListModelList<Comment>();
		Date d =  new Date();
		Date d2 = new Date();
		d2.setDate(d2.getDate()+2);
		Date d3=  new Date();
		d3.setDate(d2.getDate()+3);
		list.add(new Comment("I'm playing around with ZK and MVVN but have a problem with setting source on the Include component.  The Include: \n<include src=\"@load(vm.mySrc)\"> .... "
				, "Ryan" ,
				new Date()
		));
		
		list.add(new Comment("Hi , please try this sample. (http:///www.xxx.xxx.xx)", "Tony" ,new Date()));
		list.add(new Comment("Yep , it works like a charm.", "Ryan" ,new Date()));
		
//		
//		DiscussionDao dao = new DiscussionDao();
		listbox.setModel(list);
	}

//	@Listen(value ="onSelect=#listbox" )
//	public void onSelect$listbox(SelectEvent evt){
//		alert(listbox.getSelectedData().toString());
//	}
	
}
