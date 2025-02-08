import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

register('en', () => import('../locale/en.json'));
register('ru', () => import('../locale/ru.json'));
register('es', () => import('../locale/es.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});

// Ensure the locale is set immediately
locale.set(getLocaleFromNavigator());
