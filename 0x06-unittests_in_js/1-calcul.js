function calculateNumber(type, a, b) {
  const num_1 = Number(a);
  const num_2 = Number(b);

  if (Number.isNaN(num_1) || Number.isNaN(num_2)) {
    throw TypeError;
  }
  
  if (type === 'SUM') {
    return (Math.round(num_1) + Math.round(num_2));
  } else if(type === 'SUBTRACT') {
    return (Math.round(num_1) - Math.round(num_2));
  } else if (type === 'DIVIDE') {
    if (Math.round(num_2) === 0) {
      return ('Error');
    }
    return (Math.round(num_1) / Math.round(num_2));
  } else {
    throw TypeError;
  }
}
module.exports = calculateNumber;
