import { commitAction, setUpRemixAction } from "./actions/index.js";

await setUpRemixAction();
await commitAction({message:"chore:(deps) setup for web"});
