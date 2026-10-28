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
const now = new Date();
let month = new Date(now.getFullYear(), now.getMonth(), 1);
let selectedDate = null;
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const readableDate = (key) => new Date(`${key}T12:00:00`).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
function renderAgenda() {
  const agenda = $('#agenda');
  agenda.replaceChildren();
  $('#agenda-title').textContent = selectedDate ? readableDate(selectedDate) : 'Upcoming at ACC';
  const events = content.events.filter(event => selectedDate ? event.date === selectedDate : event.date >= dateKey(now)).slice().sort((a,b) => a.date.localeCompare(b.date));
  if (!events.length) {
    const empty = node('div', 'empty-state');
    empty.append(node('span', '', '✳'), node('h4', '', selectedDate ? 'A little room in the schedule.' : 'Our next chapter is on its way.'), node('p', '', selectedDate ? 'No events are listed for this date. Check Instagram for the latest updates.' : 'Confirmed meeting and hangout dates will appear here. Follow @kentstateacc for current announcements.'));
    agenda.append(empty);
  }
  events.forEach(event => {
    const card = node('article', 'event-item');
    card.append(node('span', 'event-type', event.type || 'ACC event'), node('h4', '', event.title), node('p', '', `${readableDate(event.date)}${event.time ? ` · ${event.time}` : ''}`));
    if (event.location) card.append(node('p', '', event.location));
    if (event.description) card.append(node('p', '', event.description));
    agenda.append(card);
  });
}
function renderCalendar() {
  $('#month-label').textContent = month.toLocaleDateString('en-US', {month:'long', year:'numeric'});
  const grid = $('#calendar-days');
  grid.replaceChildren();
  for (let blank = 0; blank < month.getDay(); blank++) grid.append(node('span'));
  const count = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  for (let day = 1; day <= count; day++) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const key = dateKey(date);
    const events = content.events.filter(event => event.date === key);
    const button = node('button', 'day', String(day));
    button.type = 'button';
    button.classList.toggle('is-today', key === dateKey(now));
    button.classList.toggle('selected', key === selectedDate);
    button.classList.toggle('has-event', !!events.length);
    button.setAttribute('aria-label', `${readableDate(key)}${events.length ? `, ${events.length} event${events.length > 1 ? 's' : ''}` : ', no listed events'}`);
    button.setAttribute('aria-pressed', String(key === selectedDate));
    if (key === dateKey(now)) button.setAttribute('aria-current','date');
    button.addEventListener('click', () => {
      selectedDate = selectedDate === key ? null : key;
      renderCalendar();
      grid.querySelectorAll('button')[day-1].focus();
      renderAgenda();
    });
    grid.append(button);
  }
}
function changeMonth(offset) {
  month = new Date(month.getFullYear(), month.getMonth()+offset, 1);
  selectedDate = null;
  renderCalendar(); renderAgenda();
}
$('#previous-month').addEventListener('click', () => changeMonth(-1));
$('#next-month').addEventListener('click', () => changeMonth(1));
$('#today').addEventListener('click', () => {
  month = new Date(now.getFullYear(), now.getMonth(), 1);
  selectedDate = dateKey(now);
  renderCalendar(); renderAgenda();
});
const gallery = $('#photo-gallery');
if (content.photos.length) {
  $('.section-footnote').hidden = true;
  content.photos.forEach(photo => {
    const figure = node('figure','memory');
    figure.append(image(photo.src, photo.alt), node('figcaption','',photo.caption));
    gallery.append(figure);
  });
} else {
  [['✳','A little discovery.','Culture, shared together.'],['♡','A lot of connection.','New faces. Familiar feelings.'],['↗','More stories ahead.','Your memories belong here.']].forEach(([symbol,title,caption]) => {
    const figure = node('figure','memory');
    const art = node('div','memory-art');
    art.setAttribute('aria-label', 'Illustration placeholder for future event photo');
    art.append(node('span','',symbol), node('div','',title));
    figure.append(art, node('figcaption','',caption));
    gallery.append(figure);
  });
}
const officers = content.officers.length ? content.officers : [
  {name:'Meet the team soon',role:'Officer introductions',bio:'Names, roles, and introductions will be added after the club confirms its roster.'},
  {name:'The stories behind ACC',role:'Our community',bio:'Get to know the people helping turn shared interests into meaningful connections.'},
  {name:'A creative touch',role:'Visual design',bio:'A space to introduce the creative team behind our club’s look and event designs.'}
];
if (content.officers.length) $('#officers .section-top > p').textContent = 'Meet the team helping make ACC happen.';
officers.forEach(officer => {
  const card = node('article','officer');
  card.append(officer.photo ? image(officer.photo, officer.name, 'officer-avatar') : node('div','officer-avatar',content.officers.length ? officer.name.split(' ').map(part => part[0]).slice(0,2).join('') : '✳'), node('p','role',officer.role), node('h3','',officer.name), node('p','',officer.bio));
  $('#officer-list').append(card);
});
renderCalendar(); renderAgenda();
