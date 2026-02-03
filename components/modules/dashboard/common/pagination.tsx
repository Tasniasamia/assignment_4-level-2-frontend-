"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type metaType = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};
export function PaginationCustom({ meta }: { meta: metaType }) {
  const route = useRouter();
  const { limit: pageSize, page: currentPage, total, totalPages } = meta;

  const [value, setValue] = useState<string | number>(pageSize.toString());
  console.log("meta", meta);
  const searchParams = useSearchParams();
  const naviateToPage = (page: number,limit:number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString() || "1");
    params.set("limit", limit?.toString() || pageSize.toString());
    route.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={(value) => {
            console.log("select value", value);
            setValue(value);
            naviateToPage(currentPage,Number(value));
          }}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="8">8</SelectItem>
             <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <Button
              className="cursor-pointer"
              onClick={() => {
                let page = Number(currentPage);
                console.log(page);
                naviateToPage((page = page - 1),Number(value));
              }}
              disabled={currentPage == 1}
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              className="cursor-pointer"
              onClick={() => {
                let page = Number(currentPage);
                naviateToPage((page = page + 1),Number(value));
              }}
              disabled={currentPage == totalPages}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
