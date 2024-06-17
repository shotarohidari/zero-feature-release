import { $ } from "zx"

type CommmitMessage<Message extends string = string> = `chore:(deps) ${Message}`
// commit
export async function commitAction({ message }: { message: CommmitMessage }) {
  await $`git add .`
  await $`git commit -m "chore(deps): setup for web."`
}
