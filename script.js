const encryptButton = document.querySelector('#encryptButton');
const secretNote = document.querySelector('#secretNote');
const waterLevel = document.querySelector('#waterLevel');
const waterOutput = document.querySelector('#waterOutput');
const labWater = document.querySelector('#labWater');
const heroWater = document.querySelector('#heroWater');
const revealTargets = document.querySelectorAll('.reveal');

const updateWaterLevel = (value) => {
  const level = Number(value);
  const emptySpace = 100 - level;

  if (labWater) {
    labWater.style.height = `${level}%`;
  }

  if (heroWater) {
    heroWater.style.inset = `${Math.max(18, emptySpace)}% .7rem .7rem`;
  }

  if (waterOutput) {
    waterOutput.value = `${level}%`;
    waterOutput.textContent = `${level}%`;
  }
};

if (waterLevel) {
  updateWaterLevel(waterLevel.value);
  waterLevel.addEventListener('input', (event) => updateWaterLevel(event.target.value));
}

if (encryptButton && secretNote) {
  encryptButton.addEventListener('click', () => {
    secretNote.classList.toggle('revealed');
    encryptButton.textContent = secretNote.classList.contains('revealed')
      ? 'Flip glass back'
      : 'Encode sip note';
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('visible'));
}
