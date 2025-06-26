import urlSlug from "url-slug";

export const toUrlSlug = (val: string | null | undefined) => {
  return val ? urlSlug(val) : "";
};
