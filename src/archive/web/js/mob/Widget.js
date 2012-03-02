mob.Widget = zk.$extends(zk.Widget,{
	getTouchEvt_: function (e){
		return e.domEvent.originalEvent;
	}
});

