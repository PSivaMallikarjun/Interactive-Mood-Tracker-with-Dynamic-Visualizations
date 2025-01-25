const moodButtons = document.querySelectorAll('.mood-btn');
const motivationText = document.getElementById('motivation');
const ctx = document.getElementById('moodChart').getContext('2d');
let moodData = JSON.parse(localStorage.getItem('moodData')) || { Happy: 0, Sad: 0, Angry: 0, Stressed: 0 };

// Motivational Quotes
const motivations = {
  Happy: "Keep spreading positivity and joy!",
  Sad: "Every storm runs out of rain. Stay strong!",
  Angry: "Take a deep breath. Calmness is your superpower.",
  Stressed: "Relax, refresh, and recharge. You've got this!"
};

// Initialize Chart.js
const moodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(moodData),
    datasets: [{
      label: 'Mood Frequency',
      data: Object.values(moodData),
      backgroundColor: ['#ffcc00', '#0099cc', '#ff6666', '#9966cc'],
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Update Mood Data
moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.dataset.mood;
    moodData[mood] += 1;
    localStorage.setItem('moodData', JSON.stringify(moodData));
    updateChart();
    displayMotivation(mood);
  });
});

// Update Chart
function updateChart() {
  moodChart.data.datasets[0].data = Object.values(moodData);
  moodChart.update();
}

// Display Motivation
function displayMotivation(mood) {
  motivationText.textContent = motivations[mood];
}

// Initialize Data
updateChart();
