export interface ILoadable<TData> {
  data: TData | null;
  error?: unknown;
  isEmpty: boolean;
  isLoading: boolean;
}
