document.addEventListener('DOMContentLoaded', () => {
  let newStyle = document.createElement('link');
  // console.log(this.location);
  newStyle.setAttribute('rel', 'stylesheet');
  if (this.location.pathname === '/') {
    newStyle.setAttribute('href', 'css/home.css');
  } else {
    newStyle.setAttribute('href', 'css' + this.location.pathname + '.css');
  }
  document.querySelector('head').appendChild(newStyle);
});
