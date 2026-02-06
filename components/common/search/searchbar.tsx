"use client";

import React, { useState } from "react"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";

interface ProductSearchBarProps {
  categories?: Array<{ id: string; name: string }>;
}



export function SearchBar({ categories = [] }: ProductSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "";
  const currentDietaryPreference = searchParams.get("dietaryPreference") ?? "";
  const currentPrice = searchParams.get("priceNumber") ?? "0";

const [category,setCategory]=useState<string|undefined>(currentCategory);
const [dietary,setDietary]=useState<string|undefined>(currentDietaryPreference);
const [price,setPrice]=useState<number|string|undefined>(currentPrice);






  const hasActiveFilters = useMemo(() => {
    return currentCategory || currentDietaryPreference !== "NONE" || parseInt(currentPrice) > 0;
  }, [currentCategory, currentDietaryPreference, currentPrice]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      const params = new URLSearchParams(searchParams);
      if (value.length>0) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      router.push(`?${params.toString()}`);
    },
    []
  );

  const handleDietaryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setDietary(value);
    const params = new URLSearchParams(searchParams);
      
    if (value && value !== "NONE") {
      params.set("dietaryPreference", value);
    } else {
      params.delete("dietaryPreference");
    }
  
    router.push(`?${params.toString()}`);
  };
  
   

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPrice(value);
      const params = new URLSearchParams(searchParams);
      const priceNumber = value ? parseInt(value) : 0;
      if (priceNumber > 0) {
        params.set("priceNumber", priceNumber.toString());
      } else {
        params.delete("priceNumber");
      }
      router.push(`?${params.toString()}`);
    }

    const handleSearch = () => {
      const params = new URLSearchParams(searchParams.toString());
    
      // CATEGORY
      if (category && category !== "all") {
        params.set("category", category);
      } else {
        params.delete("category");
      }
    
      // DIETARY
      if (dietary && dietary.trim().length > 0) {
        params.set("dietaryPreference", dietary);
      } else {
        params.delete("dietaryPreference");
      }
    
      // PRICE
      const priceNumber = Number(price);
      if (!isNaN(priceNumber) && priceNumber > 0) {
        params.set("priceNumber", priceNumber.toString());
      } else {
        params.delete("priceNumber");
      }
    
      router.push(`?${params.toString()}`);
    };
    




  const handleClearFilters = () => {
    router.push("?");
  }

  return (
    <Card className="p-6 my-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Search Products</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Category Filter */}
          <div className="space-y-3 cursor-pointer">
            <label className="text-sm font-medium pb-6">Category</label>
            <Select  onValueChange={handleCategoryChange}               
            
>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dietary Preference Filter */}
          <div className="space-y-3 ">
            <label className="text-sm font-medium  pb-6">Dietary Preference</label>
            <Input
              type="text"
              className="cursor-pointer"
              placeholder="Enter Dietary Preference"
              // value={currentDietaryPreference || ''}
              onChange={handleDietaryChange}
      
            />
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium  pb-6">Max Price</label>
            <Input
              type="number"
              className="cursor-pointer"
              placeholder="Enter max price"
              // value={currentPrice === "0" ? "" : currentPrice}
              onChange={handlePriceChange}
              min="0"
              step="1"
            />
          </div>
        </div>
        <Button
            onClick={handleSearch}
            variant="outline"
            size="sm"
            className="w-full bg-transparent cursor-pointer"
          >
            <Search className="mr-2 h-4 w-4 " />
            Search
          </Button>
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="outline"
            size="sm"
            className="w-full bg-transparent cursor-pointer"
          >
            <X className="mr-2 h-4 w-4 " />
            Clear Filters
          </Button>
        )}

        {/* Active Filters Display */}
        {/* {hasActiveFilters && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Active Filters: </span>
              {currentCategory && `Category: ${categories.find((c) => c.id === currentCategory)?.name}, `}
              {currentDietaryPreference && currentDietaryPreference !== "NONE" && `Diet: ${currentDietaryPreference}, `}
              {parseInt(currentPrice) > 0 && `Max Price: ${currentPrice}`}
            </p>
          </div>
        )} */}
      </div>
    </Card>
  );
}
