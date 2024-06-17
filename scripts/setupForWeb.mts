import { commitAction } from "./commitAction.mjs";
import { setUpRemixAction } from "./remixAction.mjs";

await setUpRemixAction();
await commitAction({message:"chore:(deps) setup for web"});
