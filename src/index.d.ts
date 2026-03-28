export type BelirsizDeger = string | number | boolean | null;

export interface YazarBilgisi {
  yazar_id?: string;
  tam_adi?: string;
  kisa_adi?: string;
  ekno?: string;
  [key: string]: unknown;
}

export interface OrnekKaydi {
  ornek_id?: string;
  anlam_id?: string;
  ornek_sira?: string;
  ornek?: string;
  kac?: string;
  yazar_id?: string;
  yazar_vd?: string;
  yazar?: YazarBilgisi[];
  [key: string]: unknown;
}

export interface OzellikKaydi {
  ozellik_id?: string;
  tur?: string;
  tam_adi?: string;
  kisa_adi?: string;
  ekno?: string;
  [key: string]: unknown;
}

export interface GuncelAnlam {
  anlam_id?: string;
  madde_id?: string;
  anlam_sira?: string;
  fiil?: string;
  tipkes?: string;
  anlam?: string;
  anlam_html?: string | null;
  gos?: string;
  gos_kelime?: string;
  gos_kultur?: string;
  orneklerListe?: OrnekKaydi[];
  ozelliklerListe?: OzellikKaydi[];
  [key: string]: unknown;
}

export interface AtasozuBaglantisi {
  madde_id?: string;
  madde?: string;
  on_taki?: string | null;
  [key: string]: unknown;
}

export interface GuncelMadde {
  madde_id?: string;
  kac?: string;
  kelime_no?: string;
  cesit?: string;
  anlam_gor?: string;
  on_taki?: string | null;
  on_taki_html?: string | null;
  madde?: string;
  madde_html?: string;
  cesit_say?: string;
  anlam_say?: string;
  taki?: string;
  cogul_mu?: string;
  ozel_mi?: string;
  egik_mi?: string;
  lisan_kodu?: string;
  lisan?: string;
  telaffuz_html?: string;
  lisan_html?: string;
  telaffuz?: string;
  birlesikler?: string;
  font?: string | null;
  madde_duz?: string;
  gosterim_tarihi?: string | null;
  anlamlarListe?: GuncelAnlam[];
  atasozu?: AtasozuBaglantisi[];
  [key: string]: unknown;
}

export interface BatiKokenliMadde {
  kelime_id?: string;
  sozcuk?: string;
  kistdil?: string;
  dilacik?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface DerlemeMadde {
  madde_id?: string;
  kunye_id?: string;
  madde?: string;
  madde_ekli?: string;
  asilk?: string;
  asilkelim?: string;
  bakin?: string;
  anlam?: string;
  sehir?: string;
  kisaltma?: string;
  eser_ad?: string;
  yazar_ad?: string;
  yayinlayan?: string;
  yayin_yeri?: string;
  yayin_tarihi?: string;
  fiziksel?: string;
  [key: string]: unknown;
}

export interface AtasozuMadde {
  soz_id?: string;
  sozum?: string;
  atara?: string;
  anlami?: string;
  anahtar?: string;
  turu2?: string;
  gosterim_tarihi?: string | null;
  [key: string]: unknown;
}

export interface YabanciKarsilikMadde {
  karsid?: string;
  kkelime?: string;
  kkoken?: string;
  kkarsilik?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface ErenEtimolojiMadde {
  madde?: string;
  maddeGoster?: string;
  anlam1?: string;
  anlam2?: string;
  anlam3?: string;
  anlam4?: string;
  anlam5?: string;
  anlam6?: string;
  anlam7?: string;
  anlam8?: string;
  aciklama?: string;
  kaynak?: string;
  tur?: string;
  bk1?: string;
  bk2?: string;
  bk3?: string;
  bk4?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface KokenBilgisiOrigin {
  selectedLanguage1Id?: number;
  selectedLanguage1?: string;
  selectedLanguage1Name?: string;
  [key: string]: unknown;
}

export interface KokenBilgisiMadde {
  id?: number;
  parent_id?: number;
  word?: string;
  meaning?: string;
  etimology?: string;
  structure?: string | null;
  referances?: string;
  previewjson?: string;
  origin?: KokenBilgisiOrigin;
  relatedWords?: string[];
  isVisible?: boolean;
  historicPrintItemList?: Array<Record<string, unknown>>;
  modernPrintItemList?: Array<Record<string, unknown>>;
  writer_user?: string;
  judge_user?: string;
  [key: string]: unknown;
}

export interface TaramaAltKaydi {
  kelime_id?: string;
  kelime?: string;
  anlam?: string;
  cilt?: string;
  resim?: string;
  [key: string]: unknown;
}

export interface TaramaMadde {
  kilavuz_id?: string;
  kelime?: string;
  kelime_no?: string;
  tarama?: TaramaAltKaydi[];
  [key: string]: unknown;
}

export interface TaramaDetay {
  kelime_id?: string;
  kelime?: string;
  anlam?: string;
  cilt?: string;
  resim?: string;
  [key: string]: unknown;
}

export interface GununKelimesiKaydi {
  madde?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface GununAtasozuKaydi {
  madde?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface GununKuraliKaydi {
  adi?: string;
  url?: string;
  [key: string]: unknown;
}

export interface KaristirilanSozKaydi {
  id?: string;
  yanlis?: string;
  dogru?: string;
  [key: string]: unknown;
}

export interface SikYapilanYanlisKaydi {
  id?: string;
  yanliskelime?: string;
  dogrukelime?: string;
  [key: string]: unknown;
}

export interface SayacKaydi {
  deger?: string;
  [key: string]: unknown;
}

export interface GununYabanciKarsiligiKaydi {
  karsid?: string;
  kkelime?: string;
  kkoken?: string;
  kkarsilik?: string;
  anlam?: string;
  [key: string]: unknown;
}

export interface GunlukIcerik {
  sayac?: SayacKaydi[];
  karistirma?: KaristirilanSozKaydi[];
  atasoz?: GununAtasozuKaydi[];
  syyd?: SikYapilanYanlisKaydi[];
  kural?: GununKuraliKaydi[];
  yabanci?: GununYabanciKarsiligiKaydi | null;
  kelime?: GununKelimesiKaydi[];
  [key: string]: unknown;
}

export interface YazimKaydi {
  yazim_id?: string;
  sozu?: string;
  ekler?: string;
  seskod?: string;
  [key: string]: unknown;
}

export interface SearchModule<T> {
  /**
   * Verilen kelimeyi ilgili sözlükte arar.
   *
   * @example
   * const sonuc = await tdk.guncel('araba');
   */
  (kelime: string): Promise<T[]>;

  /**
   * Geriye dönük uyumluluk için sunulan arama metodu.
   */
  ara(kelime: string): Promise<T[]>;
}

export interface TaramaModule extends SearchModule<TaramaMadde> {
  /**
   * Tarama Sözlüğü kaydını kimliğine göre getirir.
   *
   * @example
   * const detay = await tdk.tarama.getirId(2087);
   */
  getirId(id: string | number): Promise<TaramaDetay>;
}

export interface IcerikModule {
  /**
   * Güncel günlük içerik paketini döndürür.
   */
  (): Promise<GunlukIcerik>;

  /**
   * Güncel günlük içerik paketini döndürür.
   */
  getir(): Promise<GunlukIcerik>;

  /**
   * Günün kelimesini getirir.
   */
  gununKelimesi(): Promise<GununKelimesiKaydi[]>;

  /**
   * Günün atasözü veya deyimini getirir.
   */
  gununAtasozu(): Promise<GununAtasozuKaydi[]>;

  /**
   * Günün yazım kuralını getirir.
   */
  gununKurali(): Promise<GununKuraliKaydi[]>;

  /**
   * Sıkça karıştırılan sözleri getirir.
   */
  karistirilanSozler(): Promise<KaristirilanSozKaydi[]>;

  /**
   * Sık yapılan yanlışları getirir.
   */
  sikYapilanYanlislar(): Promise<SikYapilanYanlisKaydi[]>;

  /**
   * Günün yabancı söz karşılığını getirir.
   */
  gununYabanciKarsiligi(): Promise<GununYabanciKarsiligiKaydi | null>;
}

export interface YazimModule {
  /**
   * Bir kelimenin yazım bilgilerini getirir.
   */
  (kelime: string): Promise<YazimKaydi[]>;

  /**
   * Bir kelimenin yazım bilgilerini getirir.
   */
  ara(kelime: string): Promise<YazimKaydi[]>;

  /**
   * Bir kelimenin sesli okunuş bağlantısını getirir.
   */
  sesGetir(kelime: string): Promise<string | null>;
}

export interface TdkModule {
  /**
   * Güncel Türkçe Sözlük'te arama yapar.
   */
  guncel: SearchModule<GuncelMadde>;

  /**
   * Türkçede Batı Kökenli Kelimeler Sözlüğü'nde arama yapar.
   */
  bati: SearchModule<BatiKokenliMadde>;

  /**
   * Derleme Sözlüğü'nde arama yapar.
   */
  derleme: SearchModule<DerlemeMadde>;

  /**
   * Atasözleri ve Deyimler Sözlüğü'nde arama yapar.
   */
  atasozu: SearchModule<AtasozuMadde>;

  /**
   * Yabancı Sözlere Karşılıklar Kılavuzu'nda arama yapar.
   */
  yabanciKarsiliklar: SearchModule<YabanciKarsilikMadde>;

  /**
   * Eren Türk Dilinin Etimolojik Sözlüğü'nde arama yapar.
   */
  erenEtimoloji: SearchModule<ErenEtimolojiMadde>;

  /**
   * Köken Bilgisi Sözlüğü'nde arama yapar.
   */
  kokenBilgisi: SearchModule<KokenBilgisiMadde>;

  /**
   * Tarama Sözlüğü'nde arama yapar.
   */
  tarama: TaramaModule;

  /**
   * Tarama Sözlüğü kaydını kimliğine göre getirir.
   */
  taramaDetay(id: string | number): Promise<TaramaDetay>;

  /**
   * Günlük içerik servislerini sunar.
   */
  icerik: IcerikModule;

  /**
   * Yazım ve ses servislerini sunar.
   */
  yazim: YazimModule;

  /**
   * Günün kelimesini getirir.
   */
  gununKelimesi(): Promise<GununKelimesiKaydi[]>;

  /**
   * Günün atasözü veya deyimini getirir.
   */
  gununAtasozu(): Promise<GununAtasozuKaydi[]>;

  /**
   * Günün yazım kuralını getirir.
   */
  gununKurali(): Promise<GununKuraliKaydi[]>;

  /**
   * Sıkça karıştırılan sözleri getirir.
   */
  karistirilanSozler(): Promise<KaristirilanSozKaydi[]>;

  /**
   * Sık yapılan yanlışları getirir.
   */
  sikYapilanYanlislar(): Promise<SikYapilanYanlisKaydi[]>;

  /**
   * Günün yabancı söz karşılığını getirir.
   */
  gununYabanciKarsiligi(): Promise<GununYabanciKarsiligiKaydi | null>;

  /**
   * Bir kelimenin sesli okunuş bağlantısını getirir.
   */
  sesGetir(kelime: string): Promise<string | null>;

  /**
   * Ses kodundan WAV bağlantısı üretir.
   */
  sesUrl(sesKodu: string): string;

  /**
   * Harften işaret dili görsel bağlantısı üretir.
   */
  isaretDiliUrl(harf: string): string;

  /**
   * Verilen HTML içeriğini düz metne çevirir.
   */
  htmlTemizle(html: string): string;

  /**
   * Bir nesne veya dizi içindeki bütün metin alanlarını temizler.
   */
  veriTemizle<T>(veri: T): T;

  /**
   * Geriye dönük uyumluluk için sunulan ad.
   */
  guncelSozluk: SearchModule<GuncelMadde>;

  /**
   * Geriye dönük uyumluluk için sunulan ad.
   */
  batiKokenli: SearchModule<BatiKokenliMadde>;
}

declare const tdk: TdkModule;

export declare const guncel: SearchModule<GuncelMadde>;
export declare const bati: SearchModule<BatiKokenliMadde>;
export declare const derleme: SearchModule<DerlemeMadde>;
export declare const atasozu: SearchModule<AtasozuMadde>;
export declare const yabanciKarsiliklar: SearchModule<YabanciKarsilikMadde>;
export declare const erenEtimoloji: SearchModule<ErenEtimolojiMadde>;
export declare const kokenBilgisi: SearchModule<KokenBilgisiMadde>;
export declare const tarama: TaramaModule;
export declare const taramaDetay: TdkModule['taramaDetay'];
export declare const icerik: IcerikModule;
export declare const yazim: YazimModule;
export declare const gununKelimesi: TdkModule['gununKelimesi'];
export declare const gununAtasozu: TdkModule['gununAtasozu'];
export declare const gununKurali: TdkModule['gununKurali'];
export declare const karistirilanSozler: TdkModule['karistirilanSozler'];
export declare const sikYapilanYanlislar: TdkModule['sikYapilanYanlislar'];
export declare const gununYabanciKarsiligi: TdkModule['gununYabanciKarsiligi'];
export declare const sesGetir: TdkModule['sesGetir'];
export declare const sesUrl: TdkModule['sesUrl'];
export declare const isaretDiliUrl: TdkModule['isaretDiliUrl'];
export declare const htmlTemizle: TdkModule['htmlTemizle'];
export declare const veriTemizle: TdkModule['veriTemizle'];
export declare const guncelSozluk: TdkModule['guncelSozluk'];
export declare const batiKokenli: TdkModule['batiKokenli'];

export default tdk;
