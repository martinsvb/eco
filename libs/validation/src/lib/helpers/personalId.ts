export const testPersonalId = (id?: string | null, age = 0) =>  {

  if (!id) {
    return true;
  }

  try
  {
    if (id.length < 9) {
      throw 'Personal id wrong length';
    }

    let year = parseInt(id.substring(0, 2), 10);
    if (id.length === 9 && year < 54) {
      return true;
    }

    let month = parseInt(id.substring(2, 4), 10);
    const day = parseInt(id.substring(4, 6), 10);
    const compare = id.length === 10 ? parseInt(id.substring(9, 10)) : 0;
    let value = parseInt(id.substring(0, 9)) % 11;

    if (value === 10) {
      value = 0;
    }
    if (value != compare) {
      throw 'Wrong personal id';
    }

    year += year < 54 ? 2000 : 1900;
    if(month > 70 && year > 2003) {
      month -= 70;
    }
    else if (month > 50) {
      month -= 50;
    }
    else if (month > 20 && year > 2003) {
      month -= 20;
    }
    const date = new Date();

    if (
      (year + age) > date.getFullYear() ||
      month === 0 ||
      month > 12 ||
      day === 0 ||
      day > 31
    ) {
      throw 'Wrong personal id';
    }
  }
  catch(e) {
    return false;
  }
  return true;
}
