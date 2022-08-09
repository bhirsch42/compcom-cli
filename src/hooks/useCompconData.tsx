import { Text } from "ink";
import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CompconData, importCompconFile } from "../importCompconFile";

const CompconDataContext = React.createContext<CompconData>({ pilots: [] });

async function importCompconFileFromProcessArgv() {
  const argv = await yargs(hideBin(process.argv))
    .scriptName("compcon")
    .option("data", { default: "fixtures/profile.compcon" }).argv;

  return importCompconFile(argv.data);
}

export const CompconDataProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [value, setValue] = React.useState<CompconData | null>(null);

  useEffect(() => {
    importCompconFileFromProcessArgv().then(setValue);
  }, []);

  if (!value) {
    return <Text>Loading...</Text>;
  }

  return (
    <CompconDataContext.Provider value={value}>
      {children}
    </CompconDataContext.Provider>
  );
};

export function useCompconData() {
  return React.useContext(CompconDataContext);
}
