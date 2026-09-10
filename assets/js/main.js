/* ============================================================
   wyratek.com — Shared interactions
   Mobile nav · dropdown · FAQ accordion · quote form · guide
   ============================================================ */
(function(){
  'use strict';

  /* ---- Mobile nav ---- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Open dropdown groups on touch (mobile)
    var navItems = nav.querySelectorAll('li');
    navItems.forEach(function(li){
      var link = li.querySelector('a');
      var dd = li.querySelector('.dropdown');
      if (dd) {
        link.addEventListener('click', function(e){
          if (nav.classList.contains('open')) {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      }
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function(){
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---- Quote form (front-end demo; wire to backend later) ---- */
  var form = document.getElementById('quoteForm');
  var formOk = document.getElementById('formOk');
  if (form && formOk) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('q-name').value.trim();
      var email = document.getElementById('q-email').value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk) {
        alert('Please fill in your name and a valid work email.');
        return;
      }
      formOk.classList.add('show');
      form.reset();
      setTimeout(function(){ formOk.classList.remove('show'); }, 8000);
    });
  }

  /* ---- Machine Selection Guide ---- */
  var GUIDE = {
    bending: {
      label: 'Sheet or tube?',
      options: [
        { t:'Thin sheet (\u22643 mm)', r:{ n:'Electric Press Brake', d:'High-speed electric bending for thin sheet with maximum energy efficiency.', u:'products/press-brake/electric-press-brake/', sel:'Press Brake' } },
        { t:'Sheet 3\u201312 mm', r:{ n:'CNC Press Brake', d:'CNC-controlled bending with precise crowning compensation for medium sheet.', u:'products/press-brake/cnc-press-brake/', sel:'Press Brake' } },
        { t:'Heavy plate (>12 mm)', r:{ n:'Hybrid Press Brake', d:'High-tonnage hybrid bending for thick plate and long workpieces.', u:'products/press-brake/hybrid-press-brake/', sel:'Press Brake' } },
        { t:'Tube & profile', r:{ n:'CNC Tube Bender', d:'Precision bending of pipes and profiles with multi-axis CNC control.', u:'products/tube-bending-machine/cnc-tube-bender/', sel:'Tube Bending Machine' } }
      ]
    },
    cutting: {
      label: 'Material form?',
      options: [
        { t:'Sheet metal', r:{ n:'Sheet Laser Cutting Machine', d:'Fiber laser cutting of sheet metal with high speed and fine edge quality.', u:'products/laser-cutting-machine/sheet-laser-cutting-machine/', sel:'Laser Cutting Machine' } },
        { t:'Tube & pipe', r:{ n:'Tube Laser Cutting Machine', d:'Fiber laser cutting for round, square and profile tubes.', u:'products/laser-cutting-machine/tube-laser-cutting-machine/', sel:'Laser Cutting Machine' } },
        { t:'Both sheet & tube', r:{ n:'Sheet & Tube Laser Cutting Machine', d:'Dual-purpose laser cutting for mixed sheet and tube production.', u:'products/laser-cutting-machine/sheet-and-tube-laser-cutting-machine/', sel:'Laser Cutting Machine' } },
        { t:'Large-format plate', r:{ n:'Large-Format Laser Cutting Machine', d:'Wide-format fiber laser cutting for oversized sheets and thick plate.', u:'products/laser-cutting-machine/large-format-laser-cutting-machine/', sel:'Laser Cutting Machine' } }
      ]
    },
    shearing: {
      label: 'Material thickness?',
      options: [
        { t:'Thin sheet (\u22644 mm)', r:{ n:'Swing-Beam Shearing Machine', d:'Light-duty swing-beam shear for fast, clean cuts on thin sheet.', u:'products/shearing-machine/swing-beam-shearing-machine/', sel:'Shearing Machine' } },
        { t:'Medium & heavy plate (>4 mm)', r:{ n:'Guillotine Shearing Machine', d:'Heavy-duty guillotine shear with hydraulic hold-downs for accurate cuts.', u:'products/shearing-machine/guillotine-shearing-machine/', sel:'Shearing Machine' } }
      ]
    },
    forming: {
      label: 'Forming application?',
      options: [
        { t:'Cylinders & curved sections', r:{ n:'Three-Roll Plate Rolling Machine', d:'Symmetrical three-roll bending for cylinders, cones and curved sections.', u:'products/plate-rolling-machine/three-roll-plate-rolling-machine/', sel:'Plate Rolling Machine' } },
        { t:'Pressing & deep drawing', r:{ n:'Four-Column Hydraulic Press', d:'Four-column hydraulic press for forming, stamping and deep drawing.', u:'products/hydraulic-press/four-column-hydraulic-press/', sel:'Hydraulic Press' } },
        { t:'Punching & hole making', r:{ n:'Turret Punch Press', d:'High-speed turret punching for precise hole patterns in sheet metal.', u:'products/punch-press/turret-punch-press/', sel:'Punch Press' } }
      ]
    }
  };
  var guideProcess = document.getElementById('guideProcess');
  var guideOptions = document.getElementById('guideOptions');
  var guideLabel2 = document.getElementById('guideLabel2');
  var guideResult = document.getElementById('guideResult');
  var guideRec = document.getElementById('guideRec');
  var guideView = document.getElementById('guideView');
  var guideQuote = document.getElementById('guideQuote');
  if (guideProcess && guideOptions && guideLabel2 && guideResult && guideRec && guideView && guideQuote) {
    guideProcess.addEventListener('click', function(e){
      var btn = e.target.closest('.guide-opt');
      if (!btn) return;
      guideProcess.querySelectorAll('.guide-opt').forEach(function(b){ b.classList.remove('sel'); });
      btn.classList.add('sel');
      var data = GUIDE[btn.getAttribute('data-p')];
      guideLabel2.style.display = 'block';
      guideOptions.innerHTML = '';
      data.options.forEach(function(o){
        var b = document.createElement('button');
        b.className = 'guide-opt';
        b.textContent = o.t;
        b.addEventListener('click', function(){
          showGuideResult(o.r);
        });
        guideOptions.appendChild(b);
      });
      guideResult.classList.remove('show');
    });
  }
  function showGuideResult(r){
    guideRec.innerHTML = '<b>' + r.n + '</b>' + r.d;
    guideView.setAttribute('href', r.u);
    guideQuote.onclick = function(){
      var sel = document.getElementById('q-product');
      if (sel) sel.value = r.sel;
    };
    guideResult.classList.add('show');
    guideResult.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }
})();
