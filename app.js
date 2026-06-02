const tempEl = document.getElementById('weather-temp');
const descEl = document.getElementById('weather-desc');
const metaEl = document.getElementById('weather-meta');
const emojiEl = document.getElementById('weather-emoji');
const weatherCard = document.getElementById('weather-card');
const retryBtn = document.getElementById('retry-geo');
const forecastEl = document.getElementById('forecast');

const weatherCodes = [
  { codes: [0], icon: '☀️', label: 'Clear sky' },
  { codes: [1, 2], icon: '⛅', label: 'Partly cloudy' },
  { codes: [3], icon: '☁️', label: 'Cloudy' },
  { codes: [45, 48], icon: '🌫️', label: 'Foggy' },
  { codes: [51, 53, 55, 56, 57], icon: '🌦️', label: 'Drizzle' },
  { codes: [61, 63, 65, 66, 67], icon: '🌧️', label: 'Rain' },
  { codes: [71, 73, 75, 77], icon: '❄️', label: 'Snow' },
  { codes: [80, 81, 82], icon: '🌧️', label: 'Showers' },
  { codes: [85, 86], icon: '🌨️', label: 'Snow showers' },
  { codes: [95, 96, 99], icon: '⛈️', label: 'Thunderstorm' }
];

function getWeatherInfo(code) {
  return weatherCodes.find((item) => item.codes.includes(code)) || { icon: '🌈', label: 'Mixed conditions' };
}

function setWeather(current) {
  const { temperature, weathercode } = current;
  const info = getWeatherInfo(weathercode);
  tempEl.textContent = `${Math.round(temperature)}°F`;
  descEl.textContent = info.label;
  emojiEl.textContent = info.icon;
  metaEl.textContent = 'Current conditions for your location';
  weatherCard.classList.remove('error');
  retryBtn.style.display = 'none';
}

function setError(message, showRetry = false) {
  weatherCard.classList.add('error');
  tempEl.textContent = '--°F';
  descEl.textContent = 'Weather unavailable';
  metaEl.textContent = message;
  retryBtn.style.display = showRetry ? 'block' : 'none';
  if (forecastEl) forecastEl.innerHTML = '';
}

function getDayName(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}

function renderForecast(daily) {
  if (!daily || !daily.time) {
    forecastEl.innerHTML = '';
    return;
  }

  const times = daily.time;
  const max = daily.temperature_2m_max;
  const min = daily.temperature_2m_min;
  const codes = daily.weathercode;

  let html = '<div class="forecast-grid-inner">';
  for (let i = 0; i < times.length; i++) {
    const info = getWeatherInfo(codes[i]);
    html += `
      <div class="forecast-item">
        <div class="day">${getDayName(times[i])}</div>
        <div class="icon">${info.icon}</div>
        <div class="temps"><span class="hi">${Math.round(max[i])}°</span><span class="lo">${Math.round(min[i])}°</span></div>
      </div>
    `;
  }
  html += '</div>';
  forecastEl.innerHTML = html;
}

function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&temperature_unit=fahrenheit&timezone=auto`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.current_weather) {
        setWeather(data.current_weather);
      } else {
        setError('Unable to load weather right now.');
      }

      if (data.daily) {
        renderForecast(data.daily);
      }
    })
    .catch(() => setError('Unable to load weather right now.'));
}

function requestGeolocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setError('Enable location to see your weather.', true);
        } else if (error.code === error.TIMEOUT) {
          setError('Location request timed out. Please try again.', true);
        } else {
          setError('Unable to get your location. Please try again.', true);
        }
      },
      { timeout: 10000 }
    );
  } else {
    setError('Geolocation is not supported in your browser.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (retryBtn) retryBtn.addEventListener('click', requestGeolocation);
    requestGeolocation();
  });
} else {
  if (retryBtn) retryBtn.addEventListener('click', requestGeolocation);
  requestGeolocation();
}
