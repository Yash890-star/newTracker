import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/student/login')
  }, [])

  return (
    <>
    <h1 className="">Hello World</h1>
    </>
  )
}
