const content = window.ACC_CONTENT;
const $ = (selector) => document.querySelector(selector);
function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function image(src, alt, className) {
  const element = node('img', className);
  element.src = src;
  element.alt = alt;
  element.loading = 'lazy';
  return element;
}
const menu = $('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  $('#navigation').classList.toggle('open', open);
});
$('#navigation').addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    $('#navigation').classList.remove('open');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    $('#navigation').classList.remove('open');
    menu.focus();
  }
});
const gallery = $('#photo-gallery');
if (gallery && content.photos.length) {
  $('.section-footnote').hidden = true;
  content.photos.forEach(photo => {
    const figure = node('figure','memory');
    figure.append(image(photo.src, photo.alt), node('figcaption','',photo.caption));
    gallery.append(figure);
  });
} else if (gallery) {
  [['✳','A little discovery.','Culture, shared together.'],['♡','A lot of connection.','New faces. Familiar feelings.'],['↗','More stories ahead.','Your memories belong here.']].forEach(([symbol,title,caption]) => {
    const figure = node('figure','memory');
    const art = node('div','memory-art');
    art.setAttribute('aria-label', 'Illustration placeholder for future event photo');
    art.append(node('span','',symbol), node('div','',title));
    figure.append(art, node('figcaption','',caption));
    gallery.append(figure);
  });
}
const calendar = content.calendar;
if ($('#calendar-poster-image') && calendar) {
  $('#calendar-poster-image').src = calendar.src;
  $('#calendar-poster-image').alt = calendar.alt;
  $('#calendar-image-link').href = calendar.src;
  $('#calendar-image-link').setAttribute('aria-label', `Open ${calendar.title} at full size`);
  $('#calendar-full-size').href = calendar.src;
  $('#calendar-caption').textContent = calendar.title;
  calendar.dates.forEach(item => $('#calendar-date-list').append(node('p', '', item)));
}
const officerList = $('#officer-list');
if (officerList) content.officers.forEach(officer => {
  const card = node('article','officer-profile');
  const portrait = node('div','officer-portrait');
  portrait.append(image(officer.photo || 'assets/portrait-placeholder.svg', officer.photo ? `Portrait of ${officer.name}` : `Photo to come for ${officer.role}`));
  if (!officer.photo) portrait.append(node('span','portrait-label','PHOTO COMING SOON'));
  const body = node('div','officer-profile-body');
  body.append(node('p','role',officer.role),node('h2','',officer.name || 'Introduction coming soon'),node('p','',officer.bio));
  card.append(portrait,body);
  officerList.append(card);
});
