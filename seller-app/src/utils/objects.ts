export const getObjectValue = (obj: any, path: string) => {
  const newPath: string[] = path.split(".");
  let current = obj;

  if (newPath.length === 0) {
    return current[path];
  }

  while (newPath.length) {
    if (typeof current !== "object") return undefined;
    // @ts-ignore
    current = current[newPath.shift()];
  }
  return current;
};
