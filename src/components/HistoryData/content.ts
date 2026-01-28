export interface ContentList {
  id: number;
  title: string;
  text: string;
}

export interface Content {
  id: number;
  text?: string;
  dataFirst: number;
  dataSecond: number;
  contentList: ContentList[];
}
export const icons: Content[] = [
  {
    id: 1,
    text: "Наука",
    dataFirst: 1955,
    dataSecond: 2005,
    contentList: [
      {
        id: 1,
        title: "1955",
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
    ],
  },
];
