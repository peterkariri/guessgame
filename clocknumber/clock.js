// Get all number elements
const numbers = document.querySelectorAll(".number");
const clockRadius = 150; // Radius of the clock (half the width/height of the .clock-container div)
const numberRadius = 20; // Half the width/height of each number for centering

// Position each number
numbers.forEach((number, index) => {
  // Adjust angle so that 12 is at the top (north), 6 is at the bottom (south)
  const angle = (index + 1) * (360 / 12) -90; // Start at -90 degrees for 12 o'clock position
  const angleInRadians = angle * (Math.PI / 180); // Convert degrees to radians

  // Calculate the x and y positions based on the angle
  const x = clockRadius + clockRadius * Math.cos(angleInRadians);
  const y = clockRadius + clockRadius * Math.sin(angleInRadians);

  // Set the position of each number using absolute positioning
  number.style.left = `${x}px`;
  number.style.top = `${y}px`;
});
