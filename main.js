const app = document.getElementById('app');

function sendAnalyticsEvent(gaEvent, ymEvent) {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', gaEvent);
  }
  // Yandex Metrika
  if (typeof window.ym === 'function') {
    window.ym(96171108, 'reachGoal', ymEvent);
  }
}

function renderLanding() {
  // Отправляем событие просмотра экрана только один раз за сессию
  if (!sessionStorage.getItem('landingViewed')) {
    sendAnalyticsEvent('6733_page_view_var1', '6733_page_view_var1');
    sessionStorage.setItem('landingViewed', '1');
  }
  // Если уже была заглушка, не показываем лендинг
  if (localStorage.getItem('placeholderShown') === '1') {
    renderPlaceholder();
    return;
  }
  app.innerHTML = `
    <div class="landing">
      <div class="landing__hero">
        <img src="img/shield.png" alt="Страховка онлайн-покупок" class="landing__hero-img" />
      </div>
      <div class="landing__content">
        <div class="landing__title">Страховка онлайн покупок с гарантией возврата денег</div>
        <div class="landing__desc">
          Если магазин не оформит возврат или откажет без причины &ndash; Альфа вернёт 100% суммы
        </div>
        <ul class="landing__list">
          <li>
            <img src="img/Icon.png" class="landing__list-icon" alt="Стоимость страховки" />
            <div class="landing__list-text">
              <span class="landing__list-title">Стоимость &ndash; 1% от суммы покупки.</span>
              <span class="landing__list-desc">Какие покупки застраховать &ndash; выбираете при оплате</span>
            </div>
          </li>
          <li>
            <img src="img/clock.svg" class="landing__list-icon" alt="Без споров" />
            <div class="landing__list-text">
              <span class="landing__list-title">Без споров и ожиданий</span>
            </div>
          </li>
          <li>
            <img src="img/guard.png" class="landing__list-icon" alt="Защита" />
            <div class="landing__list-text">
              <span class="landing__list-title">Защита от отказа магазина</span>
            </div>
          </li>
          <li>
            <img src="img/Icon2.png" class="landing__list-icon" alt="Возврат на карту" />
            <div class="landing__list-text">
              <span class="landing__list-title">Возврат прямо на карту</span>
            </div>
          </li>
        </ul>
      </div>
      <button class="landing__button" id="sendBtn">Подключить</button>
    </div>
  `;
  document.getElementById('sendBtn').onclick = () => {
    localStorage.setItem('placeholderShown', '1');
    renderPlaceholder();
    // Очищаем историю, чтобы нельзя было вернуться назад
    history.replaceState(null, '', location.href);
  };
}

function renderPlaceholder() {
  // Отправляем событие просмотра финальной страницы только один раз за сессию
  if (!sessionStorage.getItem('endPageViewed')) {
    sendAnalyticsEvent('6733_end_page_view_var1', '6733_end_page_view_var1');
    sessionStorage.setItem('endPageViewed', '1');
  }
  app.innerHTML = `
    <div class="placeholder">
      <img src="img/moai.png" alt="Moai" class="placeholder__img" />
      <div class="placeholder__title">Только тссс</div>
      <div class="placeholder__desc">
        Вы поучаствовали в очень важном исследовании, которое поможет улучшить продукт. Вы – наш герой!
        <br />
        Продукта не существует
      </div>
    </div>
  `;
  // Очищаем историю, чтобы нельзя было вернуться назад
  history.replaceState(null, '', location.href);
}

renderLanding(); 