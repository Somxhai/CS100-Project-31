document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.isotope .item');
    const navHome = document.querySelector('nav a.home');
    const navActivity = document.querySelector('nav a.activity');
    const navH1 = document.querySelector('nav h1');
    items.forEach(item => {
      item.addEventListener('mouseover', function () {
        const color = this.getAttribute('data-color');
        const textColor = this.getAttribute('data-text-color');
        document.documentElement.style.setProperty('--body-bg', `var(${color})`);
        document.getElementById('Greetings').style.color = `var(${textColor})`;
        document.getElementById('Code31').style.color = `var(${textColor})`;
        document.documentElement.style.setProperty('--greetings-text-color', `var(${textColor})`);
        document.documentElement.style.setProperty('--code31-text-color', `var(${textColor})`);
        navHome.style.color = `var(${textColor})`;
        navActivity.style.color = `var(${textColor})`;
        navH1.style.color = `var(${textColor})`;
      });
      item.addEventListener('mouseout', function () {
        document.documentElement.style.setProperty('--body-bg', '#f5f5f5');
        document.getElementById('Greetings').style.color = '';
        document.getElementById('Code31').style.color = '';
        document.documentElement.style.removeProperty('--greetings-text-color');
        document.documentElement.style.removeProperty('--code31-text-color');
        navHome.style.color = 'var(--body-text)';
        navActivity.style.color = 'var(--body-text)';
        navH1.style.color = 'var(--body-text)';
      });
      navHome.addEventListener('mouseover', function () {
      this.style.color = 'var(--body-bg)';
    });
  
    navHome.addEventListener('mouseout', function () {
      this.style.color = 'var(--body-text)';
    });
  
    navActivity.addEventListener('mouseover', function () {
      this.style.color = 'var(--body-bg)';
    });
  
    navActivity.addEventListener('mouseout', function () {
      this.style.color = 'var(--body-text)';
    });
  });
  });


