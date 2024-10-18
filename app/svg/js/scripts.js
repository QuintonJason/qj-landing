$( document ).ready(function() {

var daytime = $('#Day'),
    nighttime = $('#Night'),
	yellowLight = $('g[id*=yellowBulbs]'),
    orangeLight = $('#dimOrangeBulbs'),
    middleCloud = $('#middleCloud'),
    leftCloud = $('#leftCloud'),
    rightCloud = $('#rightCloud'),
    highRollerNight = $('#highRollerNight'),
    $svgLayer = $('#frank') 
;  
 
tl = new TimelineMax();

tl.set(leftCloud,{x:-1000});
tl.set(middleCloud,{x:-500});
tl.set(rightCloud,{x:-700});

tl
.pause()
.add("startAction")
.to(middleCloud,12.5,{x:600, transformOrigin:"50% 50%",repeat:-1},0)
.to(leftCloud,15,{x:750, transformOrigin:"50% 50%",repeat:-1},0)
.to(rightCloud,14,{x:600, transformOrigin:"50% 50%",repeat:-1},0)
.to(highRoller,90,{rotationZ:-360,transformOrigin:"50%, 50%",repeat:-1},0)
.to(highRollerNight,90,{rotationZ:-360,transformOrigin:"50%, 50%",repeat:-1},0)
// 

.to(daytime,25,{autoAlpha:0},1)
.to(yellowLight,1,{autoAlpha:0,repeat:-1,ease:Power3.easeInOut},12)
.to(orangeLight,1,{autoAlpha:0,repeat:-1,ease:Power3.easeInOut},12.5)
.add("end")
;


$svgLayer.click(function(){
  tl.timeScale(1).seek(0);
  tl.play("startAction");
});
});