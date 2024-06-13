export const testIco = (ico?: string | null) => {

  if (!ico) {
    return true;
  }

  try {
    if (ico.length != 8) {
      throw 'wrongIcoLength';
    }

    let sum = 0;
    const parts = ico.split('');
    let compare = 0;
    for (let i = 0; i < 7; i++) {
      sum += (parseInt(parts[i]) * (8 - i));
    }
    sum = sum % 11;
    compare = 11 - sum;

    if (sum == 1) {
      compare = 0;
    }
    else if (sum == 0) {
      compare = 1;
    }
    else if (sum == 10) {
      compare = 1;
    }

    if (parseInt(parts[7]) != compare) {
      throw 'wrongIcoFormat';
    }
  } catch(e) {
    return false;
  }

  return true;
}
