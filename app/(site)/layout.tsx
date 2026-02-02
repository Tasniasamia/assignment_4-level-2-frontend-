import { getUser } from "@/actions/user.action";
import { Navigation } from "@/components/layout/navbar";

export default async function page({ children }: { children: React.ReactNode }) {
  const {data,error}=await getUser();
  return <div>
    <Navigation user={data?.data}/>
    {children}
    </div>;
}
