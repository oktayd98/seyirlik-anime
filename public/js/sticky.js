const filter = document.getElementsByClassName('filter')[0];
filter.style.transition = 'all 300ms';
let rect;

window.addEventListener('scroll', function () {
  rect = filter.getBoundingClientRect();

  if (rect.y === 0) {
    filter.style.background =
      'linear-gradient( to right, rgba(0, 74, 124, 1) 0%, rgba(0, 103, 172, 1) 100%)';
    filter.style.boxShadow = '0px 4px 12px -12px rgba(0,0,0,0.75)';
  } else {
    filter.style.background = 'transparent';
    filter.style.boxShadow = '';
  }
});
