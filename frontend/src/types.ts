export interface Schoolboy {
  Id: number;
  FirstName: string;
  SecondName: string;
  LastName: string;
}

export interface Column {
  Id: number;
  Title: string;
}

export interface Attendance {
  Id?: number;
  Title?: string;
  SchoolboyId: number;
  ColumnId: number;
}
