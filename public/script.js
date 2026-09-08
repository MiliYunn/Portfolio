document.addEventListener('DOMContentLoaded', () => {
  window.lucide?.createIcons();

  const header = document.querySelector('#site-header');
  const progressBar = document.querySelector('#scroll-progress');
  const sections = [...document.querySelectorAll('.world-section')];
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  let ticking = false;

  const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

  const updateWorlds = () => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollRange = document.documentElement.scrollHeight - viewportHeight;
    header?.classList.toggle('scrolled', scrollTop > 24);
    document.body.classList.toggle('in-worlds', scrollTop > viewportHeight * .62 && scrollTop < document.documentElement.scrollHeight - viewportHeight * .45);
    if (progressBar) progressBar.style.transform = `scaleX(${scrollRange > 0 ? scrollTop / scrollRange : 0})`;

    let activeSection = sections[0];
    let closestDistance = Number.POSITIVE_INFINITY;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const approach = clamp((viewportHeight * 1.04 - rect.top) / (viewportHeight * .88));
      const arrived = rect.top <= viewportHeight * .22 && rect.bottom >= viewportHeight * .7;
      section.style.setProperty('--approach', approach.toFixed(3));
      section.classList.toggle('arrived', arrived);
      section.classList.toggle('visible-world', rect.top < viewportHeight * 1.15 && rect.bottom > -viewportHeight * .15);

      const distance = Math.abs(rect.top + rect.height * .42 - viewportHeight * .5);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeSection = section;
      }
    });

    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === activeSection?.dataset.world));
    ticking = false;
  };

  const requestWorldUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateWorlds);
  };
  window.addEventListener('scroll', requestWorldUpdate, { passive: true });
  window.addEventListener('resize', requestWorldUpdate);

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const skillContent = {
    backend: {
      eyebrow: 'Backend toolkit',
      title: 'Server-side languages',
      tags: ['Python', 'Java', 'C#', 'C++'],
      description: 'Building application logic, APIs, and reliable backend workflows.',
      icon: 'braces'
    },
    frontend: {
      eyebrow: 'Frontend toolkit',
      title: 'Interface technologies',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      description: 'Creating responsive, accessible interfaces with clear interaction patterns.',
      icon: 'panels-top-left'
    },
    data: {
      eyebrow: 'Data toolkit',
      title: 'Databases and design',
      tags: ['PostgreSQL', 'MySQL', 'Database Design'],
      description: 'Structuring dependable data models and efficient application storage.',
      icon: 'database'
    },
    systems: {
      eyebrow: 'Systems & quality toolkit',
      title: 'Infrastructure and testing',
      tags: ['Linux Fundamentals', 'Computer Networking', 'Software Testing', 'Quality Engineering'],
      description: 'Understanding system foundations and validating software for dependable delivery.',
      icon: 'network'
    }
  };
  const skillTabs = [...document.querySelectorAll('[data-skill]')];
  const skillPanel = document.querySelector('.skill-panel');
  const showSkill = (key) => {
    const content = skillContent[key];
    if (!content || !skillPanel) return;
    skillTabs.forEach((tab) => {
      const selected = tab.dataset.skill === key;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    skillPanel.classList.remove('skill-panel-pop');
    void skillPanel.offsetWidth;
    document.querySelector('#skill-eyebrow').textContent = content.eyebrow;
    document.querySelector('#skill-title').textContent = content.title;
    document.querySelector('#skill-description').textContent = content.description;
    document.querySelector('#skill-tags').innerHTML = content.tags.map((tag) => `<span>${tag}</span>`).join('');
    document.querySelector('.skill-panel-icon').innerHTML = `<i data-lucide="${content.icon}"></i>`;
    window.lucide?.createIcons();
    skillPanel.classList.add('skill-panel-pop');
  };
  skillTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showSkill(tab.dataset.skill));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextTab = skillTabs[(index + direction + skillTabs.length) % skillTabs.length];
      nextTab.focus();
      showSkill(nextTab.dataset.skill);
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  updateWorlds();
});
