var slider = document.querySelector('.slider');
var hammertime = new Hammer(slider);
var slides = document.querySelectorAll('.slide');
function goToSlide(index){
  [].forEach.call(slides, function(item){
    item.classList.remove('is-active');
    item.classList.remove('is-next');
    item.classList.remove('is-prev');
  });
  if(!slides[index]){
    return false
  }
  if(index+1 >= slides.length){
    slides[0].classList.add('is-next');
  }else{
    slides[index+1].classList.add('is-next');
  }
  if(index-1 < 0){
    slides[slides.length-1].classList.add('is-prev');
  }else{
    slides[index-1].classList.add('is-prev');
  }
  slides[index].classList.add('is-active');
  slider.style.height = slides[index].clientHeight+'px'
}
goToSlide(0);
hammertime.on('swipeleft', function(ev) {
  let current = document.querySelector('.slide.is-active');
  var index = [].indexOf.call(slides, current);
  index++;
  if(index >= slides.length){
    index = 0
  }
  goToSlide(index);
});
hammertime.on('swiperight', function(ev) {
  let current = document.querySelector('.slide.is-active');
  var index = [].indexOf.call(slides, current);
  index--;
  if(index < 0 ){
    index = slides.length-1
  }
  goToSlide(index);
});