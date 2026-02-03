import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface tableType {
  data: { id: string; name: string }[];
}

const CategoryTable = async ({ data }: tableType) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((i: { id: string; name: string }) => {
          return (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>
                  <Link
                    href={`/admin/category-management/edit?id=${i?.id}&name=${i?.name}`}
                  >
                    <Button variant="destructive" className="cursor-pointer">
                      Edit
                    </Button>
                  </Link>
              </TableCell>
              <TableCell>
               <DeleteCategoryButton id={i?.id}/>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CategoryForm } from "./categoryForm";
import { EditCategoryForm } from "./editCategoryform";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteCategoryButton from "./deleteCategoryButton";

export function AlertDialogBasic({
  children,
  categoryData,
}: {
  children: React.ReactNode;
  categoryData: { id?: string; name?: string };
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl mb-4">
            Edit Category
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full">
            <EditCategoryForm id={categoryData?.id} name={categoryData?.name} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
