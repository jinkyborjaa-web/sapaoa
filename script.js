// header state on scroll + keep scroll offset synced to actual navbar height
  const header = document.getElementById('siteHeader');
  const syncHeaderHeight = () => {
    if(!header) return;
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  };
  const onScroll = () => {
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
    syncHeaderHeight();
  };
  window.addEventListener('resize', syncHeaderHeight, {passive:true});
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  syncHeaderHeight();

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('primaryNav');
  menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
  }));

  // scroll spy — derives section list from the nav-link hrefs present on the page,
  // so the same script works on any page regardless of which section ids it has
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map(l => l.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => document.getElementById(href.slice(1)))
    .filter(Boolean);
  if(sections.length){
    const spy = () => {
      let current = sections[0].id;
      const pos = window.scrollY + header.offsetHeight + 24;
      sections.forEach(sec => { if(sec.offsetTop <= pos) current = sec.id; });
      links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };
    document.addEventListener('scroll', spy, {passive:true});
    spy();
  }

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
