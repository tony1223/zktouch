package dao;
import java.util.Arrays;
import java.util.List;

import model.Discussion;


public class DiscussionDao {

	public List<Discussion> getDiscussions(int category){
		return Arrays.asList(new Discussion[]{
				new Discussion(1,"Ryan","ZK6, MVVM and Include.setSrc() question","...."),
				new Discussion(2,"Matthew","ZK6, MVVM and Data Filter on Grid","...."),
				new Discussion(3,"Simon","Background image of button component","...."),
				new Discussion(4,"Tony","Tree not rendered/displayed correctly, MVVM, ZK6","...."),
				new Discussion(5,"Tony","Debugging where an exception occur in zul page.","...."),
				new Discussion(6,"Tony","@command and close window","...."),
				new Discussion(7,"Tony","ZK Calendars weekly view bug?","...."),
				new Discussion(8,"Tony","How to extend DesktopEventQueue?","...."),
				new Discussion(9,"Tony","ZK6, select an event queue for a @GlobalCommand","...."),
				new Discussion(10,"Tony","is it suitable to develop a public website by ZK?","...."),
				new Discussion(11,"Tony","Autocomplete Combobox with huge data in MVVM","...."),
				new Discussion(12,"Tony","SelectedItem not highlighted","...."),
				new Discussion(13,"Tony","Using Sping's @Value in SelectorComposer; is it possible","...."),
				new Discussion(14,"Tony","Where i can see all my thread(s) in the zk forum","...."),
				new Discussion(15,"Tony","Gridbox and filter","...."),
		});
	}
}
