import { always as noop, last, splitAt } from "ramda";
import React, { PropsWithChildren } from "react";

type HomePage = {
  name: "home";
};

type CompendiumPage = {
  name: "compendium";
};

type PilotRosterPage = {
  name: "pilot-roster";
};

type PilotDetailsPage = {
  name: "pilot-details";
  pilotId: string;
};

export type Page =
  | HomePage
  | CompendiumPage
  | PilotRosterPage
  | PilotDetailsPage;

type PageName = Page["name"];

type RouterContextProps = {
  currentPath: Page[];
  setCurrentPath: (path: Page[]) => void;
  currentPage: Page | null;
};

const RouterContext = React.createContext<RouterContextProps>({
  currentPath: [],
  setCurrentPath: noop,
  currentPage: null,
});

export const Routes: React.FC<PropsWithChildren<{ initRoute: Page[] }>> = ({
  initRoute,
  children,
}) => {
  const [currentPath, setCurrentPath] = React.useState<Page[]>(initRoute);

  const context = {
    currentPath,
    setCurrentPath,
    currentPage: null,
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
    <RouterContext.Provider
      value={{ ...context, currentPath: pages, currentPage: page }}
    >
      {children}
    </RouterContext.Provider>
  ) : null;
};

export function useRouter() {
  const { setCurrentPath, currentPath, currentPage } =
    React.useContext(RouterContext);

  return {
    currentPage,
    currentPath,
    goTo: setCurrentPath,
  };
}
