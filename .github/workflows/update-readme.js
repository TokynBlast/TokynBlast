const fs = require('fs');
const path = require('path');
const { format, parse } = require('date-fns');

const today = format(new Date(), 'MM-dd');
const readmePath = path.join(__dirname, 'README.md');
const defaultImage = 'images/NUXtocat.gif';

// Define date ranges
const dateRanges = [
  { start: '10-24', end: '11-03', image: 'images/grim-repo.jpg' }, // Halloween
  { start: '12-18', end: '12-28', image: 'images/saint-nicktocat.jpg' }, // Christmas
  { start: '12-17', end: '12-17', image: 'images/homercat.png' }, // Simpsons air
  { start: '05-05', end: '05-05', image: 'images/adventure-cat.png' }, // Adventure time airs
  { start: '06-01', end: '06-30', image: 'images/Octoqueer.png' }, // LGBTQ+ month :)
  { start: '10-10', end: '10-10', image: 'images/ten.jpg' }, // Tenth day of the tenth month
  { start: '05-11', end: '05-11', image: 'images/momtocat.png' }, // Mothers day (2025) :D /// THIS WILL ONLY BE HERE ONE TIME, UNLESS DAY CHANGING HOLIDAYS ARE DYNAMICALLY UPDATED!
  { start: '10-11', end: '10-11', image: 'images/steve.jpg' }, // Steve Jobs dies :(
  { start: '01-23', end: '01-24', image: 'images/ten.jpg' } // To test if it works!
];

// Determine the correct image
let newImage = defaultImage;
dateRanges.forEach(({ start, end, image }) => {
  if (start === end && today === start) {
    // Single-day range, check exact match
    newImage = image;
  } else if (today >= start && today <= end) {
    // Multi-day range
    newImage = image;
  }
});

// Read and update the README
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const updatedContent = readmeContent.replace(
  /<img align='right' src='.*?' width='25%'>/,
  `<img align='right' src='${newImage}' width='25%'>`
);

// Only write if there are changes
if (readmeContent !== updatedContent) {
  fs.writeFileSync(readmePath, updatedContent);
}
