import { continents, countries, languages, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list';
import countries2to3 from 'countries-list/minimal/countries.2to3.min.json';
import countries3to2 from 'countries-list/minimal/countries.3to2.min.json';

export const Countries = () => {

  const cz = getCountryData('CZ');
  const flag = getEmojiFlag('CZ');
  const dataList = getCountryDataList();

  console.log({countries2to3, countries3to2, continents, countries, dataList, flag, cz, languages})

  return (
    null
  );
};
