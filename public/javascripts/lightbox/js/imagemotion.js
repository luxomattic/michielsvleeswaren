/***********************************************
* Muti-Use ImageMotion - © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/
* Author John Davenport Scheuer - username:jscheuer1
***********************************************/

function ImageMotion(slide, id){
	if(!document.getElementById){
		return;
	}
	if(!ImageMotion.ar){
		ImageMotion.ar = [];
	}
	slide = isNaN(slide - 0) || typeof slide === 'undefined' ? ImageMotion.sliders[ImageMotion.ar.length] : ImageMotion.sliders[slide];
	slide.id = id || slide.id;
	var cObj = ImageMotion.ar[ImageMotion.ar.length] = this;
	this.vertical = slide.vertical;
	this.backward = slide.backward;
	this.orient = this.vertical? 'top' : 'left';
	this.slide = slide.join(slide.imageGap) + slide.imageGap;
	this.width = slide.width;
	this.height = slide.height;
	this.copyspeed = this.speed = slide.speed;
	this.deathrate = slide.deathrate;
	this.tspan = document.createElement(this.vertical? 'div' : 'span');
	if(this.vertical){
		this.tspan.style.width = this.width + 'px';
		this.tspan.className = 'VerticalImageMotion';
	}
	else{
		this.tspan.style.whiteSpace = 'nowrap';
	}
	this.tspan.style.visibility = 'hidden';
	this.tspan.style.position = 'absolute';
	this.tspan.style.top = this.tspan.style.left = '-9000px';
	document.body.insertBefore(this.tspan, document.body.firstChild)
	this.tspan.innerHTML = this.slide;
	this.startposition = slide.startposition || 0;
	this.maxspeed = slide.maxspeed || 7;
	this.restarea = slide.restarea || 6;
	this.moveatleast = slide.moveatleast;
	this.mousedriven = slide.mousedriven;
	this.mouseholder = document.createElement('div');
	this.mouseholder.style.position = 'relative';
	this.mouseholder.style.width = this.width + 'px';
	this.mouseholder.style.height = this.height + 'px';
	this.mouseholder.style.overflow = 'hidden';
	this.mousereact = this.mouseholder.cloneNode(false);
	this.mousereact.style.position = 'absolute';
	this.mousereact.style.backgroundColor = slide.bgColor;
	if(!this.mousedriven){
		this.mousereact.onmouseover = function(){cObj.copyspeed = 0;};
		this.mousereact.onmouseout = function(){if(!cObj.halt)cObj.copyspeed = cObj.speed;};
	}
	this.slide1 = document.createElement('div');
	this.slide1.style.position = 'absolute';
	this.slide1.style.left = this.slide1.style.top = 0;
	this.slide2 = this.slide1.cloneNode(false);
	if(this.vertical){
		this.mouseholder.className = 'VerticalImageMotion';
	}
	else {
		this.slide1.style.whiteSpace = this.slide2.style.whiteSpace = 'nowrap';
	}
	this.slide2.style[this.orient] = '-1000px';
	this.mousereact.appendChild(this.slide1);
	this.mousereact.appendChild(this.slide2);
	this.mouseholder.appendChild(this.mousereact);
	document.getElementById(slide.id).appendChild(this.mouseholder);
	this.checkImages(this.tspan.getElementsByTagName('img'));
	this.fillup();
}

ImageMotion.prototype = {

	getposOffset: function(){
		var totaloffset = this.mouseholder[this.offsettype], parentEl = this.mouseholder.offsetParent;
		while (parentEl){
			totaloffset += parentEl[this.offsettype];
			parentEl = parentEl.offsetParent;
		}
		return totaloffset;
	},

	pageY: (function(){return typeof pageYOffset === 'number'?
			function(){return pageYOffset;} :
		document.compatMode && document.compatMode !== 'BackCompat'?
			function(){return document.documentElement.scrollTop} :
			function(){return document.body.scrollTop;};
	})(),

	pageX: (function(){return typeof pageXOffset === 'number'?
			function(){return pageXOffset;} :
		document.compatMode && document.compatMode !== 'BackCompat'?
			function(){return document.documentElement.scrollLeft} :
			function(){return document.body.scrollLeft;};
	})(),

	stopCond: (function(){return typeof event !== 'undefined'?
			function(){return !this.mousereact.contains(event.toElement);} :
			function(e){
				var a = e.currentTarget, b = e.relatedTarget;
				if(b && a === b) {return false;}
				while(b && b.parentNode){
					if((b = b.parentNode) === a){
						return false;
					}
				}
				return true;
			};
	})(),

	reportImages: function(ims){
		if(ims.c === ims.length){
			this.imagesLoaded = true;
			return;
		}
		var cObj = this;
		setTimeout(function(){cObj.reportImages(ims);}, 300);
	},

	checkImages: function(ims){
		var i = 0, lims = [];
		lims.c = 0;
		for(i; i < ims.length; ++i){
			lims[i] = new Image();
			lims[i].onload = function(){
				++(lims.c);
			};
			lims[i].src = ims[i].src;
		}
		this.reportImages(lims);
	},

	motionengine: function(e){
		e = e || window.event;
		var curpos = e['client' + this.xy] - this.getposOffset() + this['page' + this.xy](),
		outbound = (this.mouseholder[this.off] + this.restarea) / 2,
		backbound = (this.mouseholder[this.off] - this.restarea) / 2;
		if(curpos > outbound){
			this.copyspeed = Math.round((curpos - outbound) / backbound * this.maxspeed);
			this.backward = false;
		}
		else if(curpos < backbound){
			this.copyspeed = Math.round((backbound - curpos) / backbound * this.maxspeed);
			this.backward = true;
		}
		else {
			this.copyspeed = 0;
		}
	},

	slowdeath: function(ts){
		if(this.copyspeed > ts){
			this.copyspeed -= 1;
		}
		else if(this.copyspeed < ts){
			this.copyspeed += 1;
		}
		if(this.copyspeed !== ts){
			var cObj = this;
			this.timer = setTimeout(function(){cObj.slowdeath(ts);}, this.deathrate || 100);
		}
	},

	stopmotion: function(e){
		if(this.stopCond(e)){
			this.slowdeath(this.moveatleast || 0);
		}
	},

	fillup: function(){
		var cObj = this;
		if(!this.imagesLoaded){
			setTimeout(function(){cObj.fillup();}, 300);
			return;
		}
		this.slide1.innerHTML = this.slide2.innerHTML = this.slide;
		this.xy = this.vertical? 'Y' : 'X';
		this.off = this.vertical? 'offsetHeight' : 'offsetWidth';
		this.offsettype = this.vertical? 'offsetTop' : 'offsetLeft';
		this.movedimention = this.tspan[this.off];
		this.slide2.style[this.orient] = this.movedimention + 'px';
		if(this.startposition){
			this.copyspeed = this.startposition;
			this.moveslide();
			this.backward = !this.backward;
			this.copyspeed = 1;
			this.moveslide();
			this.backward = !this.backward;
			this.moveslide();
			this.copyspeed = this.speed;
		}
		if(this.mousedriven){		
			this.mousereact.onmousemove = function(e){if(!cObj.halt)cObj.motionengine(e);};
			this.mousereact.onmouseout = function(e){if(!cObj.halt)cObj.stopmotion(e);};
		}
		this.movetime = setInterval(function(){cObj.moveslide();}, 30);
	},

	moveslide: function(){
		if(this.copyspeed === 0){return;}
		var pos1 = parseInt(this.slide1.style[this.orient]), pos2 = parseInt(this.slide2.style[this.orient]),
		cs = this.copyspeed, md = this.movedimention;
		if(this.backward){
			this.slide1.style[this.orient] = pos1 < md - 8? pos1 + cs + 'px' : pos2 - md + cs + 'px';
			this.slide2.style[this.orient] = pos2 < md - 8? pos2 + cs + 'px' : pos1 - md + cs + 'px';
		}
		else{
			this.slide1.style[this.orient] = pos1 > 8 - md? pos1 - cs + 'px' : pos2 + md - cs + 'px';
			this.slide2.style[this.orient] = pos2 > 8 - md? pos2 - cs + 'px' : pos1 + md - cs + 'px';
		}
	},

	init: (function(){
		ImageMotion.init = function(){
			for(var i = 0; i < ImageMotion.sliders.length; ++i){
				new ImageMotion();
			}
		};
	})()

};
document.write('<style type="text/css">.VerticalImageMotion img { display: block; }<\/style>');