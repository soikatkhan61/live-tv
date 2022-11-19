let youtube_link_input = document.getElementById('youtube_link_input')
let youtube_checkbox = document.getElementById('youtube_checkbox_input')

// JavaScript
const someCheckbox = document.getElementById('youtube_checkbox_input');

someCheckbox.addEventListener('change', e => {
  if(e.target.checked === true) {
    youtube_link_input.style.display = 'block'
  }
if(e.target.checked === false) {
    youtube_link_input.style.display = 'none'
  }
});