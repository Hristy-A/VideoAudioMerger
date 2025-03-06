export interface SelectFileFilters {
  name: string;
  extensions: string[];
}

export interface SelectFileOptions {
  filters?: SelectFileFilters[];
}
