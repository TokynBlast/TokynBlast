const fs = require('fs');
const path = require('path');
const { format, parse } = require('date-fns');

const today = format(new Date(), 'MM-dd');
const readmePath = path.join(__dirname, 'README.md');
const defaultImage = 'images/NUXtocat.gif';
const dateRanges = [
  { start: '10-24', end: '11-03', image: 'images/grim-repo.jpg' },
  { start: '12-18', end: '12-28', image: 'images/saint-nicktocat.jpg' },
];

// Determine the correct image
let newImage = defaultImage;
dateRanges.forEach(({ start, end, image }) => {
  if (today >= start && today <= end) {
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
