import { always as noop, splitAt } from "ramda";
import React, { PropsWithChildren } from "react";

type HomePage = {
  name: "home";
};

type CompendiumPage = {
  name: "compendium";
};

type PilotsPage = {
  name: "pilots";
};

export type Page = HomePage | CompendiumPage | PilotsPage;

type PageName = Page["name"];

type RouterContextProps = {
  currentPath: Page[];
  setCurrentPath: (path: Page[]) => void;
};

const RouterContext = React.createContext<RouterContextProps>({
  currentPath: [],
  setCurrentPath: noop,
});

export const Routes: React.FC<PropsWithChildren<{ initRoute: Page[] }>> = ({
  initRoute,
  children,
}) => {
  const [currentPath, setCurrentPath] = React.useState<Page[]>(initRoute);

  const context = {
    currentPath,
    setCurrentPath,
  };

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  );
};

export const Route: React.FC<PropsWithChildren<{ path: PageName }>> = ({
  path,
  children,
}) => {
  const context = React.useContext(RouterContext);
  const [[page], pages] = splitAt(1, context.currentPath);

  return page.name === path ? (
    <RouterContext.Provider value={{ ...context, currentPath: pages }}>
      {children}
    </RouterContext.Provider>
  ) : null;
};

export function useGoTo() {
  const { setCurrentPath } = React.useContext(RouterContext);
  return setCurrentPath;
}
