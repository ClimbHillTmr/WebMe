(() => {
  'use strict';
  let language = 'zh';
  let topic = 'all';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const rows = $$('.paper-row');
  const search = $('#paper-search');
  const projects = {
    droplet: {
      zh: ['智能液滴实验平台', '结合 YOLO 液滴检测、SAM 图像分割与 OpenCV 形态分析，研究液滴识别、体积估计和路径规划，连接视觉算法与数字微流控实验。', '当前为研究与工程开发项目。'],
      en: ['Intelligent droplet platform', 'Combining YOLO detection, SAM segmentation, and OpenCV morphological analysis to study droplet identification, volume estimation, and path planning in digital microfluidics.', 'An ongoing research and engineering project.']
    },
    him: {
      zh: ['Hemodynamic Instability Memory', '研究已完成的透析历史是否为后续治疗不稳定性提供超越当前状态的预测信息，通过患者级评估和外部验证考察历史信息的增量价值。', '在研项目；研究目标是预测信息的评价，不据此推断生理记忆或因果关系。'],
      en: ['Hemodynamic Instability Memory', 'Evaluating whether completed dialysis history adds predictive information about subsequent treatment instability beyond the latest state, using patient-level evaluation and external validation.', 'Ongoing research into predictive information; physiological memory and causal effects are not inferred.']
    }
  };
  function filterPapers() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    rows.forEach(row => {
      const text = row.textContent.toLocaleLowerCase();
      row.hidden = !(topic === 'all' || row.dataset.topic === topic) || !terms.every(term => text.includes(term));
      if (!row.hidden) count++;
    });
    $('#paper-empty').hidden = count !== 0;
    $('#paper-count').textContent = language === 'zh' ? `${count} 篇论文` : `${count} ${count === 1 ? 'paper' : 'papers'}`;
  }
  function closeMenu() {
    $('#nav').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('en', next === 'en');
    $$('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[next]; });
    search.placeholder = search.dataset[next === 'zh' ? 'placeholderZh' : 'placeholderEn'];
    search.setAttribute('aria-label', next === 'zh' ? '搜索论文' : 'Search papers');
    $('#language').textContent = next === 'zh' ? 'EN' : '中文';
    $('#language').setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换为中文');
    $('#menu').setAttribute('aria-label', next === 'zh' ? '切换导航' : 'Toggle navigation');
    $$('.close-dialog').forEach(el => el.setAttribute('aria-label', next === 'zh' ? '关闭' : 'Close'));
    $('#copy-status').textContent = '';
    filterPapers();
  }
  $('#language').addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
  $('#menu').addEventListener('click', () => {
    const opened = $('#nav').classList.toggle('open');
    $('#menu').setAttribute('aria-expanded', String(opened));
  });
  $$('#nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.filter;
    $$('.filter').forEach(el => {
      el.classList.toggle('active', el === button);
      el.setAttribute('aria-pressed', String(el === button));
    });
    filterPapers();
  }));
  search.addEventListener('input', filterPapers);
  $$('.cite').forEach(button => button.addEventListener('click', () => {
    $('#citation-text').value = window.PUBLICATION_CITATIONS[button.dataset.cite];
    $('#copy-status').textContent = '';
    $('#citation-dialog').showModal();
  }));
  $('#copy-citation').addEventListener('click', async () => {
    const field = $('#citation-text');
    try {
      await navigator.clipboard.writeText(field.value);
      $('#copy-status').textContent = language === 'zh' ? '已复制' : 'Copied';
    } catch {
      field.focus();
      field.select();
      $('#copy-status').textContent = language === 'zh' ? '引用已选中，请手动复制。' : 'Citation selected. Copy it manually.';
    }
  });
  $$('[data-project]').forEach(button => button.addEventListener('click', () => {
    const [title, ...paragraphs] = projects[button.dataset.project][language];
    $('#project-title').textContent = title;
    $('#project-detail').replaceChildren(...paragraphs.map(text => {
      const p = document.createElement('p'); p.textContent = text; return p;
    }));
    $('#project-dialog').showModal();
  }));
  $$('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) $$('#nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-15% 0px -65% 0px' });
    $$('main section[id]').forEach(section => observer.observe(section));
  }
  setLanguage(language);
})();
