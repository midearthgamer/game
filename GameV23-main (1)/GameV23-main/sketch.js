var dirts=[];
var vacs=[];
var font;
var score = 10;
var scorebg;
var costdirt=2;
var costvac=2;

function preload(){
  scorebgIMG=loadImage("scorebg.png")
  font=loadFont("Jackwrite.ttf");
  barImg=loadImage("bar.png");
  dirtImg= loadImage("Pot5.png");
  vacImg= loadImage("vacfull.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //scorebg
  scorebg=createSprite(75,50);
  scorebg.addImage("scorebg",scorebgIMG)
  //bar and imgs
  bar=createSprite(width/2, height-100);
  bar.addImage("bar",barImg);
  dirt=createSprite(width/2-80,height-100);
  dirt.addImage("dirt",dirtImg)
  dirt.scale=0.7
  vac=createSprite(width/2+80,height-100);
  vac.addImage("vac",vacImg)
  vac.scale=0.8
  //obj in the mouse
  follow=createSprite(mouseX,mouseY);
  follow.addImage("dirt",dirtImg);
  follow.addImage("vac",vacImg);
  follow.visible=false;
}

function draw(){
  console.log(mouseY)
  textFont(font);
  background(62, 63, 71)
  drawSprites()
  stroke("blue")
  textSize(35);
  text(score.toFixed(2),40,60);
  stroke(66,67,75)
    for(var i=0;i<width;i+=100){
      for(var j=0;j<height;j+=100){     
        line(i,0,i,height);
        line(0,i,width,i);
      }
  }
  selectObject();
  follow.x=mouseX;
  follow.y=mouseY;
  //picking up 
  for(var i=0; i<vacs.length;i++){
    vacs[i].pickup();
  }
  
}

function selectObject(){
  if(mousePressedOver(dirt)){
    objectPickedUp("dirt");
    selection="dirt";
  }
  if(mousePressedOver(vac)){
    objectPickedUp("vac")
    selection="vac"
  }
}

function objectPickedUp(obj){
  if(obj=="dirt"){
    follow.changeImage("dirt");
  } else if(obj=="vac"){
    follow.changeImage("vac");
  }
  follow.visible=true;
}

function mouseClicked(){
  if(mouseY<height-200){
    if(selection=="dirt" && score>costdirt){
      var spritenew= new Dirt(Math.ceil(mouseX/100)*100-50,Math.ceil(mouseY/100)*100-50)
      spritenew.growing();
      score = score-costdirt;
      costdirt*=1.2;
      dirts.push(spritenew);
    }
    if(selection=="vac" && score>costvac){
      var spritenew= new Vacuum(Math.ceil(mouseX/100)*100-50,Math.ceil(mouseY/100)*100-50)
      vacs.push(spritenew);
      score=score-costvac;
      costvac*=1.2;

    }
   follow.visible=false;
   selection=null;

   }
}

