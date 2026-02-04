import { getCart } from "@/actions/cart.action";
import { getUser } from "@/actions/user.action";
import { Navigation } from "@/components/layout/navbar";

export default async function page({ children }: { children: React.ReactNode }) {
  const {data,error}=await getUser();
  const { data:cartdata, error:cartError } = await getCart();

  return <div>
    <Navigation user={data?.data} cartdata={cartdata?.data}/>
    {children}
    </div>;
}
