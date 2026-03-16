import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home(): Promise<void> {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("gitam_user_token");

  if (userToken?.value) {
    redirect("/search");
  } else {
    redirect("/login");
  }
}
