import { commitAction } from "./actions/index.js";
import { setUpVanilaAction } from "./actions/vanilaAction.mjs";

await setUpVanilaAction();
await commitAction({message:"chore:(deps) setup for vanila"});
