import { commitAction } from "./actions/index.js";
import { setUpVanilaAction } from "./actions/index.js";

await setUpVanilaAction();
await commitAction({message:"chore:(deps) setup for vanila"});
