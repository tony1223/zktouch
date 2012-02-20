<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

.z-spinwheel{
	display: table-cell;
	height: 100%;
	padding-top: 215px;
	border-left: 2px solid #0D0E0F;
	background-color: #FCFCFC;
	background-image: url(${c:encodeURL('~./zul/img/spinwheel/sw-slot-border.png')});
	background-position: 0 0, 100% 0;
	background-repeat: repeat-y;		 
	
	text-align: center;
	font-family: helvetica, sans-serif;
}

.z-spinwheel ul{
	-webkit-transition-timing-function: cubic-bezier(0, 0, 0.2, 1); 
	-webkit-transition-duration: 0ms; 
	-webkit-transform: translate3d(0px, -132px, 0px);
	padding: 0 0 107px 0;
	margin: 0;
	position:relative;
	list-style: none;	
	overflow:hidden;
}

.z-spinwheel li{
	padding: 0 8px;
	height: 44px;
	overflow: hidden;
	font: bold 24px/44px Helvetica,sans-serif;
}

.z-slot{
	position:relative;
}

.z-slot-frame{
	position: absolute;
	top:0;
	z-index: 1000;
	left: 0;
	right: 0;
	height: 185px;
	border-width: 16px;
	-webkit-border-image: url(${c:encodeURL('~./zul/img/spinwheel/sw-alpha.png')}) 16;
}

.z-slot-cave{	
	position: relative;
	z-index: 999;
	display: block;
	height: 215px;
	padding: 0 10px;
	overflow: hidden;
	border:1px outset black;
}

.z-slot-body{	
	display: table;
	width: 100%;
	background: #FCFCFC;
}