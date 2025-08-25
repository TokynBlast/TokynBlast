const fs = require('fs');
const path = require('path');
const { format, addDays, startOfWeek, addWeeks } = require('date-fns');

const today = format(new Date(), 'MM-dd');
const readmePath = path.join(__dirname, 'README.md');
const defaultImage = 'images/NUXtocat.gif';

// Helper functions to calculate dynamic holiday dates
const getNthWeekdayOfMonth = (year, month, weekday, n) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  return addDays(firstWeekday, (n - 1) * 7 + (weekday - firstWeekday.getDay() + 7) % 7);
};

const getThanksgiving = (year) => getNthWeekdayOfMonth(year, 10, 4, 4); // 4th Thursday of November
const getMothersDay = (year) => getNthWeekdayOfMonth(year, 4, 0, 2); // 2nd Sunday of May

// Calculate dynamic holidays for the current year
const year = new Date().getFullYear();
const thanksgiving = getThanksgiving(year);
const mothersDay = getMothersDay(year);

// Format dynamic holiday dates
const thanksgivingStart = format(addDays(thanksgiving, -3), 'MM-dd');
const thanksgivingEnd = format(addDays(thanksgiving, 3), 'MM-dd');
const mothersDayFormatted = format(mothersDay, 'MM-dd');

// Define date ranges
const dateRanges = [
  { start: '10-24', end: '11-03', image: 'images/grim-repo.jpg' },                        // Halloween            (Week before, three days after)
  { start: mothersDayFormatted, end: mothersDayFormatted, image: 'images/momtocat.png' }, // Mothers day :D       (Exact day)
  { start: thanksgivingStart, end: thanksgivingEnd, image: 'images/gobble-me.gif' },      // Day of thanks        (Three days before and after)
  { start: '02-14', end: '02-14', image: 'images/love.png' },                             // Valentines           (Four days before and after)
  { start: '12-18', end: '12-28', image: 'images/saint-nicktocat.jpg' },                  // Christmas            (Week before, two days after)
  { start: '12-17', end: '12-17', image: 'images/homercat.png' },                         // Simpsons air
  { start: '05-05', end: '05-05', image: 'images/adventure-cat.png' },                    // Adventure time airs
  { start: '06-01', end: '06-30', image: 'images/Octoqueer.png' },                        // LGBTQ+ month :)
  { start: '10-10', end: '10-10', image: 'images/ten.jpg' },                              // Tenth day of the tenth month
  { start: '10-11', end: '10-11', image: 'images/steve.jpg' },                            // Steve Jobs dies :(
  { start: '8-25', end: '8-26', image: 'glue.png' }                                       // Funny Image :D
  
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
let readmeContent = fs.readFileSync(readmePath, 'utf8');
let updatedContent = readmeContent.replace(
  /<img align='right' src='.*?' width='25%'>/,
  `<img align='right' src='${newImage}' width='25%'>`
);

if (today === '08-15') {
  // Increment the age
  updatedContent = updatedContent.replace(
    /\* ⚡ `I'm`: \*\*(\d+?) years old\*\*,/,
    (_, currentAge) => `* ⚡ \`I'm\`: **${parseInt(currentAge, 10) + 1} years old**,`
  );
}

// Only write if there are changes
if (readmeContent !== updatedContent) {
  fs.writeFileSync(readmePath, updatedContent);
}
