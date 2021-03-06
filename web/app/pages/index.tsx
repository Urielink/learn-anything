import addLink from "app/auth/mutations/addLink"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link } from "blitz"
import React, { Suspense, useEffect, useRef } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong className="mr-2">Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const AddLink = () => {
  const currentUser = useCurrentUser()
  const [url, setUrl] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [link, setLink] = React.useState({})
  const [changed, setChanged] = React.useState(false)
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    setChanged(true)
    setTimeout(() => {
      setChanged(false)
    }, 1000)
  }, [link])

  return (
    <div>
      {currentUser && (
        <div>
          <h1>
            Hi, <a href={`/u/${currentUser.username}`}>{currentUser.username}</a>
          </h1>
          <form>
            <h1 className="font-bold">Add Link</h1>
            <div>
              <span className="mr-2">Title</span>
              <input
                className="bg-gray-200"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
            <div>
              <span className="mr-2">URL</span>
              <input
                className="bg-gray-200"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                }}
              />
            </div>
            <button
              className="bg-gray-200 mt-2"
              type="submit"
              onClick={async (e) => {
                e.preventDefault()
                setLink(await addLink({ url, title }))
              }}
            >
              Add
            </button>
            {changed && <span className="text-green-500 ml-3">Link added</span>}
          </form>
        </div>
      )}
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <Suspense fallback="Loading...">
          <AddLink />
        </Suspense>
      </main>

      <footer></footer>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
