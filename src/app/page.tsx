import { Header } from "@/components/header/header";
import { auth } from "./api/auth/options";

export default async  function Home() {
  const user = await auth()

  return (
    <>
    <Header userInfo={user} />
    </>
  );
}
