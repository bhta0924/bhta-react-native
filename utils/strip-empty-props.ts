export const stripEmptyProps = <T extends object>(value: T): Partial<T> =>
  Object.keys(value)
    // @ts-expect-error -- proper check is being made
    .filter((k) => k in value && value[k] != null)
    // @ts-expect-error
    .reduce((a, k) => ({ ...a, [k]: value[k] }), {});
