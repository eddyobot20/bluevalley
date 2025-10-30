const properties = [
  {
    id: 'p1',
    title: 'Luxury Family House',
    type: 'House',
    price: 1000000000,
    location: 'Asokoro, Abuja',
    beds: 4,
    baths: 4,
    size: '3200 sqft',
    images: [
      'copy-4Bedroom Asokoro.jpg', '4Bedroom Asokoro pool.jpg', '4Bedroom Asokoro inhouse1.jpg', '4Bedroom Asokoro toilet.jpg', '4Bedroom Asokoro room.jpg', '4Bedroom Asokoro wardrope.jpg'
    ],
    description: 'Beautiful family house in a quiet neighborhood. Spacious rooms, modern kitchen, and large backyard.',
    features: ['4 bedrooms', '4 bathrooms', 'Pool', 'Garden', 'Near schools']
  },
  {
    id: 'p2',
    title: 'Modern City Apartment',
    type: 'Apartment',
    price: 135000000,
    location: 'Wuye, Abuja',
    beds: 3,
    baths: 3,
    size: '1100 sqft',
    images: [
      '3BedroomAp Wuye.jpg'
    ],
    description: 'Sleek apartment with city views and access to public transport and amenities.',
    features: ['3 bedrooms', '3 bathrooms', 'Balcony', 'Gym access']
  },
  {
    id: 'p3',
    title: 'Luxury Family House',
    type: 'House',
    price: 270000000,
    location: 'Ajah, Lagos',
    beds: 5,
    baths: 5,
    size: '1800 sqft',
    images: [
      '5Bedroom Detached Ajah.jpg'
    ],
    description: 'Comfortable luxury home ideal for growing families. Quiet street and nearby park.',
    features: ['5 bedrooms', '5 bathrooms', 'Parking']
  },
  {
    id: 'p4',
    title: 'Family House',
    type: 'House',
    price: 165000000,
    location: ' Mandela Estate Sars Road Port Harcourt ',
    beds: 4,
    baths: 4,
    size: '5000 sqm',
    images: [
      '4Bedroom ph.jpg'
    ],
    description: 'Comfortable luxury home ideal for growing families. Quiet street and nearby park.',
    features: ['Water access', 'Clear title']
  }
];

function $q(sel, root=document) { return root.querySelector(sel); }
function $qa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

function formatPrice(n){
  return n.toLocaleString(undefined, { style:'currency', currency: 'NGN', maximumFractionDigits:0 });
}

function renderFeatured(){
  const container = $q('#featuredGrid');
  if(!container) return;
  container.innerHTML = '';
  const featured = properties.slice(0,3);
  featured.forEach(p=>{
    const col = document.createElement('div'); col.className='col-md-4';
    col.innerHTML = `
      <div class="property-card card h-100">
        <img src="${p.images[0]}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="mb-1 text-muted small">${p.location} · ${p.type}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="fw-bold">${formatPrice(p.price)}</div>
            <a href="property.html?id=${p.id}" class="btn btn-sm btn-outline-primary">View</a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderListings(list = properties){
  const grid = $q('#listingsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(p=>{
    const col = document.createElement('div'); col.className='col-md-6';
    col.innerHTML = `
      <div class="card property-card h-100">
        <img src="${p.images[0]}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <p class="text-muted small mb-2">${p.location} · ${p.type}</p>
          <p class="mb-3 text-muted small truncate">${p.description}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="fw-bold">${formatPrice(p.price)}</div>
            <div>
              <a href="property.html?id=${p.id}" class="btn btn-primary btn-sm me-2">Details</a>
              <button class="btn btn-outline-warning btn-sm save-btn" data-id="${p.id}">♥</button>
            </div>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });

  const countEl = $q('#resultCount'); if(countEl) countEl.textContent = list.length;
}

function renderPropertyDetails(id){
  const p = properties.find(x=>x.id===id);
  if(!p) return;
  $q('#propTitle').textContent = p.title;
  $q('#propLocation').textContent = `${p.location} • ${p.type} • ${p.size}`;
  $q('#propPrice').textContent = formatPrice(p.price);
  $q('#propDescription').textContent = p.description;

  const ul = $q('#propFeatures'); ul.innerHTML = '';
  p.features.forEach(f=>{
    const li = document.createElement('li'); li.textContent = '• ' + f;
    ul.appendChild(li);
  });

  const gallery = $q('#gallery');
  gallery.innerHTML = `
    <div id="propCarousel" class="carousel slide mb-3" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${p.images.map((img,i)=>`
          <div class="carousel-item ${i===0?'active':''}">
            <img src="${img}" class="d-block w-100 rounded" alt="${p.title}">
          </div>`).join('')}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#propCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#propCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;

  const favBtn = $q('#favBtn');
  if(favBtn){
    const favs = JSON.parse(localStorage.getItem('bk_favs')||'[]');
    favBtn.textContent = favs.includes(p.id)? 'Saved' : 'Save to favorites';
    favBtn.onclick = ()=>{
      let favs = JSON.parse(localStorage.getItem('bk_favs')||'[]');
      if(favs.includes(p.id)){
        favs = favs.filter(x=>x!==p.id);
        favBtn.textContent = 'Save to favorites';
      } else {
        favs.push(p.id); favBtn.textContent = 'Saved';
      }
      localStorage.setItem('bk_favs', JSON.stringify(favs));
    };
  }
}

function applyFilters(){
  const loc = $q('#filterLocation')?.value.trim().toLowerCase() || '';
  const type = $q('#filterType')?.value || '';
  const min = parseInt($q('#filterMin')?.value || 0,10);
  const max = parseInt($q('#filterMax')?.value || Infinity,10);

  const filtered = properties.filter(p=>{
    const okLoc = !loc || p.location.toLowerCase().includes(loc);
    const okType = !type || p.type === type;
    const okPrice = p.price >= (isNaN(min)?0:min) && p.price <= (isNaN(max)?Infinity:max);
    return okLoc && okType && okPrice;
  });

  renderListings(filtered);
}

function heroSearchHandler(e){
  e.preventDefault();
  const loc = $q('#heroLocation')?.value.trim() || '';
  const type = $q('#heroType')?.value || '';
  sessionStorage.setItem('bk_search', JSON.stringify({loc, type}));
  window.location.href = 'properties.html';
}

function preloadSearchOnProperties(){
  const s = sessionStorage.getItem('bk_search');
  if(!s) return;
  try {
    const {loc, type} = JSON.parse(s);
    if(loc) $q('#filterLocation').value = loc;
    if(type) $q('#filterType').value = type;
    applyFilters();
    sessionStorage.removeItem('bk_search');
  } catch(e){}
}

function attachSaveButtons(){
  $qa('.save-btn').forEach(btn=>{
    btn.onclick = ()=> {
      const id = btn.dataset.id;
      let favs = JSON.parse(localStorage.getItem('bk_favs')||'[]');
      if(!favs.includes(id)){
        favs.push(id);
        btn.classList.remove('btn-outline-warning');
        btn.classList.add('btn-warning');
      } else {
        favs = favs.filter(x=>x!==id);
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-outline-warning');
      }
      localStorage.setItem('bk_favs', JSON.stringify(favs));
    };
  });
}

function setupReveal(){
  const items = $qa('[data-reveal]');
  if(!('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('is-revealed'));
    return;
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(i=> io.observe(i));
}

document.addEventListener('DOMContentLoaded', ()=>{
  $qa('#year,#year2,#year3,#year4').forEach(e=>{ if(e) e.textContent = new Date().getFullYear(); });

  renderFeatured();
  setupReveal();

  const heroForm = $q('#heroSearchForm');
  if(heroForm){
    heroForm.addEventListener('submit', heroSearchHandler);
  }

  if($q('#listingsGrid')){
    renderListings(properties);
    preloadSearchOnProperties();

    const applyBtn = $q('#applyFilters');
    if(applyBtn) applyBtn.addEventListener('click', applyFilters);

    const obs = new MutationObserver(()=> attachSaveButtons());
    obs.observe($q('#listingsGrid'), {childList:true});
    attachSaveButtons();
  }

  if($q('#propertyWrapper')){
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || properties[0].id;
    renderPropertyDetails(id);

    const form = $q('#inquiryForm');
    if(form) form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      alert('Inquiry sent! The agent will contact you soon.');
      form.reset();
    });
  }
});
