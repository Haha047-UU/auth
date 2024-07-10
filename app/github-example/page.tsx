import CustomLink from "@/components/custom-link"
import GithubExplorer from "@/components/githubexplorer"
import { auth } from "auth"

export default async function Page() {
  const session = await auth()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">React Server Component Usage</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <CustomLink href="https://nextjs.authjs.dev">NextAuth.js</CustomLink>{" "}
        for authentication.
      </p>
      <GithubExplorer />
    </div>
  )
}
