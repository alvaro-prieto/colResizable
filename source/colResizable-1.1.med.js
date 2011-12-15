
/**
               _ _____           _          _     _      
              | |  __ \         (_)        | |   | |     
      ___ ___ | | |__) |___  ___ _ ______ _| |__ | | ___ 
     / __/ _ \| |  _  // _ \/ __| |_  / _` | '_ \| |/ _ \
    | (_| (_) | | | \ \  __/\__ \ |/ / (_| | |_) | |  __/
     \___\___/|_|_|  \_\___||___/_/___\__,_|_.__/|_|\___| 
	 
	v 1.0 - a jQuery plugin by Alvaro Prieto Lauroba
	
	Licences: MIT & GPL
	Feel free to use or modify this plugin as far as my full name is kept	
	
	If you are going to use this plugin in production environments it is  
	strongly recomended to use its minified version: colResizable.min.js


	F false
	I parseInt
	M Math
	D drag 
	T tables 
	c count
	X id
	p PX
	S SIGNATURE
	k ie
	o init
	O options
	Y destroy
	t.o t.opt
	t.s t.cs
	t.d t.gc
	d tb (local)
	G createGrips
	h th (local)
	t.l t.ln 
	w onMouseGripDown
	g syncGrips
	C syncCols
	o isOver (local)
	I inc (local)
	C c2 (local)
	W w2 (local)
	m onGripDrag
	D.L drag.ox
	G max (local)
	o min (local)
	w mw (local)
	O onGripDragOver
	m mw(local)

	
*/

(function($){ 	
	
	var d = $(document),
	st ="<style>",	
	se ="}</style>",
	U = 'position',
	A = ':absolute;', 
	im = '!important;',
	pa = 'padding-',
	ap = 'append',
	le = 'left',	
	zi =':0px'+im,
	cres = 'cursor:e-resize',
	h = $("head")[ap](st+".CRZ{table-layout:fixed}.CRZ td,.CRZ th{"+pa+le+zi+pa+"right"+zi+"overflow:hidden}.CRC{height:0px;"+U+":relative}.CRG{margin-left:-5px;"+U+A+" z-index:5}.CRG .CRZ{"+U+A+"background-color:red;filter:alpha(opacity=1);opacity:0;width:10px;"+cres+";height:100%}.CRL{"+U+A+"width:1px}.CRD{border-left:1px dotted black"+se),			
	N = null,	
	D = N,			
	T = [],
	c = 0,	
	X = 'id',	
	p = 'px',
	S ='CRZ',
	I = parseInt,
	M = Math,
	k =$.browser.msie,
	F = false,
	mm = 'mousemove.',
	mu = 'mouseup.',
	tr = 'tr:first ',
	wi = 'width',
	bo = 'border-',
	ta = 'table',
	a ='<div class="CR',
	removeClass = 'removeClass',
	addClass = 'addClass',
	attr='attr',
	currentTarget='currentTarget';
	
	
	/**
	 * Function to allow column resizing for table objects. It is the starting point to apply the plugin.
	 * @param {DOM node} tb - refrence to the DOM table object to be enhanced
	 * @param {Object} O	- some customization values
	 */
	function o( d, O){		
		var t = $(d), i = t[attr](X) || S+c++, C="currentStyle";							
		if(O.disable) return Y(t);			
		if(!t.is(ta) || T[i]) return; 	
		t[addClass](S)[attr](X, i).before(a+'C"/>');	
		t.o = O; t.g = []; t.c = []; t.w = t[wi](); t.d = t.prev();			
		t.s = I(k? d.cellSpacing || d[C].borderSpacing :t.css(bo+'spacing'))||2;	
		t.b  = I(k? d.border || d[C].borderLeftWidth :t.css(bo+le+'-'+wi))||1;
		T[i] = t; 			
		G(t);		
	}



	/**
	 * This function allows to remove any enhancements performed by this plugin on a previously processed table.
	 * @param {jQuery ref} t - table object
	 */
	function Y(t){
		var id=t[attr](X), t=T[id];		
		if(!t || !t.is(ta)) return;			
		t[removeClass](S).d.remove();	
		delete T[id];						
	}

	/**
	 * Function to create all the grips associated with the table given by parameters 
	 * @param {jQuery ref} t - table object
	 */
	function G(t){	
		var h = t.find(tr+"th"),r="removeAttr";				
		if(!h.length) h = t.find(tr+"td"); 			
		t.l = h.length;								
		h.each(function(i){									
			var c = $(this), g = $(t.d[ap](a+'G"></div>')[0].lastChild); 
			g.t = t; g.i = i; g.c = c;	c.w = c[wi]();	
			t.g.push(g); t.c.push(c);						
			c[wi](c.w)[r](wi);				
			if (i < t.l-1)	g.mousedown(w)[ap](t.o.gripInnerHtml)[ap]('<div class="'+S+'"></div>');  	
			else g[addClass]("CRL")[removeClass]("CRG");				
			g.data(S, {i:i, t:t[attr](X)});						 												
		}); 	
		g(t); 			
		t.find('tr:not(:first)').find('td,th').each(function(){
			$(this)[r](wi);		 
		});		
	}
	

	/**
	 * Function that places each grip in the correct position according to the current table layout	 * 
	 * @param {jQuery ref} t - table object
	 */
	function g(t){	
		t.d[wi](t.w);					
		for(var c,i=0; i<t.l; i++){	
			c = t.c[i]; 			
			t.g[i].css({			
				left: c.offset()[le] - t.offset()[le] + c.outerWidth() + t.s / 2 + p,
				height: t.outerHeight()
			});												
		} 	
	}

	
	
	/**
	* This function updates column's width according to the horizontal position increment of the grip being
	* dragged. The function can be called while dragging if liveDragging is enabled and also from the onGripDragOver
	* event handler to synchronize grip's position with their related columns.
	* @param {jQuery ref} t - table object
	* @param {nunmber} i - index of the grip being dragged
	* @param {bool} o - to identify when the function is being called from the onGripDragOver event	
	*/
	function C(t,i,o){
		var I = D.x-D.l, c = t.c[i], C = t.c[i+1],
		w = c.w + I, W= C.w- I;			
		c[wi]( w + p);	C[wi](W + p);			
		if(o){c.w=w; C.w=W;}
	}

	
	/**
	 * Event handler used while dragging a grip. It checks if the next grip's position is valid and updates it. 
	 * @param {event} e - mousemove event binded to the window object
	 */
	function m(e){	
		if(!D) return;
		var t = D.t, x = e.pageX - D.L + D.l, 		
		w = t.o.minWidth, i = D.i, cb = t.o.onDrag,		 
		l = t.s*1.5 + w + t.b,
		G = i == t.l-1? t.w-l: t.g[i+1][U]()[le]-t.s-w, 
		o = i? t.g[i-1][U]()[le]+t.s+w: l;				 
		x = M.max(o, M.min(G, x));							
		D.x = x;	 D.css(le,  x + p); 						
		if(t.o.liveDrag){ 
			C(t,i);  g(t);
			if (cb) { e[currentTarget] = t[0]; cb(e); }
		}					
		return F; 					
	}
	


	/**
	 * Event handler fired when the dragging is over, updating table layout
	 */
	function O(e){			
		d.unbind(mm+S).unbind(mu+S);
		$("head :last-child").remove(); 			
		if(!D) return;
		var t = D[removeClass](D.t.o.draggingClass).t, c = t.o.onResize; 			
		if(D.x){
		C(t,D.i, 1);	g(t);	
		if (c) { e[currentTarget] = t[0]; c(e); }}	
		D = N;															
	}
	

	
	/**
	 * Event handler fired when the grip's dragging is about to start. Its main goal is to set up events 
	 * and store some values used while dragging.
	 * @param {event} e - grip's mousedown event
	 */
	function w(e){
		var o = $(this).data(S), t = T[o.t],  g = t.g[o.i],i=0,c;			 
		g.L = e.pageX;	g.l = g[U]()[le];	 				
		d.bind(mm+S, m).bind(mu+S,O);	 
		h[ap](st+"*{"+cres+im+se); 		 
		g[addClass](t.o.draggingClass);  			
		D = g;
		if(t.c[o.i].l) for(; i<t.l; i++){ c=t.c[i]; c.l = F; c.w= c[wi](); }				 
		return F; 	
	}
	


	
	/**
	 * Event handler fired when the browser is resized. The main purpose of this function is to update
	 * table layout according to the browser's size synchronizing related grips 
	 */
	function R(){		
		for(t in T){		
			var t = T[t], i=0, m=0;	
			t[removeClass](S)						 
			if (t.w != t[wi]()) {				 
				t.w = t[wi]();	 
				for(; i<t.l; i++) m+= t.c[i].w;		
				for(i=0; i<t.l; i++) t.c[i].css(wi, M.round(1000*t.c[i].w/m)/10 + "%").l=1;				
			}
			g(t[addClass](S));
		}
	}

	

	//bind resize event, to update grips position 
	$(window).bind('resize.'+S, R); 


	/**
	 * The plugin is added to the jQuery library
	 * @param {Object} O -  an object containg some basic customization values 
	 */
    $.fn.extend({  
        colResizable: function(O) {           
            var d = {
                draggingClass: 'CRD',	 
				gripInnerHtml: '',
				minWidth: 15,
				onDrag: N,
				onResize: N,					 
				liveDrag: F,				 
				disable: F						
            },		
			O =  $.extend(d, O);			
            return this.each(function() {				
             	o( this, O);             
            });
        }
    });
})(jQuery);

