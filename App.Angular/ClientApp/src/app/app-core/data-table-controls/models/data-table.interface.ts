
export interface RowAction {
  actionKey: string;
  actionLabel: string;
  primaryAction: boolean;
  showDetail?: boolean;
}

export interface PageDataInfo {
  pageSize?: number;
  total?: number;
  pageSizeOptions?: any;
}

export interface SelectedItem {
  key: string;
  text: string;
}
