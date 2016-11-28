/*获取DOM元素的index,不含文本和注释*/
function getChildrenIndex(ele){ 
	//IE is simplest and fastest 
	if(ele.sourceIndex){ 
		return ele.sourceIndex - ele.parentNode.sourceIndex - 1; 
	} 
	//other browsers 
	var i=0; 
	while(ele = ele.previousElementSibling){ 
		i++; 
	} 
	return i; 
}

function getStyle(obj,attr){		
//获取CSS属性，相当于使用内联声明后使用obj.style.width可以获取宽度值，使用该函数可以在css非内联情况下使用
//使用offset存在将边框算入宽度，造成与设定宽度不同的bug
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

//可以实现改变width/height/font-size/border/left/right/opacity
function animate(obj,json,fn){	//json相当于{attr1:iTarget1,attr2:iTarget2},实现多对属性同时变换
	//obj--object要变化的目标
	//attr--attribution要变化的属性
	//iTarget--属性目标取值
	//fn--回调函数，实现链式变化,注意实现下一步的函数写入function中，即fn=function(){startMove(obj,attr,iTarget)}
	//注意timer提前定义
	clearInterval(obj.timer);			//注意清除，防止重复移入加快速度
	obj.timer = setInterval(function(){
		var flag = true;//假设
		for(var attr in json){
			//当前属性取值icur
			var icur = 0 ;			
			if(attr=='opacity'){	//使得改变透明度也可以使用该函数
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);	//round是四舍五入
			}else{
				icur = parseInt(getStyle(obj,attr));
			}
			
			//变化速度speed		 
			var speed = (json[attr]-icur)/4;							//目标位置减去当前位置为距离，实现缓冲
			speed = speed>0?Math.ceil(speed):Math.floor(speed);		//注意取整，不然达不到目标值，取整前先判断正负值
			//检测停止
			if(icur!=json[attr]){
				flag=false;
			}
			if (attr=='opacity') {
				obj.style.filter='alpha(opacity:'+(icur+speed)+')';	//兼容IE低版本
				obj.style.opacity=(icur+speed)/100;
			}else{
				obj.style[attr]=icur+speed+'px';	
			}
		}		
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}		
	},15)
}


/*获取元素到最左侧的位置*/
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

/*获取元素到页面最上方的位置*/
function getElementTop(element){
	var actualTop = element.offsetTop;	
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
