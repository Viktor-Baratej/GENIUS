document.addEventListener('DOMContentLoaded', function () {
  const modules = document.querySelectorAll('.module');

  modules.forEach((module) => {
    const title = module.querySelector('.program-module-title');
    const toggleBtn = module.querySelector('.module-toggle');
    const toggleText = toggleBtn?.querySelector('.module-btn-texts');
    const content = module.querySelector('.content-wrapper');

    // Початковий стан
    module.classList.remove('active');
    content.style.maxHeight = '0px';
    if (toggleText) toggleText.textContent = 'Більше';

    const toggle = () => {
      const isActive = module.classList.contains('active');

      // Закриваємо всі інші модулі
      modules.forEach((m) => {
        const c = m.querySelector('.content-wrapper');
        const t = m.querySelector('.module-btn-texts');
        m.classList.remove('active');
        if (c) c.style.maxHeight = '0px';
        if (t) t.textContent = 'Більше';
      });

      // Якщо модуль неактивний — відкрити
      if (!isActive) {
        module.classList.add('active');
        const scrollHeight = content.scrollHeight;
        content.style.maxHeight = `${scrollHeight}px`;
        if (toggleText) toggleText.textContent = 'Менше';
      }
      // Якщо модуль активний — закрити і повернути текст
      else {
        module.classList.remove('active');
        content.style.maxHeight = '0px';
        if (toggleText) toggleText.textContent = 'Більше';
      }
    };

    // Обробники кліку
    if (title) title.addEventListener('click', toggle);
    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  });
});
