"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/actions";
import { JobValidator } from "@/lib/validators/job-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof JobValidator>>({
    resolver: zodResolver(JobValidator)
  });

  useEffect(() => {
    form.reset({});
  }, [form]);

  const requirementsField = useFieldArray({
    name: "requirements",
    control: form.control
  });

  const responsibilitiesField = useFieldArray({
    name: "responsibilities",
    control: form.control
  });

  const benefitsField = useFieldArray({
    name: "benefits",
    control: form.control
  });

  const tagsField = useFieldArray({ name: "tags", control: form.control });

  const onSubmit = async (data: z.infer<typeof JobValidator>) => {
    try {
      setIsLoading(true);
      const res = await createJob(data as any);
      if (res?.error) {
        toast.error(res?.error);
      } else {
        toast.success("Job created successfully");
        form.reset();
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex-1 px-4 py-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Post a Job Circular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {/* Title */}
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Job Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-3">
                    {/* Company */}
                    <FormField
                      name="company"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Location */}
                    <FormField
                      name="location"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Description */}
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Job Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-3">
                    {/* Type */}
                    <FormField
                      name="employmentType"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Job Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="FULL_TIME">
                                Full Time
                              </SelectItem>
                              <SelectItem value="PART_TIME">
                                Part Time
                              </SelectItem>
                              <SelectItem value="CONTRACT">Contract</SelectItem>
                              <SelectItem value="INTERNSHIP">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Experience Level */}
                    <FormField
                      name="experienceLevel"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Experience Level</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ENTRY">Entry</SelectItem>
                              <SelectItem value="MID">Mid</SelectItem>
                              <SelectItem value="SENIOR">Senior</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Job Requirements */}
                  <div>
                    <FormLabel>Job Requirements</FormLabel>
                    <div className="my-2 space-y-3">
                      {requirementsField.fields.map((field, fieldIdx) => (
                        <div
                          key={field.id}
                          className="flex w-full items-center gap-3"
                        >
                          <FormField
                            name={`requirements.${fieldIdx}.detail`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Write requirement"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => {
                              requirementsField.remove(fieldIdx);
                            }}
                            variant="ghost"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => {
                        requirementsField.append({ detail: "" });
                      }}
                    >
                      <PlusIcon />
                      Add Requirement
                    </Button>
                  </div>
                  {/* Responsibilities */}
                  <div>
                    <FormLabel>Responsibilities</FormLabel>
                    <div className="my-2 space-y-3">
                      {responsibilitiesField.fields.map((field, fieldIdx) => (
                        <div key={field.id} className="flex items-center gap-3">
                          <FormField
                            name={`responsibilities.${fieldIdx}.detail`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Write responsibility"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              responsibilitiesField.remove(fieldIdx);
                            }}
                          >
                            <Trash />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => {
                        responsibilitiesField.append({ detail: "" });
                      }}
                    >
                      <PlusIcon />
                      Add Responsibility
                    </Button>
                  </div>
                  {/* Benefits */}
                  <div>
                    <FormLabel>Benefits</FormLabel>
                    <div className="my-2 space-y-3">
                      {benefitsField.fields.map((field, fieldIdx) => (
                        <div key={field.id} className="flex items-center gap-3">
                          <FormField
                            name={`benefits.${fieldIdx}.detail`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Write benefit"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => {
                              benefitsField.remove(fieldIdx);
                            }}
                            variant="ghost"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => {
                        benefitsField.append({ detail: "" });
                      }}
                    >
                      <PlusIcon />
                      Add Benefit
                    </Button>
                  </div>
                  {/* Salary range */}
                  <div className="flex items-center gap-3">
                    <FormField
                      name="salaryMin"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Min</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Min"
                              {...field}
                              onChange={(e) => {
                                if (e.target.value !== undefined) {
                                  field.onChange(Number(e.target.value));
                                } else {
                                  field.onChange(undefined);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="salaryMax"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Max</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Max"
                              {...field}
                              onChange={(e) => {
                                if (e.target.value !== undefined) {
                                  field.onChange(Number(e.target.value));
                                } else {
                                  field.onChange(undefined);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="salaryPeriod"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Period</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HOURLY">Hourly</SelectItem>
                              <SelectItem value="MONTHLY">Monthly</SelectItem>
                              <SelectItem value="YEARLY">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="salaryCurrency"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Salary Currency</FormLabel>
                          <FormControl>
                            <Input placeholder="Currency" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Tags */}
                  <div>
                    <FormLabel>Tags</FormLabel>
                    <div className="mt-2 grid grid-cols-4 items-center gap-3">
                      {tagsField?.fields.length ? (
                        tagsField.fields.map((field, fieldIdx) => (
                          <div key={field.id} className="group col-span-1 flex">
                            <FormField
                              control={form.control}
                              name={`tags.${fieldIdx}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Tag name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              onClick={() => {
                                tagsField.remove(fieldIdx);
                              }}
                              variant="ghost"
                              className="-translate-x-1 transform opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 hover:bg-transparent active:scale-95"
                              size="icon"
                            >
                              <X />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400">No tags added</p>
                      )}
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-[8.9375rem] border-dashed"
                        onClick={() => {
                          tagsField.append({ name: "" });
                        }}
                      >
                        <PlusIcon />
                        Add Tag
                      </Button>
                    </div>
                  </div>
                  <div>
                    {/* Deadline */}
                    <Controller
                      name="applicationDeadline"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Deadline</FormLabel>
                          <div>
                            <DatePicker
                              label="Deadline"
                              date={field.value}
                              onSelect={field.onChange}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="requireCoverLetter"
                      control={form.control}
                      render={({ field }) => (
                        <Fragment>
                          <Checkbox
                            id="requireCoverLetter"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label className="ml-2" htmlFor="requireCoverLetter">
                            Require Cover Letter
                          </Label>
                        </Fragment>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="sticky bottom-0 right-0 -mx-4 mt-4 flex justify-end border-t border-dashed bg-gradient-to-r from-zinc-950 to-zinc-900 p-3">
              <Button isLoading={isLoading} type="submit">
                Post Job
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
