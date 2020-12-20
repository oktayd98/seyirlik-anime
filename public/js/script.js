const mal = document.getElementById('mal');
const nameInput = document.getElementById('name');
const posterInput = document.getElementById('poster');
const rate = document.getElementById('rate');
const episodes = document.getElementById('episodes');
const year = document.getElementById('year');
const status = document.getElementById('status');
const synopsis = document.getElementById('synopsis');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// console.log(checkboxes);

mal.addEventListener('focusout', async (e) => {
  checkboxes.forEach((e) => {
    e.checked = false;
  });
  var link = mal.value;
  const res = await fetch(link);
  const data = await res.json();
  //   console.log(data.aired.prop.from.year);
  nameInput.value = data.title;
  posterInput.value = data.image_url;
  if (data.status === 'Finished Airing') status.value = 'Tamamlandı';
  if (data.status === 'Currently Airing') status.value = 'Devam Ediyor';
  if (data.status === 'Not yet aired') status.value = 'Gelecek';
  year.value = data.aired.prop.from.year;
  rate.value = data.score;
  synopsis.value = data.synopsis;
  episodes.value = data.episodes;
  checkboxes.forEach((cb) => {
    data.genres.forEach((e) => {
      if (cb.id === e.name) cb.checked = true;
    });
  });
});
