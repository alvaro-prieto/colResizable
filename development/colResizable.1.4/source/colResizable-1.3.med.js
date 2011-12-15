/**
               _ _____           _          _     _      
              | |  __ \         (_)        | |   | |     
      ___ ___ | | |__) |___  ___ _ ______ _| |__ | | ___ 
     / __/ _ \| |  _  // _ \/ __| |_  / _` | '_ \| |/ _ \
    | (_| (_) | | | \ \  __/\__ \ |/ / (_| | |_) | |  __/
     \___\___/|_|_|  \_\___||___/_/___\__,_|_.__/|_|\___|
	 
	v 1.3 - a jQuery plugin by Alvaro Prieto Lauroba
	
	Licences: MIT & GPL
	Feel free to use or modify this plugin as far as my full name is kept	
	
	If you are going to use this plugin in production environments it is 
	strongly recomended to use its minified version: colResizable.min.js

*/


(function ($) {	
	var d = $(document),
	F = !1,
	N=null,	
	drag = N,
	tables = [],
	count = 0,
	ID = "id",
	PX = "px",
	SIGNATURE = "CRZ",
	I = parseInt,
	M = Math,
	ie = $.browser.msie,
	width = "width",
	attr = "attr",
	divClass='<div class="',
	style="<style type='text/css'>",
	push = "push",
	append = "append",
	removeClass = "removeClass",
	addClass = "addClass",
	removeAttr = "removeAttr",
	bind = "bind",
	extend = "extend",
	mousemove ='mousemove.',
	mouseup = 'mouseup.',
	currentTarget = "currentTarget",
	left = 'left',
	position = 'position',
	styleEnd ="}</style>",
	absolute = ':absolute;', 
	imp = '!important;',
	pa = 'padding-',
	zi =':0px'+imp,	
	S,
	h = $("head")[append](style+".CRZ{table-layout:fixed;}.CRZ td,.CRZ th{"+pa+left+zi+pa+"right"+zi+"overflow:hidden}.CRC{height:0px;"+position+":relative;}.CRG{margin-left:-5px;"+position+absolute+"z-index:5;}.CRG .CRZ{"+position+absolute+"background-color:red;filter:alpha(opacity=1);opacity:0;width:10px;height:100%;top:0px}.CRL{"+position+absolute+"width:1px}.CRD{ border-left:1px dotted black"+styleEnd);
	
	try {
		S = sessionStorage;
	} catch (e) {}	
	
	
	function init(tb, options) {
		var t = $(tb), marginLeft = "marginLeft", marginRight="marginRight", currentStyle ="currentStyle", border="border";
		if (options.disable)
			return destroy(t);
		var id = t.id = t[attr](ID) || SIGNATURE + count++;
		t.p = options.postbackSafe;
		if (!t.is("table") || tables[id])
			return;
		t[addClass](SIGNATURE)[attr](ID, id).before(divClass+'CRC"/>');
		t.opt = options;
		t.g = [];
		t.c = [];
		t.w = t[width]();
		t.gc = t.prev();
		
		if (options[marginLeft])
			t.gc.css(marginLeft, options[marginLeft]);
		if (options[marginRight])
			t.gc.css(marginRight, options[marginRight]);
		t.cs = I(ie ? tb.cellSpacing || tb[currentStyle][border+"Spacing"] : t.css(border+'-spacing')) || 2;
		t.b = I(ie ? tb[border] || tb[currentStyle][border+"LeftWidth"] : t.css(border+ '-'+ left+'-'+width)) || 1;
		tables[id] = t;
		createGrips(t);
	}
	
	function destroy(t) {
		var id = t[attr](ID),
		t = tables[id];
		if (!t || !t.is("table"))
			return;
		t[removeClass](SIGNATURE).gc.remove();
		delete tables[id];
	}
	
	function createGrips(t) {
		var find="find",th = t[find](">thead>tr>th,>thead>tr>td"), length ="length";
		if (!th[length])
			th = t[find](">tbody>tr:first>th,>tr:first>th,>tbody>tr:first>td,>tr:first>td");
		t.cg = t[find]("col");
		t.ln = th[length];
		if (t.p && S && S[t.id])
			memento(t, th);
		th.each(function (i) {
			var c = $(this);
			var g = $(t.gc[append](divClass+'CRG"></div>')[0].lastChild);
			g.t = t;
			g.i = i;
			g.c = c;
			c.w = c[width]();
			t.g[push](g);
			t.c[push](c);
			c[width](c.w)[removeAttr](width);
			if (i < t.ln - 1)
				g.mousedown(onGripMouseDown)[append](t.opt.gripInnerHtml)[append](divClass + SIGNATURE + '" style="cursor:' + t.opt.hoverCursor + '"></div>');
			else
				g[addClass]("CRL")[removeClass]("CRG");
			g.data(SIGNATURE, {
				i : i,
				t : t[attr](ID)
			});
		});
		t.cg[removeAttr](width);
		syncGrips(t);
		t[find]('td, th').not(th).not('table th, table td').each(function () {
			$(this)[removeAttr](width);
		});
	}
	
	function memento(t, th) {
		var w,
		m = 0,
		i = 0,
		aux = [];
		if (th) {
			t.cg[removeAttr](width);
			if (t.opt.flush) {
				S[t.id] = "";
				return;
			}
			w = S[t.id].split(";");
			for (; i < t.ln; i++) {
				aux[push](100 * w[i] / w[t.ln] + "%");
				th.eq(i).css(width, aux[i]);
			}
			for (i = 0; i < t.ln; i++)
				t.cg.eq(i).css(width, aux[i]);
		} else {
			S[t.id] = "";
			for (i in t.c) {
				w = t.c[i][width]();
				S[t.id] += w + ";";
				m += w;
			}
			S[t.id] += m;
		}
	}
	
	function syncGrips(t) {
		t.gc[width](t.w);
		for (var i = 0; i < t.ln; i++) {
			var c = t.c[i];
			t.g[i].css({
				left : c.offset().left - t.offset()[left] + c.outerWidth() + t.cs / 2 + PX,
				height : t.opt.headerOnly ? t.c[0].outerHeight() : t.outerHeight()
			});
		}
	}
	
	function syncCols(t, i, isOver) {
		var inc = drag.x - drag.l,
		c = t.c[i],
		c2 = t.c[i + 1];
		var w = c.w + inc;
		var w2 = c2.w - inc;
		c[width](w + PX);
		c2[width](w2 + PX);
		t.cg.eq(i)[width](w + PX);
		t.cg.eq(i + 1)[width](w2 + PX);
		if (isOver) {
			c.w = w;
			c2.w = w2;
		}
	}
	
	
	function onGripDrag(e) {
		if (!drag)
			return;
		var t = drag.t;
		var x = e.pageX - drag.ox + drag.l;
		var mw = t.opt.minWidth,
		i = drag.i;
		var l = t.cs * 1.5 + mw + t.b;
		var max = i == t.ln - 1 ? t.w - l : t.g[i + 1][position]()[left] - t.cs - mw;
		var min = i ? t.g[i - 1][position]()[left] + t.cs + mw : l;
		x = M.max(min, M.min(max, x));
		drag.x = x;
		drag.css(left, x + PX);
		if (t.opt.liveDrag) {
			syncCols(t, i);
			syncGrips(t);
			var cb = t.opt.onDrag;
			if (cb) {
				e[currentTarget] = t[0];
				cb(e);
			}
		}
		return F}
	
	function onGripDragOver(e) {
		var unbind = "unbind";
		d[unbind](mousemove + SIGNATURE)[unbind](mouseup + SIGNATURE);
		$("head :last-child").remove();
		if (!drag)
			return;
		drag[removeClass](drag.t.opt.draggingClass);
		var t = drag.t,
		cb = t.opt.onResize;
		if (drag.x) {
			syncCols(t, drag.i, 1);
			syncGrips(t);
			if (cb) {
				e[currentTarget] = t[0];
				cb(e);
			}
		}
		if (t.p && S)
			memento(t);
		drag = N;
	}
	
	function onGripMouseDown(e) {
		var o = $(this).data(SIGNATURE);
		var t = tables[o.t],
		g = t.g[o.i];
		g.ox = e.pageX;
		g.l = g[position]()[left];
		d[bind](mousemove+ SIGNATURE, onGripDrag)[bind](mouseup+ SIGNATURE, onGripDragOver);
		h[append](style+"*{cursor:" + t.opt.dragCursor +imp +styleEnd);
		g[addClass](t.opt.draggingClass);
		drag = g;
		if (t.c[o.i].l)
			for (var i = 0, c; i < t.ln; i++) {
				c = t.c[i];
				c.l = F;
				c.w = c[width]();
			}
		return F;
	}
	

	function onResize() {
		for (t in tables) {
			var t = tables[t],
			i,
			mw = 0;
			t[removeClass](SIGNATURE);
			if (t.w != t[width]()) {
				t.w = t[width]();
				for (i = 0; i < t.ln; i++)
					mw += t.c[i].w;
				for (i = 0; i < t.ln; i++)
					t.c[i].css(width, M.round(1000 * t.c[i].w / mw) / 10 + "%").l = 1;
			}
			syncGrips(t[addClass](SIGNATURE));
		}
	}
	
	$(window)[bind]('resize.' + SIGNATURE, onResize);
	$.fn[extend]({
		colResizable : function (options) {
			var defaults = {
				draggingClass : 'CRD',
				gripInnerHtml : '',
				liveDrag : F,
				minWidth : 15,
				headerOnly : F,
				hoverCursor : "e-resize",
				dragCursor : "e-resize",
				postbackSafe : F,
				flush : F,
				marginLeft : N,
				marginRight : N,
				disable : F,
				onDrag : N,
				onResize : N
			}
			var options = $[extend](defaults, options);
			return this.each(function () {
				init(this, options);
			});
		}
	});
})(jQuery);
