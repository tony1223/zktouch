package org.zkoss.mobile;

import org.zkoss.lang.Objects;
import org.zkoss.xel.VariableResolver;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.util.ComponentCloneListener;
import org.zkoss.zk.ui.util.ForEachStatus;
import org.zkoss.zk.ui.util.Template;
import org.zkoss.zul.ListModel;
import org.zkoss.zul.event.ListDataEvent;
import org.zkoss.zul.event.ListDataListener;
import org.zkoss.zul.event.ZulEvents;
import org.zkoss.zul.ext.Selectable;


public class Listbox extends MobileElement  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1531749351114872620L;

	private transient boolean filter = false;
	
	private transient ListModel<?> _model;
	private transient ListitemRenderer<?> _renderer;
	private transient ListDataListener _dataListener;
	
	
	//super//
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);

		if(filter != true)
			render(renderer, "filter", filter);

	}

	/**
	 * The default zclass is "zm-listbox"
	 */
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "zm-listbox");
	}

	/**
	 * @return the filter
	 */
	public boolean isFilter() {
		return filter;
	}

	/**
	 * @param filter the filter to set
	 */
	public void setFilter(boolean filter) {
		this.filter = filter;
	}

	/**
	 * @return the _model
	 */
	public ListModel<?> getModel() {
		return _model;
	}

	/**
	 * @param _model the _model to set
	 */
	public void setModel(ListModel<?> model) {
		if (model != null) {
			if (!(model instanceof Selectable))
				throw new UiException(model.getClass() + " must implement "+Selectable.class);

			if (_model != model) {
				if (_model != null) {
					_model.removeListDataListener(_dataListener);
				}
				_model = model;
				initDataListener();
			}

			//Since user might setModel and setRenderer separately or repeatedly,
			//we don't handle it right now until the event processing phase
			//such that we won't render the same set of data twice
			//--
			//For better performance, we shall load the first few row now
			//(to save a roundtrip)
			postOnInitRender(null);

		} else if (_model != null) {
			_model.removeListDataListener(_dataListener);
			getChildren().clear();
			_model = null;
		}
	}

	/**
	 * @return the _renderer
	 */
	public ListitemRenderer<?> getItemRenderer() {
		return _renderer;
	}
	
	private void initDataListener(){
		if (_dataListener == null)
			_dataListener = new ListDataListener() {
				public void onChange(ListDataEvent event) {
					// Bug B30-1906748.zul
					switch (event.getType()) {
					case ListDataEvent.SELECTION_CHANGED:
						doSelectionChanged();
						return; //nothing changed so need to rerender
					case ListDataEvent.MULTIPLE_CHANGED:
						return; //nothing to do
					}
					postOnInitRender(null);
				}

			};

		_model.addListDataListener(_dataListener);
	}
	/** Sets the renderer which is used to render each item
	 * if {@link #getModel} is not null.
	 *
	 * <p>Note: changing a render will not cause the listbox to re-render.
	 * If you want it to re-render, you could assign the same model again 
	 * (i.e., setModel(getModel())), or fire an {@link ListDataEvent} event.
	 *
	 * @param renderer the renderer, or null to use the default.
	 * @exception UiException if failed to initialize with the model
	 * @since 3.0.2
	 */
	
	public void setItemRenderer(ListitemRenderer<?> renderer) {
		_renderer = renderer;
	}

	
	
	/** TODO models ***/

	@SuppressWarnings("unchecked")
	private <T> ListitemRenderer<T> getRealRenderer(){
		return _renderer == null ?  (ListitemRenderer<T>)  _defRender :  (ListitemRenderer<T>) _renderer;
	}
	
	@SuppressWarnings("unchecked")
	private <T> Selectable<T> getSelectableModel() {
		return (Selectable<T>)_model;
	}
	
	private void doSelectionChanged() {
		final Selectable<Object> smodel = getSelectableModel();
		
		//FIXME implements this later 
	}
	
	private void postOnInitRender(String idx) {
		//20080724, Henri Chen: optimize to avoid postOnInitRender twice
		if (getAttribute("mob.Listbox.ON_INITRENDER") == null) {
	  		//Bug #2010389
			setAttribute("mob.Listbox.ON_INITRENDER", Boolean.TRUE); //flag syncModel
			Events.postEvent("onInitRender", this, idx);
		}
	}	
	
	/** Handles a private event, onInitRender. It is used only for
	 * implementation, and you rarely need to invoke it explicitly.
	 * @since 3.0.2
	 */
	public void onInitRender(Event event) {
  		//Bug #2010389
		removeAttribute("zul.Combobox.ON_INITRENDER"); //clear syncModel flag

		ListModel<?> model = _model;
		if(model == null){
			throw new IllegalStateException("model shouldn't be null.");
		}

		try {
			getChildren().clear();
			ListitemRenderer<Object> renderer = getRealRenderer();
			for(int i = 0 ; i < model.getSize(); ++i){
				Listitem item = new Listitem();
				this.appendChild(item);
				renderer.render(item, model.getElementAt(i), i);
			}
		} catch (Exception e) {
			throw UiException.Aide.wrap(e);
		}		
		
		Events.postEvent("onInitRenderLater", this, null);// notify databinding load-when. 
		Events.postEvent(ZulEvents.ON_AFTER_RENDER, this, null);// notify the combobox when items have been rendered. 
	}
		
	
	
	
	private static final org.zkoss.mobile.ListitemRenderer<Object> _defRender= new org.zkoss.mobile.ListitemRenderer<Object>() {
			public void render(Listitem item,final Object data,final int index) throws Exception {
				final Listbox cb = (Listbox) item.getParent();
				final Template tm = cb.getTemplate("model");
				if (tm == null) {
					item.setLabel(Objects.toString(data));
				} else {
					final Component[] items = tm.create( item.getParent(), item,
						new VariableResolver() {
							public Object resolveVariable(String name) {
								if ("each".equals(name)) {
									return data;
								} else if ("forEachStatus".equals(name)) {
									return new ForEachStatus() {
										public ForEachStatus getPrevious() {
											return null;
										}
										public Object getEach() {
											return data;
										}
										public int getIndex() {
											return index;
										}
										public Integer getBegin() {
											return 0;
										}
										public Integer getEnd() {
											return cb.getModel().getSize();
										}
									};
								} else {
									return null;
								}
							}
						}, null);
					if (items.length != 1 && items[0] != null)
						throw new UiException("The model template must have exactly one item, not "+items.length);

					if (!(items[0] instanceof Listitem))
						throw new UiException("The model template must have exactly one listitem, not "+ items[0].getClass());

					item.setAttribute("org.zkoss.mobile.model.renderAs", items[0]);
						//indicate a new item is created to replace the existent one
					item.detach();
				}
			}
	};
	
	/** TODO models ***/
	
	
	/***
	 */
	//Cloneable//
	public Object clone() {
		final Listbox clone = (Listbox)super.clone();
		if (clone._model != null) {
			if (clone._model instanceof ComponentCloneListener) {
				final ListModel<?> model = (ListModel<?>) ((ComponentCloneListener) clone._model).willClone(clone);
				if (model != null)
					clone._model = model;
			}
			clone._dataListener = null;
			clone.initDataListener();
		}		
		return clone;
	}
	
	//	Serializable//
	private void readObject(java.io.ObjectInputStream s)
	throws java.io.IOException, ClassNotFoundException {
		s.defaultReadObject();

		if (_model != null) {
			initDataListener();
		}
	}
}
