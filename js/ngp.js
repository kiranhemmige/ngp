var isIE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

function pad(s)
{
    if (s*1 < 10) {
		return '0' + s;
    }
	return s;
}

var startTime = 0;

function timer()
{
    if (!startTime) {
        startTime = new Date().getTime() - document.answerForm.jstimer.value * 1000;
    }
    var curTime = new Date().getTime();
	var val = Math.floor((curTime - startTime)/1000);
	sec = pad(val % 60);
	minutes = pad(Math.floor(val / 60) % 60);
	s = minutes + ':' + sec;
	hours = Math.floor(val / 3600);
	if (hours > 0){
		s = hours + ':' + s;
	}
	document.answerForm.jstimerShow.value = s;
	if (!(document.answerForm.stopClock.value * 1)) {
		setTimeout("timer()", 500);
    }
}

document.oncontextmenu = new Function("return false");

var RightClick = 1;

if(navigator.userAgent.match(/Opera/ig)) {
	RightClick = 0;
}
if(navigator.userAgent.match(/Safari/ig)) {
	RightClick = 0;
}
if(!navigator.userAgent.match(/MSIE/ig) && !navigator.userAgent.match(/Mozilla/ig)) {
	RightClick = 0;
}
if(navigator.userAgent.match(/Chrome/ig)) {
  RightClick = 1;
}

var specialcase = ((navigator.userAgent.indexOf('Mac') != -1) || document.all);
var down = 0;
var lastAns = 'y';

function init()
{
    if (!(document.getElementById || document.all || document.layers)) {
        return;
    }
    document.getElementById("ngpTable").onselectstart = new Function ("return false");
    document.onmouseup = mu;
    for (i = 0; i < document.images.length; i++) {
        if (document.images[i].className == 'l') {
            document.images[i].onmousedown = c;
            document.images[i].onmouseover = ov;
            document.images[i].ondragstart = function() { return false };
        }
    }
    timer();
}

function swap(el)
{
	if (el.className == 'done') {
		el.className = 'none';
	}
    else {
		el.className = 'done';
	}
}

function ou(e)
{
    if (!isIE && window.Event) {
        sender = e.target;
    }
    else {
        var e = window.event;
        sender = e.srcElement;
    }
	if (sender.name) {
        var ar = new Array();
        ar = sender.name.split('_');
        i = ar[1]*1;
        j = ar[2]*1;
		document.getElementById('th_0_'+(j+1)).style.backgroundColor = '#FFFFFF';
		document.getElementById('th_'+(i+1)+'_0').style.backgroundColor = '#FFFFFF';
	}
}

function ov(e)
{
	if (!isIE && window.Event) {
		rtightclick = (e.which == 3 || (e.modifiers & Event.CONTROL_MASK) || (e.modifiers & Event.SHIFT_MASK));
		sender = e.target;
	}
    else {
		rtightclick = (window.event.button == 2 || window.event.ctrlKey || window.event.shiftKey);
		var e = window.event;
		sender = e.srcElement;
	}
	if (sender.className == 'l') {
        if (down) {
            setImg(sender, lastAns);
        }
	}
	return false;
}

function mu(e)
{
	down = 0;
	return false;
}

function getstatus(s)
{
	var ar = new Array();
	ar = s.split('/');
	return ar[ar.length-1].charAt(0);
}

function getdirection(s)
{
	var ar = new Array();
	ar = s.split('_');
	return ar[0];
}

function getnextsrc(status, reverse)
{
	if (reverse) {
		switch (status) {
			case 'y': return RightClick?'x':'n';
			case 'n': return RightClick?'x':'y';
			case 'x': return RightClick?'n':'x';
		}
	}
    else {
		switch (status){
			case 'y': return RightClick?'n':'x';
			case 'n': return RightClick?'y':'y';
			case 'x': return RightClick?'y':'n';
		}
	}
}

function setImg(sender, ans)
{
	if (sender.name) {
        var ar = new Array();
		ar = sender.name.split('_');
		i = ar[1];
		j = ar[2];
		w = document.answerForm.w.value;
		h = document.answerForm.h.value;
		sender.src = ans + '.gif';
		var s = document.answerForm.ansH.value;
		n = i * (1 * w) + (j * 1);
		l = s.length;
		s = s.substr(0,n) + ans + s.substr(n + 1, l);
		document.answerForm.ansH.value = s;
	}
}

function c(e)
{
	down = 1;
	var rtightclick = 0;
	if (!isIE && window.Event) {
		rtightclick = (e.which == 3 || (e.modifiers & Event.CONTROL_MASK) || (e.modifiers & Event.SHIFT_MASK));
		sender = e.target;
	}
    else {
		rtightclick = (window.event.button == 2 || window.event.ctrlKey || window.event.shiftKey);
		var e = window.event;
		sender = e.srcElement;
	}
	ans = getnextsrc(getstatus(sender.src), rtightclick);
	lastAns = ans;
	setImg(sender, ans);
	return false;
}

a1 = new Image();
a1.src = 'x.gif';
a2 = new Image();
a2.src = 'y.gif';
a3 = new Image();
a3.src = 'n.gif';
