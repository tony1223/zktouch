package model;

public class Category {

	private int id;
	private String name;
	private int threads;
	private int posts;

	public Category(int id, String name, int threads, int posts) {
		super();
		this.id = id;
		this.name = name;
		this.threads = threads;
		this.posts = posts;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the threads
	 */
	public int getThreads() {
		return threads;
	}

	/**
	 * @param threads
	 *            the threads to set
	 */
	public void setThreads(int threads) {
		this.threads = threads;
	}

	/**
	 * @return the posts
	 */
	public int getPosts() {
		return posts;
	}

	/**
	 * @param posts
	 *            the posts to set
	 */
	public void setPosts(int posts) {
		this.posts = posts;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

}
