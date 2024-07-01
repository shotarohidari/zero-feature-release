import { $ } from "zx"

type CommitMessage<Message extends string = string> = `chore:(deps) ${Message}`
// commit
export async function commitAction({ message }: { message: CommitMessage }) {
  await $`git add .`
  await $`git commit -m "${message}"`
}
