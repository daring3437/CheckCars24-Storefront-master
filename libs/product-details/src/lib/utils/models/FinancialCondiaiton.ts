export interface FinancialCondition {
  BankName: string;
  ClosingRate: number;
  Currency: number;
  DownPayment: number;
  Months: number;
  RateGross: number;
  RateNet: number;
  RestValue: number;
  Terms: Term[];
  Type: FinancingType;
  VatKey: number;
}
interface Term {
  Language: Language;
  Value: string;
  Url: string;
}
enum FinancingType {
  'Credit' = 0,
  'Leasing' = 1,
}
enum Language {
  'German',
  'English',
  'Arabic',
  'Russian',
}
