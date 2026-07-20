







const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('sidebarOverlay');
const navLinks  = document.querySelectorAll('.sidebar a');

function openSidebar()  { sidebar.classList.add('open');    overlay.classList.add('active');    hamburger && hamburger.classList.add('open'); }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('active'); hamburger && hamburger.classList.remove('open'); }

if (hamburger) hamburger.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
overlay.addEventListener('click', closeSidebar);
navLinks.forEach(l => l.addEventListener('click', () => { if (window.innerWidth <= 768) closeSidebar(); }));

const sections = document.querySelectorAll('section, .box');
const links    = document.querySelectorAll('.sidebar a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.style.color = '#ccc');
      const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#fff';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));











const scrollBtn = document.querySelector('.scrollindicator');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('hidden', window.scrollY > 80);
});













const projectModal        = document.getElementById('projectModal');
const projectModalImg     = document.getElementById('projectModalImg');
const projectModalCaption = document.getElementById('projectModalCaption');
const projectModalClose   = document.getElementById('projectModalClose');

function openProjectModal(src, name) {
  projectModalImg.src = src;
  projectModalCaption.textContent = name || '';
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', e => { if (e.target === projectModal) closeProjectModal(); });
















const certModal         = document.getElementById('certModal');
const certModalClose    = document.getElementById('certModalClose');
const certGalleryImages = document.getElementById('certGalleryImages');
const certDots          = document.getElementById('certDots');
const certCaption       = document.getElementById('certModalCaption');
const certHint          = document.getElementById('certHint');
const certPrev          = document.getElementById('certPrev');
const certNext          = document.getElementById('certNext');

let certImages = [];
let certIndex  = 0;

function renderCertGallery() {
  certGalleryImages.innerHTML = '';
  certDots.innerHTML = '';

  certImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'zoom-modal-img';
    img.src = src;
    img.alt = `Certificate image ${i + 1}`;
    if (i !== certIndex) img.classList.add('hidden-img');
    certGalleryImages.appendChild(img);

    const dot = document.createElement('div');
    dot.className = 'cert-dot' + (i === certIndex ? ' active' : '');
    dot.addEventListener('click', () => { certIndex = i; updateCertView(); });
    certDots.appendChild(dot);
  });

  updateCertView();
}

function updateCertView() {
  const imgs = certGalleryImages.querySelectorAll('img');
  const dots = certDots.querySelectorAll('.cert-dot');

  imgs.forEach((img, i) => {
    img.classList.toggle('hidden-img', i !== certIndex);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === certIndex);
  });

  certPrev.disabled = certIndex === 0;
  certNext.disabled = certIndex === certImages.length - 1;

  if (certImages.length > 1) {
    certHint.textContent = `${certIndex + 1} / ${certImages.length}  ·  Use arrow keys or buttons to navigate`;
  } else {
    certHint.textContent = '';
  }
}

function openCertModal(card) {
  certImages = JSON.parse(card.dataset.images || '[]');
  const name = card.dataset.name || '';
  certIndex = 0;
  certCaption.textContent = name;
  renderCertGallery();
  certModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = '';
}

certPrev.addEventListener('click', () => { if (certIndex > 0) { certIndex--; updateCertView(); } });
certNext.addEventListener('click', () => { if (certIndex < certImages.length - 1) { certIndex++; updateCertView(); } });
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', e => { if (e.target === certModal) closeCertModal(); });
















document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeCertModal();
  }
  if (e.key === 'ArrowLeft'  && certModal.classList.contains('active') && certIndex > 0) { certIndex--; updateCertView(); }
  if (e.key === 'ArrowRight' && certModal.classList.contains('active') && certIndex < certImages.length - 1) { certIndex++; updateCertView(); }
});

















const filterButtons = document.querySelectorAll('.filterbtn');
const projectItems  = document.querySelectorAll('.projectitem');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category.includes(filter);
      item.style.display = match ? '' : 'none';
    });
  });
});

















const skillsfilterButtons = document.querySelectorAll('.skillsfilterbtn');
const skillsItems         = document.querySelectorAll('.skillsitem');

skillsfilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    skillsfilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    skillsItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category.includes(filter);
      item.style.display = match ? '' : 'none';
    });
  });
});





function toggleDescription(btn) {
  const desc = btn.previousElementSibling; 
  const isExpanded = desc.classList.toggle('expanded');
  btn.textContent = isExpanded ? 'See less' : 'See more';

  if (desc._collapseTimer) clearTimeout(desc._collapseTimer);

  if (isExpanded) {
    desc._collapseTimer = setTimeout(() => {
      desc.classList.remove('expanded');
      btn.textContent = 'See more';
    }, 15000);
  }
}











document.getElementById("last-update").innerHTML = new Date(document.lastModified).toLocaleString('id-ID', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});