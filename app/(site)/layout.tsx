import { Navigation } from "@/components/layout/navbar";

export default function page({ children }: { children: React.ReactNode }) {
  return <div>
    <Navigation/>
    {children}
    </div>;
}
