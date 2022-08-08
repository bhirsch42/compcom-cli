import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import runApp from "./App";
import { importCompconFile } from "./importCompconFile";

async function run() {
  const argv = await yargs(hideBin(process.argv))
    .scriptName("compcon")
    .option("data", { default: "fixtures/profile.compcon" })
    .command("compendium", "compendium", {}).argv;

  console.log(argv);

  const compconData = await importCompconFile(argv.data);
  runApp(compconData, [{ name: "pilots" }]);
}

run();

// setTimeout(() => {
//   process.exit(0);
// }, 5000);

// .usage("$0 <cmd> [args]")
// .command(
//   "import [filename]",
//   "Import a .compcon file into COMP/CON CLI",
//   (yargs) => {
//     yargs.positional("filename", {
//       type: "string",
//       describe: "The .compcon file to import",
//     });
//   },
//   function (argv) {
//     importCompconFile(argv.filename as string);
//   }
// )
// .help().argv;
// import boxen from "boxen";

// console.log(boxen("unicorn", { padding: 1 }));
