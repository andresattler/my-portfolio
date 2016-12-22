
//----Menu
var menu = document.getElementById('menu');
var menuBtn = document.getElementById('menubtn');
var menu_open = false;
function menuOpen()
{
  
  if(!menu_open)
    {
      menu_open= true;
      menuBtn.classList.toggle('fa-bars', false);
      menuBtn.classList.toggle('fa-times', true); 
      TweenLite.to(menu, 0.5, {autoAlpha: 1});
    }
  else
    { 
      menu_open= false;
      menuBtn.classList.toggle('fa-bars', true);
      menuBtn.classList.toggle('fa-times', false);
      TweenLite.to(menu, 0.5, {autoAlpha: 0});  
    }
}

//----Trianglify Pattern

  var pattern = Trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    cell_size: 150,
    variance: 0.75, 
    seed: '0rk4f', 
    x_colors: ['#231F20', '#8E793E', '#AD974F', '#231F20']
  });

  document.getElementById('home').appendChild(pattern.svg());
  document.getElementById('contact').appendChild(pattern.svg());


//Events
document.getElementById('menubtn').addEventListener('click', menuOpen);

//--------- Scroll Transition --------

var section = document.getElementsByClassName('section');
var wrapper = document.getElementById('wrapper')
var n=0; //viewed section
var y=0; //yPos of wrapper 
function getDirection(e)
{
  if(e.deltaY < 0 ) // up
      {
        up();
      }
    else if(e.deltaY > 0) // down
      {
       down();
      }
}
function up()
{
  if(n>0)
    {
      n--;
      y = y +100;    
      scrollTo();
    }
  
}
function down()
{
 if(n<section.length-1)
    {
      n++;
      y = y -100;
      scrollTo();     
    }
}

function scrollTo()
{
  TweenLite.to(wrapper, 0.5, {top: y + 'vh'});
}

window.addEventListener('wheel' , getDirection);
//---for mobile
var hammer = new Hammer(window);


//Events for mobile
hammer.on('panend', function(e){
  if (e.direction == 16)//pan down
  {
    up();
  }
  else if (e.direction == 8)//pan up
  {
    down();
  }

});


//--scroll Button
var scrollBtn = document.getElementsByClassName('scroll')
for(var i =0; i<scrollBtn.length; i++)
  {
   scrollBtn[i].addEventListener('click', down);
  }
//Menu navigation
function navScroll(x)
{
  menuOpen();
  y = -100*x;
  scrollTo();
}
var navBtn = menu.getElementsByTagName('a');
navBtn[0].addEventListener('click', function(){
 navScroll(0)
 n = 0;
});
navBtn[1].addEventListener('click', function(){
 navScroll(1)
 n= 1;
});
navBtn[2].addEventListener('click', function(){
 navScroll(2)
 n= 2;
});
navBtn[3].addEventListener('click', function(){
 navScroll(3)
 n=3;
});