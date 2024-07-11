import CustomLink from "@/components/custom-link"
import GithubExplorer from "@/components/githubexplorer"
import { auth } from "auth"

export default async function Page() {
  const session = await auth()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">React Server Component Usage</h1>
      <p>
        This page is an example of how to use the GithubExplorer component. This component use the{" "}
        <CustomLink href="https://github.com/octokit/octokit.js/#readme">
          <code>octokit</code>
        </CustomLink>{" "}
        library to fetch data from the Github API.You can click{" "}
        <CustomLink href="https://auth.zhzh118.com">
          next-auth
        </CustomLink>{" "}
        to return to the home page.
      </p>
      <GithubExplorer />
    </div>
  )
}
