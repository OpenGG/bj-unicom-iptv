import URL from "url";
import PATH from "path";

const modulesRoot = new URL.URL(`file://${PATH.resolve("node_modules")}`);

export const resolve = async (specifier, parentModulePath, defaultResolve) => {
  const ret = defaultResolve(specifier, parentModulePath);

  if (ret.format !== "cjs") {
    return ret;
  }

  if (ret.url.startsWith(modulesRoot)) {
    return ret;
  }

  return {
    url: ret.url,
    format: "esm"
  };
};
