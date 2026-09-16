/**
 * ==========================================================================
 * LIN YANG (林陽) - PORTFOLIO & REAL-TIME CHRONO EXPERIENCE
 * Core Script: Live Clocks, Dynamic Greetings, Interactive UI
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let is24HourFormat = true;

  // DOM Elements - Hero Clock
  const clockHours = document.getElementById('clockHours');
  const clockMinutes = document.getElementById('clockMinutes');
  const clockSeconds = document.getElementById('clockSeconds');
  const clockPeriod = document.getElementById('clockPeriod');
  const currentDateLong = document.getElementById('currentDateLong');
  const dayProgressBar = document.getElementById('dayProgressBar');
  const dayProgressPercent = document.getElementById('dayProgressPercent');

  // DOM Elements - Greetings & Context
  const timeGreeting = document.getElementById('timeGreeting');
  const greetingContext = document.getElementById('greetingContext');

  // DOM Elements - Dashboard Clock
  const dashHours = document.getElementById('dashHours');
  const dashMinutes = document.getElementById('dashMinutes');
  const dashSeconds = document.getElementById('dashSeconds');
  const dashAmpm = document.getElementById('dashAmpm');
  const dashFullDate = document.getElementById('dashFullDate');

  // DOM Elements - Period Card
  const periodIcon = document.getElementById('periodIcon');
  const periodTitle = document.getElementById('periodTitle');
  const periodDescription = document.getElementById('periodDescription');
  const periodAdvice = document.getElementById('periodAdvice');

  // DOM Elements - World Clocks
  const worldTaipei = document.getElementById('worldTaipei');
  const worldTokyo = document.getElementById('worldTokyo');
  const worldLondon = document.getElementById('worldLondon');
  const worldSF = document.getElementById('worldSF');
  const footerClock = document.getElementById('footerClock');

  // Controls
  const clockFormatBtn = document.getElementById('clockFormatBtn');
  const formatText = document.getElementById('formatText');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const clickCopyEmail = document.getElementById('clickCopyEmail');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Days of Week in Traditional Chinese
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  /**
   * Helper: Zero-pad numbers
   */
  const pad = (n) => String(n).padStart(2, '0');

  /**
   * Update all clocks and date displays
   */
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dayOfWeek = weekDays[now.getDay()];
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    // 12/24 hour calculation
    let displayHours = hours;
    let period = '';

    if (!is24HourFormat) {
      period = hours >= 12 ? 'PM' : 'AM';
      displayHours = hours % 12 || 12;
    }

    const formattedHours = pad(displayHours);
    const formattedMinutes = pad(minutes);
    const formattedSeconds = pad(seconds);

    // Update Hero Clock
    if (clockHours) clockHours.textContent = formattedHours;
    if (clockMinutes) clockMinutes.textContent = formattedMinutes;
    if (clockSeconds) clockSeconds.textContent = formattedSeconds;

    if (clockPeriod) {
      if (!is24HourFormat) {
        clockPeriod.style.display = 'block';
        clockPeriod.textContent = period;
      } else {
        clockPeriod.style.display = 'none';
      }
    }

    // Update Dashboard Main Clock
    if (dashHours) dashHours.textContent = formattedHours;
    if (dashMinutes) dashMinutes.textContent = formattedMinutes;
    if (dashSeconds) dashSeconds.textContent = formattedSeconds;
    if (dashAmpm) {
      dashAmpm.textContent = !is24HourFormat ? period : '';
    }

    // Date strings
    const dateStr = `${year} 年 ${month} 月 ${date} 日 ${dayOfWeek}`;
    if (currentDateLong) currentDateLong.textContent = dateStr;
    if (dashFullDate) dashFullDate.textContent = dateStr;

    // Day Progress Percentage
    const totalSecondsToday = hours * 3600 + minutes * 60 + seconds;
    const percentToday = ((totalSecondsToday / 86400) * 100).toFixed(1);
    if (dayProgressBar) dayProgressBar.style.width = `${percentToday}%`;
    if (dayProgressPercent) dayProgressPercent.textContent = `${percentToday}%`;

    // Footer simple clock
    if (footerClock) {
      footerClock.textContent = `${pad(hours)}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Update World Clocks using Intl.DateTimeFormat
    updateWorldClocks(now);

    // Update Dynamic Greeting & Period Card
    updateGreetingAndPeriod(hours);
  }

  /**
   * Update World Clocks across key timezones
   */
  function updateWorldClocks(now) {
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    try {
      if (worldTaipei) {
        worldTaipei.textContent = new Intl.DateTimeFormat('en-GB', {
          ...timeOptions,
          timeZone: 'Asia/Taipei'
        }).format(now);
      }

      if (worldTokyo) {
        worldTokyo.textContent = new Intl.DateTimeFormat('en-GB', {
          ...timeOptions,
          timeZone: 'Asia/Tokyo'
        }).format(now);
      }

      if (worldLondon) {
        worldLondon.textContent = new Intl.DateTimeFormat('en-GB', {
          ...timeOptions,
          timeZone: 'Europe/London'
        }).format(now);
      }

      if (worldSF) {
        worldSF.textContent = new Intl.DateTimeFormat('en-GB', {
          ...timeOptions,
          timeZone: 'America/Los_Angeles'
        }).format(now);
      }
    } catch (e) {
      console.warn('Timezone calculation fallback:', e);
    }
  }

  /**
   * Determine greeting & status based on the current hour
   */
  function updateGreetingAndPeriod(hour) {
    let greetingText = '你好，我是';
    let contextText = '現正同步時區...';
    let icon = '☀️';
    let title = '專注工作時段';
    let desc = '林陽正在投入程式碼架構與產品體驗優化。';
    let advice = '深度思考 • 高效建構';

    if (hour >= 5 && hour < 9) {
      greetingText = '清晨好，我是';
      contextText = '晨曦破曉 • 迎向新靈感';
      icon = '🌅';
      title = '晨光晨醒時段';
      desc = '清晨的思維最澄澈，林陽正在規劃今日目標與技術探索。';
      advice = '梳理目標 • 一日之計';
    } else if (hour >= 9 && hour < 12) {
      greetingText = '早安，我是';
      contextText = '高能創作中 • 靈感豐沛';
      icon = '☀️';
      title = '活力上午時段';
      desc = '專注力巔峰，正在進行複雜系統邏輯梳理與界面雕琢。';
      advice = '深度專注 • 突破難點';
    } else if (hour >= 12 && hour < 14) {
      greetingText = '午安，我是';
      contextText = '午後充電 • 補充元氣';
      icon = '🍱';
      title = '午間小憩時段';
      desc = '適度休息與資訊沉澱，為下午的創造力注入飽滿能量。';
      advice = '放鬆調息 • 閱讀沉澱';
    } else if (hour >= 14 && hour < 18) {
      greetingText = '午後好，我是';
      contextText = '敏捷推進 • 實踐想法';
      icon = '🌤️';
      title = '高效午後時段';
      desc = '持續落實各項專案細節，測試回饋並優化使用者互動。';
      advice = '敏捷落實 • 團隊協同';
    } else if (hour >= 18 && hour < 22) {
      greetingText = '傍晚好，我是';
      contextText = '暮光時刻 • 複盤交流';
      icon = '🌆';
      title = '暮光沉澱時段';
      desc = '回顧一日成果，整理開源筆記與探索前沿開發生態。';
      advice = '總結覆盤 • 技術漫步';
    } else {
      greetingText = '夜深了，我是';
      contextText = '靜謐夜色 • 靈感靜思';
      icon = '🌙';
      title = '靜謐深夜時段';
      desc = '萬籟俱寂，適合閱讀新技術文檔或讓大腦充分放鬆休憩。';
      advice = '充電蓄力 • 準備迎向明日';
    }

    if (timeGreeting) timeGreeting.textContent = greetingText;
    if (greetingContext) greetingContext.textContent = contextText;
    if (periodIcon) periodIcon.textContent = icon;
    if (periodTitle) periodTitle.textContent = title;
    if (periodDescription) periodDescription.textContent = desc;
    if (periodAdvice) periodAdvice.textContent = advice;
  }

  // Toggle 12/24 hour format
  if (clockFormatBtn) {
    clockFormatBtn.addEventListener('click', () => {
      is24HourFormat = !is24HourFormat;
      if (formatText) {
        formatText.textContent = is24HourFormat ? '24H' : '12H';
      }
      updateClock();
      showToast(is24HourFormat ? '已切換為 24 小時制' : '已切換為 12 小時制 (AM/PM)');
    });
  }

  /**
   * Clipboard Copy Helper with Visual Toast
   */
  function setupCopyButton(element, textToCopy, successMsg) {
    if (!element) return;
    element.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(successMsg);
      } catch (err) {
        // Fallback for browsers with restricted clipboard permission
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(successMsg);
      }
    });
  }

  setupCopyButton(copyEmailBtn, 'linyang.creative@gmail.com', '已複製林陽的 Email：linyang.creative@gmail.com');
  setupCopyButton(clickCopyEmail, 'linyang.creative@gmail.com', '已複製林陽的 Email：linyang.creative@gmail.com');

  /**
   * Toast notification display
   */
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = message;
    toastNotification.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  /**
   * Interactive Contact Form handler
   */
  window.handleSendMessage = function() {
    const senderName = document.getElementById('senderName');
    const senderEmail = document.getElementById('senderEmail');
    const senderMsg = document.getElementById('senderMsg');
    const formNotice = document.getElementById('formNotice');
    const sendBtn = document.getElementById('sendBtn');

    if (!senderName || !senderEmail || !senderMsg) return;

    const name = senderName.value.trim();
    if (!name) return;

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span>發送中...</span>';
    }

    setTimeout(() => {
      if (formNotice) {
        formNotice.style.color = '#10b981';
        formNotice.textContent = `感謝您的留言，${name}！林陽已收到您的即時訊息，將盡快回覆。`;
      }
      showToast(`留言已成功送出！感謝您的聯繫，${name}。`);

      senderName.value = '';
      senderEmail.value = '';
      senderMsg.value = '';

      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<span>發送即時留言</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
      }
    }, 700);
  };

  // Quick message link anchor
  const quickMsgTrigger = document.getElementById('quickMsgTrigger');
  if (quickMsgTrigger) {
    quickMsgTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const senderMsg = document.getElementById('senderMsg');
      if (senderMsg) {
        senderMsg.focus();
        senderMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /**
   * 3D Tilt Parallax on Avatar Visual Card
   */
  const visualCard = document.getElementById('visualCard');
  if (visualCard && window.matchMedia('(pointer: fine)').matches) {
    visualCard.addEventListener('mousemove', (e) => {
      const rect = visualCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      visualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    visualCard.addEventListener('mouseleave', () => {
      visualCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      visualCard.style.transition = 'transform 0.5s ease';
    });

    visualCard.addEventListener('mouseenter', () => {
      visualCard.style.transition = 'none';
    });
  }

  /**
   * Active Navigation Links on Scroll
   */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /**
   * Mobile Toggle Navigation
   */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(6, 9, 19, 0.96)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '24px';
        navMenu.style.gap = '18px';
        navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // Initial Clock Call and Start Interval
  updateClock();
  setInterval(updateClock, 1000);
});
