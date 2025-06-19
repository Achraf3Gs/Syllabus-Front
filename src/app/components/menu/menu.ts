export interface Menu {
  id: string;
  title: string;
  icon?: string | string[]; // ✅ allow both string or array of strings
  url?: string;
  sousMenu?: Array<Menu>;
}
