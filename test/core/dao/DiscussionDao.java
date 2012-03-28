package dao;
import java.util.Arrays;
import java.util.List;

import model.Discussion;


public class DiscussionDao {

	public List<Discussion> getDiscussions(int category){
		return Arrays.asList(new Discussion[]{
				new Discussion(1,"Ryan","ZK6, MVVM and Include.setSrc() question","...."),
				new Discussion(2,"zes","ZK6, MVVM and Data Filter on Grid","...."),
				new Discussion(3,"Senthilchettyin","Background image of button component","...."),
				new Discussion(4,"ajvan","Tree not rendered/displayed correctly, MVVM, ZK6","...."),
				new Discussion(5,"ajvan","Tree not rendered/displayed correctly, MVVM, ZK6","...."),
				new Discussion(6,"ajvan","Tree not rendered/displayed correctly, MVVM, ZK6","...."),
		});
	}
}
