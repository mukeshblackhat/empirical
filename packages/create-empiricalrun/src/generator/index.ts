import { CustomLogger, Logger } from "../logger";
import { PackageManager } from "../pkg-managers/interface";
import { Generator } from "./interface";
import { JSGenerator } from "./js";
import { TSGenerator } from "./ts";

export function getGenerator(
  format: string,
  packageManager: PackageManager,
  logger: Logger = new CustomLogger(),
): Generator {
  if (format.includes("Javascript")) {
    return new JSGenerator({ packageManager, logger });
  } else if (format.includes("Typescript")) {
    return new TSGenerator({ packageManager, logger });
  }
  return new JSGenerator({ packageManager, logger });
}
