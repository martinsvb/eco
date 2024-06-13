import { testIco } from "./ico";
import { testPersonalId } from "./personalId";

export const testDic = (dic?: string | null) => {

  if (!dic) {
    return true;
  }

  try {
    const id = dic.substring(0, 2).toUpperCase();
    const dicValue = dic.substring(2);
    if (['CZ', 'SK'].includes(id)) {
      if (dicValue.length < 8 || dicValue.length > 11) {
        throw 'Dic wrong length';
      }
      if (dicValue.length === 8) {
        return testIco(dicValue);
      }
      else {
        return testPersonalId(dicValue);
      }
    }
    return false;
  } catch(e) {
    return false;
  }
}
