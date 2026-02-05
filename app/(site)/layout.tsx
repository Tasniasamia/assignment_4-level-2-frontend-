import { getCart } from "@/actions/cart.action";
import { getUser } from "@/actions/user.action";
import Footer from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navbar";

export default async function page({ children }: { children: React.ReactNode }) {
  const {data,error}=await getUser();
  const { data:cartdata, error:cartError } = await getCart();

  return <div>
    <Navigation user={data?.data} cartdata={cartdata?.data}/>
    {children}
    <Footer/>
    </div>;
}
