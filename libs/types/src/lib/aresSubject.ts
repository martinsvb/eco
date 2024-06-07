interface AresSidlo {
  kodStatu: string;
  nazevStatu: string;
  kodKraje: number;
  nazevKraje: string;
  kodOkresu: number;
  nazevOkresu: string;
  kodObce: number;
  nazevObce: string;
  kodSpravnihoObvodu: number;
  nazevSpravnihoObvodu: string;
  kodMestskehoObvodu: number;
  nazevMestskehoObvodu: string;
  kodMestskeCastiObvodu: number;
  kodUlice: number;
  nazevMestskeCastiObvodu: string;
  nazevUlice: string;
  cisloDomovni: number;
  doplnekAdresy: string;
  kodCastiObce: number;
  cisloOrientacni: number;
  cisloOrientacniPismeno: string;
  nazevCastiObce: string;
  kodAdresnihoMista: number;
  psc: number;
  textovaAdresa: string;
  cisloDoAdresy: string;
  typCisloDomovni: string;
  standardizaceAdresy: boolean;
  pscTxt: string;
}

export interface AresSubject {
  ico: number;
  obchodniJmeno: string;
  sidlo: AresSidlo;
  pravniForma: number;
  financniUrad: number;
  datumVzniku: string;
  datumZaniku: string;
  datumAktualizace: string;
  dic: string;
  icoId: number;
  adresaDorucovaci: {
    radekAdresy1: string;
    radekAdresy2: string;
    radekAdresy3: string;
  };
  seznamRegistraci: {
    stavZdrojeVr: string;
    stavZdrojeRes: string;
    stavZdrojeRzp: string;
    stavZdrojeNrpzs: string;
    stavZdrojeRpsh: string;
    stavZdrojeRcns: string;
    stavZdrojeSzr: string;
    stavZdrojeDph: string;
    stavZdrojeSd: string;
    stavZdrojeIr: string;
    stavZdrojeCeu: string;
    stavZdrojeRs: string;
    stavZdrojeRed: string;
  };
  primarniZdroj: string;
  dalsiUdaje: {
    obchodniJmeno: {
      platnostOd: string;
      platnostDo: string;
      obchodniJmeno: string;
      primarniZaznam: boolean;
    }[];
    sidlo: {
      sidlo: AresSidlo;
      primarniZaznam: boolean;
      platnostOd: string;
      platnostDo: string;
    }[];
    pravniForma: number;
    spisovaZnacka: string;
    datovyZdroj: string;
  }[];
  czNace: string[];
  subRegistrSzr: string;
  dicSkDph: string;
}
