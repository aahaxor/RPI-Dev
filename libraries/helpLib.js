var helpLib = [];

Node.prototype.fire=function(type,options){
     var event=new CustomEvent(type);
     for(var p in options){
         event[p]=options[p];
     }
     this.dispatchEvent(event);
}

Element.prototype.hide = function() {
    this.style.display = 'none';
  };

Element.prototype.show = function() {
    this.style.display = 'inline';
  };

Element.prototype.fade = function (type, ms) {
 	var el = this;
  var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 50,
    duration = ms,
    gap = interval / duration;

  if(isIn) {
    el.style.display = 'inline';
    el.style.opacity = opacity;
  }

  function func() {
    opacity = isIn ? opacity + gap : opacity - gap;
    el.style.opacity = opacity;

    if(opacity <= 0 || opacity >= 1) {window.clearInterval(fading); }
  }

  var fading = window.setInterval(func, interval);
return ms;
}

document.getClass = function(classL) {
    document.getElementsByClassName(classL);
  };
document.getID = function(idL) {
    document.getElementById(idL);
  };

setTimeout(function(){
    String.prototype.isBlank = Number.prototype.isBlank = Function.prototype.isBlank = function() {
    try{
          if (this == undefined || this == null || this == "" || this == "undefined" || this == "null") {
          return true;
        } else {
          return false;
        }
        } catch(e) {return true;}
    };
},500);

document.getID = function(idL) {
    document.getElementById(idL);
  };

String.prototype.isPartOf = function(array) {
	if (typeof array == "object") {
		for (i=0; i<array.length; i++) {
			if (array[i].contains(this)) {
				return true;
			}
		}
		return false;
	} else {
		return false;
	}
}

String.prototype.contains = function(it) {
	return this.indexOf(it) != -1; 
};

Array.prototype.closest = function(number) {
        var current = this[0];
        var difference = Math.abs(number - current);
        var index = this.length;
        while (index--) {
            var newDifference = Math.abs(number - this[index]);
            if (newDifference < difference) {
                difference = newDifference;
                current = this[index];
            }
        }
        return current;
    };

Array.prototype.contains = function(it) {
	return this.indexOf(it) != -1; 
};

String.prototype.titleize = function(blacklist) {
	var str = String(this).toLowerCase().split(" ");
	try {
		if (blacklist == "" || blacklist == undefined || blacklist == "undefined" || blacklist == null || blacklist == "null") {
			var blacklist = ["and","or","of","nor","but","so"];
		}
	} catch(e) {
		var blacklist = ["and","or","of","nor","but","so"];
	}
	var curWork = str[0].substring(0,1).toUpperCase();
	str[0] = curWork+str[0].substring(1);
	for (i=1; i<str.length-1; i++) {
		if (str[i].isPartOf(blacklist) == false) {
			curWork = str[i].substring(0,1);
			str[i] = curWork+str[i].substring(1).toUpperCase();
		} else {
			str[i] = str[i].toLowerCase();
		}
	}
	var toReturn = "";
	for (i=0; i<str.length; i++) {
		toReturn = toReturn+" "+str[i];
	}
	toReturn = toReturn.substring(1);
	return toReturn;
}

Array.prototype.removeAll = function(toRemove) {
	var index;
	if (null == this) {throw new TypeError('"this" is null or not defined');} else {
		if (typeof toRemove == "string" || typeof toRemove == "number") {
			for (i=0; i<this.length; i++) {
				if (this[i] == toRemove) {
					this.splice(i, 1);
				}

			}
			return this;
		} else {
			return this;
		}
	}
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}


NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function drawPoint(x,y,r,g,b,a){//Not in HTML5, so had to add it
	if (typeof x == "number" && typeof y == "number" && typeof r == "number" && typeof g == "number" && typeof b == "number" && typeof a == "number") {
		var canvas = this;
		var ctx = canvas.getContext("2d");
		var id = ctx.createImageData(2,2);
		var d  = id.data;
		d[0]   = r;
		d[1]   = g;
		d[2]   = b;
		d[3]   = a;
		ctx.putImageData( id, x, y );
	} else {
		throw new TypeError('One or more parameters is null or not defined, or not a number');
	}
}
HTMLCanvasElement.prototype.drawPoint = drawPoint;

Element.prototype.setPos = function(x,y) {
	if (typeof x == "number" && typeof y == "number") {
	  this.style.position = "absolute";
	  this.style.left = x+'px';
	  this.style.top = y+'px';
	} else {
		throw new TypeError('One or more parameters is null or not defined, or not a number');
	}
}

Function.prototype.delay = function(time) {
	if (typeof this == "function") {
	setTimeout(this,time);
} else {
	throw new TypeError("You must pass in a function");
}
}

Function.prototype.runOnResize = function() {
	if (this.length >= 2) {
	var toCall = this.toString().split(" ")[1];
	toCall = toCall.substring(0, toCall.indexOf("("));
	window.onresize = function(){eval(String(toCall)+"("+window.innerWidth+","+window.innerHeight+")")}
	} else {
		throw new TypeError("Function does not have at least two arguments, height and width");
}
}

Function.prototype.runOnKeydown = function() {
	var toCall = this.toString().split(" ")[1];
	toCall = toCall.substring(0, toCall.indexOf("("));
	window.onkeydown = function(){eval(String(toCall)+"()")}
}

Function.prototype.runOnKeyup = function() {
	var toCall = this.toString().split(" ")[1];
	toCall = toCall.substring(0, toCall.indexOf("("));
	window.onkeyup = function(){eval(String(toCall)+"()")}
}

String.prototype.delay = function(time) {
	setTimeout(function(){eval(this)},time);
}

String.prototype.copyToClipboard = function() {
	var text = this;
	var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  textArea.id = "txtarea";

  try {
    var successful = document.execCommand('copy');
    ID("txtarea").remove();
    return successful;
  } catch (err) {
  	ID("txtarea").remove();
    return false;
  }
}

String.prototype.dispatchEvent = function(context) {
	if (context == null || context == undefined || context == "" || context == " ") {
		try{context = window;}catch(e){context = document;}
	}
    context.dispatchEvent(new CustomEvent(this));
}

function keydownHandler(e) {
            if (e.keyCode == 13) { //enter key
                "keyenter".dispatchEvent(window);
            } else if (e.keyCode == 32) { //space key
            	"keyspace".dispatchEvent(window);
            } else if (e.keyCode == 16) { //shift key
            	"keyshift".dispatchEvent(window);
            } else if (e.keyCode == 17) { //ctrl key
            	"keyctrl".dispatchEvent(window);
            } else if (e.keyCode == 18 ) { //alt key
            	"keyalt".dispatchEvent(window);
            } else if (e.keyCode == 27) { //escape key
            	"keyescape".dispatchEvent(window);
            }
        }
        // register your handler method for the keydown event
            if (document.addEventListener) {
                document.addEventListener('keydown', keydownHandler, false);
            } else if (document.attachEvent) {
                document.attachEvent('onkeydown', keydownHandler);
}

function ID(val) {
    return document.getElementById(val);
}