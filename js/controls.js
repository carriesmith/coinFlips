// Controller input / buttons

// TO DO: 
//   * Repeated code between the three input groups, refactor to functions.
//   * At a few combinations of p / nFlips the bar width becomes very narrow.

// Change text-input for coin probability of heads
$('#prob-text').on('change', function(event) { 
  var pInput = Number(event.target.value);

  // if input is less than 0, make probability of heads 0
  // if input is greater than 1, make probability of heads 1
  // if probability is between 0 and 1, make probability that value
  // if it's anything else (e.g. invalid text input), reset to .5
  if (pInput >= 0 & pInput <= 1){
    p = pInput;
  } else if (pInput < 0) {
    p = 0;
  } else if (pInput > 0) {
    p = 1;
  } else { 
    p = .5; 
  }
  $('#prob-text').val(p);
  updateChart( n, p, iterations );
});

// Button to decrease probability of heads
// increments by .5
$('#prob-down').on('click', function(event) { 
  p = p > .05 ? p - .05 : 0;
  p = Math.round(p * 100) / 100;
  $('#prob-text').val(p);
  updateChart( n, p, iterations ); 
});

// Button to increase probability of heads
// increments by .5
$('#prob-up').on('click', function(event) { 
  p = p < .95 ? p + .05 : 1;
  p = Math.round(p * 100) / 100;
  $('#prob-text').val(p);
  updateChart( n, p, iterations ); 
});

// Number of coin flips in a sample - input text box
// valid between 1 and 500
$('#nflips-text').on('change', function(event) { 
  var nInput = Number(event.target.value);
  if (nInput >= 1 & nInput <= 500){
    n = nInput;
  } else if (nInput < 1) {
    n = 1;
  } else if (nInput > 500) {
    n = 500;
  } else { 
    n = 40; 
  }
  $('#nflips-text').val(n);
  updateChart( n, p, iterations );
});

// Button decreasing number of flips in a sample
// increments of 1
$('#nflips-down').on('click', function(event) { 
  n = n > 1 ? n - 1 : 1;
  n = Math.round(n);
  $('#nflips-text').val(n);
  updateChart( n, p, iterations ); 
});

// Button increasing the number of flips in a sample
// increments of 1
$('#nflips-up').on('click', function(event) { 
  n = n < 500 ? n + 1 : 500;
  n = Math.round(n);
  $('#nflips-text').val(n);
  updateChart( n, p, iterations ); 
});


// Number of samples - input text box
// valid between 10 and 50000
$('#nsamples-text').on('change', function(event) { 
  var itInput = Number(event.target.value);
  if (itInput >= 10 & itInput <= 50000){
    iterations = itInput;
  } else if (itInput < 10) {
    iterations = 10;
  } else if (itInput > 50000) {
    iterations = 50000;
  } else { 
    iterations = 1000; 
  }
  $('#nsamples-text').val(iterations);
  updateChart( n, p, iterations );
});

// Decrease number of samples button
// increments of 100
$('#nsamples-down').on('click', function(event) { 
  iterations = iterations > 100 ? iterations - 100 : 10;
  iterations = Math.round(iterations);
  $('#nsamples-text').val(iterations);
  updateChart( n, p, iterations ); 
});

// Increase number of samples button
// increments of 100
$('#nsamples-up').on('click', function(event) { 
  iterations = iterations < 49900 ? iterations + 100 : 50000;
  iterations = Math.round(iterations);
  $('#nsamples-text').val(iterations);
  updateChart( n, p, iterations ); 
});

$('.goAgain').on('click', function(event) {
  updateChart( n, p, iterations );
 });