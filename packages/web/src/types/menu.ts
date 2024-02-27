export interface Menu {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
}

export interface FullMenu extends Menu {
  largeImage?: string;
  options: {
    label: string;
    choices: {
      label: string;
    }[];
  }[];
}
