package dao;
import java.util.Arrays;
import java.util.List;

import model.Category;


public class CategoryDao {

	public List<Category> getAllCategorys(){
		return Arrays.asList(new Category[]{
				new Category(1,"Help",14615,57095),
				new Category(2,"ZK Studio",3023,5313),
				new Category(3,"General",222,500),
				new Category(4,"Announcements",105,132)
		});
	}
	
	public Category getCategory(int ind){
		switch(ind){
			case 1:
				return new Category(1,"Help",14615,57095);
			case 2:
				return new Category(2,"ZK Studio",3023,5313);
			case 3:
				return new Category(3,"General",222,500);
			case 4:
				return new Category(4,"Announcements",105,132);
			default: throw new IllegalStateException("no other data in the test case!");
		}
	}
}
