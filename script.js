document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const projectDetails = {
  'living-room': {
    eyebrow: 'Residential Interiors',
    title: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80',
    description: 'A warm, elegant living space designed to balance comfort with a refined, timeless look — built around how the family actually uses the room.',
    features: [
      'False ceiling with cove and accent lighting',
      'Custom TV unit and feature wall paneling',
      'Premium upholstery and soft furnishings',
      'Neutral palette with warm accent tones'
    ]
  },
  'modular-kitchen': {
    eyebrow: 'Modular Kitchens',
    title: 'Modular Kitchen',
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80',
    description: 'Smart, functional kitchen layouts with premium finishes and storage planning designed around your cooking habits and space.',
    features: [
      'L-shaped, parallel, or island layouts tailored to space',
      'Soft-close cabinets with smart storage solutions',
      'Quartz or granite countertops',
      'Chimney, hob, and appliance integration'
    ]
  },
  'bedroom': {
    eyebrow: 'Residential Interiors',
    title: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'A calm, elegant bedroom retreat with functional storage and layered lighting for a relaxing, personal feel.',
    features: [
      'Custom wardrobes with internal storage planning',
      'Upholstered bed back panel and headboard',
      'Layered ambient and task lighting',
      'Curated color palette for a restful atmosphere'
    ]
  },
  'office-space': {
    eyebrow: 'Commercial Interiors',
    title: 'Office Space',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Office and workspace interiors designed for comfort, productivity, and a strong brand presence.',
    features: [
      'Ergonomic workstations and layout planning',
      'Meeting rooms and collaborative spaces',
      'Brand-aligned finishes and signage',
      'Acoustic comfort and lighting design'
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalClose = document.querySelector('.modal-close');
let lastFocusedElement = null;

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;
  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalEyebrow.textContent = data.eyebrow;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalFeatures.innerHTML = '';
  data.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });
  lastFocusedElement = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeProjectModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.gallery-item[data-project]').forEach(item => {
  item.addEventListener('click', () => openProjectModal(item.dataset.project));
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(item.dataset.project);
    }
  });
});

modalClose.addEventListener('click', closeProjectModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeProjectModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('active')) closeProjectModal();
});
