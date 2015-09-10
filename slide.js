
var uA,uB;
var Aleft, Bleft;
var liItems;
var imageNumber;
var imageWidth;
var currentImage = 0;
var uWidth;
var currentU; //1=a, 2=b
var nextB, prevB;

function init(){
	uA = document.getElementById('partA');
    uB = document.getElementById('partB');
    nextB=document.getElementById('next');
    prevB=document.getElementById('prev');
    
	liItems = uA.children;
    currentU=1;
	imageNumber = liItems.length;
	imageWidth = parseInt(window.getComputedStyle(liItems[0]).getPropertyValue('width').replace("px", ""));
    uWidth=parseInt(imageNumber * imageWidth);
    uA.style.width=uWidth+"px";
    uB.style.width=uWidth+"px";
    uA.style.left= "0px";
    uB.style.left= parseInt(-1*uWidth)+"px";
    Aleft= 0;
    Bleft= parseInt(-1*uWidth);	
}



function slideTo(imageToGo){
    var direction;
    var duration=500;
    var start = new Date;
    
    if(currentImage==0){
      if(imageToGo==imageNumber-1){direction = 1;}
      else{direction = -1;}      
    }
    else if(currentImage==imageNumber-1){
      if(imageToGo==0){direction = -1;}
      else{direction = 1;}  
    }
    else{
      direction = currentImage > imageToGo ? 1 : -1;
    }
    
    //*****************************************
      if(currentU==1){
      if(currentImage==0 && direction==1){ 
          uB.style.left= parseInt(-1 * uWidth) + 'px';
          Bleft= -1 * uWidth;
          currentU=2;
      }
      else if(currentImage==imageNumber-1 && direction==-1){
          uB.style.left= parseInt(imageWidth)+"px";
          Bleft= imageWidth;
          currentU=2;
      }   
    }
     //current is B
    else if(currentU==2){
      if(currentImage==0 && direction==1){ 
          uA.style.left= parseInt(-1 * uWidth) + 'px';
          Aleft= -1 * uWidth;
          currentU=1;
      }
      else if(currentImage==imageNumber-1 && direction==-1){
          uA.style.left= parseInt(imageWidth)+"px";
          Aleft= imageWidth;
          currentU=1;
      }   
    }   
    
    //**********************************************
	var id = setInterval(function(){
		var timePassed = new Date - start;
		var progress = timePassed / duration;
		if (progress > 1){
			progress = 1;
		}
        
        uA.style.left=parseInt(Aleft + direction * progress * imageWidth ) + 'px'; 
        uB.style.left=parseInt(Bleft + direction * progress * imageWidth ) + 'px';
		
        if (progress == 1){
			clearInterval(id);
            prevB.onclick=onClickPrev;
            nextB.onclick=onClickNext;
			currentImage = imageToGo;
            Aleft= Aleft + direction * imageWidth;
            Bleft= Bleft + direction * imageWidth;
		}
	}, 15);
}




function onClickNext(){
    console.log("CLICK next");
    nextB.onclick=null;
    prevB.onclick=null;
    slideTo((currentImage+1)%imageNumber);

}

function onClickPrev(){
    console.log("CLICK prev");
    nextB.onclick=null;
    prevB.onclick=null;
    if(currentImage == 0){
      slideTo(imageNumber-1);
    }
    else{
      slideTo(currentImage-1);    
    }	
}


window.onload = init;
