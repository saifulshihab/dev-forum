"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  EmploymentType,
  ExperienceLevel,
  SalaryPeriod
} from "@/generated/prisma";
import { JobsPageSearchParams } from "@/types";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<JobsPageSearchParams>({
    employmentType: searchParams.get("employmentType") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    location: searchParams.get("location") || "",
    company: searchParams.get("company") || "",
    salaryMin: searchParams.get("salaryMin") || "",
    salaryMax: searchParams.get("salaryMax") || "",
    salaryCurrency: searchParams.get("salaryCurrency") || "",
    salaryPeriod: searchParams.get("salaryPeriod") || "",
    tag: searchParams.get("tag") || "",
    search: searchParams.get("search") || ""
  });

  useEffect(() => {
    setFilters({
      employmentType: searchParams.get("employmentType") || "",
      experienceLevel: searchParams.get("experienceLevel") || "",
      location: searchParams.get("location") || "",
      company: searchParams.get("company") || "",
      salaryMin: searchParams.get("salaryMin") || "",
      salaryMax: searchParams.get("salaryMax") || "",
      salaryCurrency: searchParams.get("salaryCurrency") || "",
      salaryPeriod: searchParams.get("salaryPeriod") || "",
      tag: searchParams.get("tag") || "",
      search: searchParams.get("search") || ""
    });
  }, [searchParams]);

  const updateFilter = (key: keyof JobsPageSearchParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove filter params first
    [
      "employmentType",
      "experienceLevel",
      "location",
      "company",
      "salaryMin",
      "salaryMax",
      "salaryCurrency",
      "salaryPeriod",
      "tag",
      "search"
    ].forEach((key) => params.delete(key));
    // Add new filter params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      tag: "",
      search: "",
      company: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      salaryPeriod: "",
      salaryCurrency: "",
      employmentType: "",
      experienceLevel: ""
    });
    router.push("?");
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="space-y-2 rounded-lg border bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filter Jobs</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Search</label>
          <Input
            placeholder="Search jobs..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilters();
              }
            }}
            className="bg-zinc-800 text-white"
          />
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">
            Employment Type
          </label>
          <Select
            value={filters.employmentType}
            onValueChange={(value) => updateFilter("employmentType", value)}
          >
            <SelectTrigger className="bg-zinc-800 text-white">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EmploymentType.FULL_TIME}>
                Full Time
              </SelectItem>
              <SelectItem value={EmploymentType.PART_TIME}>
                Part Time
              </SelectItem>
              <SelectItem value={EmploymentType.CONTRACT}>Contract</SelectItem>
              <SelectItem value={EmploymentType.INTERNSHIP}>
                Internship
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">
            Experience Level
          </label>
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) => updateFilter("experienceLevel", value)}
          >
            <SelectTrigger className="bg-zinc-800 text-white">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ExperienceLevel.ENTRY}>Entry</SelectItem>
              <SelectItem value={ExperienceLevel.MID}>Mid</SelectItem>
              <SelectItem value={ExperienceLevel.SENIOR}>Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Period */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">
            Salary Period
          </label>
          <Select
            value={filters.salaryPeriod}
            onValueChange={(value) => updateFilter("salaryPeriod", value)}
          >
            <SelectTrigger className="bg-zinc-800 text-white">
              <SelectValue placeholder="All periods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SalaryPeriod.HOURLY}>Hourly</SelectItem>
              <SelectItem value={SalaryPeriod.MONTHLY}>Monthly</SelectItem>
              <SelectItem value={SalaryPeriod.YEARLY}>Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={clearFilters}>
          Clear
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}

export default JobFilter;
