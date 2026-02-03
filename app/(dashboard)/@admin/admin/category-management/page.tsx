import { getAllCategory } from "@/actions/category.action";
import { CategoryForm } from "@/components/modules/dashboard/admin/category-management/categoryForm";
import CategoryTable, {
 
} from "@/components/modules/dashboard/admin/category-management/table";


const page = async () => {
  const { data, error } = await getAllCategory();
  return (
    <main className="min-h-screen bg-background">
      <h1 className="mb-8 text-4xl font-bold">Meal Category Management</h1>
        <CategoryForm/>
  
       
      
      <h1 className="my-8 text-4xl font-bold">Category Management Table</h1>
      <CategoryTable data={data?.data} />
    </main>
  );
};

export default page;
