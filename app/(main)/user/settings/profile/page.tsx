"use client";

import { useAuth } from "@/components/contexts/auth-provider";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/generated/prisma";
import {
  checkUsernameAvailability,
  getCurrentUser,
  updateProfile
} from "@/lib/actions";
import { countries } from "@/lib/data";
import { cn } from "@/lib/utils";
import { UserValidator } from "@/lib/validators/user-validator";
import { FullUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, PlusIcon, Trash, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<z.infer<typeof UserValidator>>({
    resolver: zodResolver(UserValidator)
  });
  const { user } = useAuth();
  const [usernameAvailability, setUsernameAvailability] = useState<{
    isLoading?: boolean;
    error?: string;
    isAvailable?: boolean;
  }>();
  const formErrors = form.formState.errors;

  // Helper function to transform user data for form reset
  const transformUserForForm = (user: FullUser) => {
    return {
      ...user,
      fullName: user.fullName ?? undefined,
      username: user.username ?? undefined,
      bio: user.bio ?? undefined,
      dob: user.dob ?? undefined,
      websiteUrl: user.websiteUrl ?? undefined,
      location: user.location ?? undefined,
      experiences: user.experiences?.map((exp) => ({
        ...exp,
        to: exp.to ?? undefined,
        present: exp.present ?? true,
        description: exp.description ?? undefined
      })),
      educations: user.educations?.map((edu) => ({
        ...edu,
        to: edu.to ?? undefined,
        present: edu.present ?? true,
        description: edu.description ?? undefined
      })),
      projects: user.projects?.map((project) => ({
        ...project,
        description: project.description ?? undefined,
        url: project.url ?? undefined
      }))
    } as FullUser;
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser(true);
        if (!user) {
          setIsLoading(false);
          return;
        }
        form.reset(transformUserForForm(user) as any);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    })();
  }, [form]);

  const checkUsername = useDebouncedCallback(async (username: string) => {
    setUsernameAvailability({ isLoading: true });
    const usernameExist = await checkUsernameAvailability(username);
    if (usernameExist) {
      setUsernameAvailability({ error: "This username is already taken!" });
    } else {
      setUsernameAvailability({ isAvailable: true });
    }
  }, 500);

  const skillsField = useFieldArray({
    name: "skills",
    control: form.control
  });

  const projectField = useFieldArray({
    name: "projects",
    control: form.control
  });

  const experienceField = useFieldArray({
    name: "experiences",
    control: form.control
  });

  const educationField = useFieldArray({
    name: "educations",
    control: form.control
  });

  const socialLinksField = useFieldArray({
    name: "socialLinks",
    control: form.control
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setIsLoading(true);
      const res = await updateProfile(data);
      if (res?.error) {
        toast.error(res?.error);
      } else {
        toast.success("Profile updated");
        const user = await getCurrentUser(true);
        if (user) form.reset(transformUserForForm(user) as any);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className={cn("flex-1 px-4 py-3", { relative: isLoading })}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Primary Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FormField
                      name="fullName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Choose a username"
                                {...field}
                                disabled={
                                  field.disabled ||
                                  usernameAvailability?.isLoading
                                }
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (e.target.value.length) {
                                    checkUsername(e.target.value);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {usernameAvailability?.isLoading ? (
                        <LoaderCircle className="mt-1 h-3 animate-spin text-zinc-500" />
                      ) : usernameAvailability?.error ? (
                        <p className="mt-1 text-[0.8rem] font-medium text-destructive">
                          {usernameAvailability?.error}
                        </p>
                      ) : usernameAvailability?.isAvailable ? (
                        <div className="mt-1 inline-flex items-center">
                          <CircleCheck className="h-3 text-green-500" />
                          <p className="text-[0.8rem] font-medium text-destructive text-green-500">
                            Username available.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FormField
                      name="bio"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your bio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="websiteUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your website url (e.g. https://your-name.dev)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <Label className="mb-2">Location</Label>
                            <Select
                              value={field.value}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map(({ name }, idx) => (
                                  <SelectItem key={idx} value={name}>
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <Controller
                        name="dob"
                        control={form.control}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <Label className="mb-2">Date of Birth</Label>
                            <DatePicker
                              label="Date of birth"
                              date={field.value}
                              onSelect={field.onChange}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Separator className="my-2" />
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 items-center gap-3">
                  {skillsField?.fields.length ? (
                    skillsField.fields.map((field, fieldIdx) => (
                      <div key={field.id} className="group col-span-1 flex">
                        <FormField
                          control={form.control}
                          name={`skills.${fieldIdx}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Skill name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          onClick={() => {
                            skillsField.remove(fieldIdx);
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
                    <p className="text-xs text-zinc-400">No skills added</p>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-[8.9375rem] border-dashed"
                    onClick={() => {
                      skillsField.append({ name: "" });
                    }}
                  >
                    <PlusIcon />
                    Add Skill
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Separator className="my-2" />
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Experiences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn("flex w-full items-center justify-between", {
                    "flex-col items-start": experienceField.fields.length
                  })}
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-5">
                      {experienceField.fields.length ? (
                        experienceField.fields.map((field, fieldIdx) => (
                          <div
                            key={field.id}
                            className="flex flex-col gap-4 rounded-md border border-dashed p-3"
                          >
                            <div className="flex items-center justify-between">
                              <FormField
                                control={form.control}
                                name={`experiences.${fieldIdx}.role`}
                                render={({ field }) => (
                                  <FormItem className="w-1/2">
                                    <FormControl>
                                      <Input
                                        placeholder="Your role"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => experienceField.remove(fieldIdx)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FormField
                              control={form.control}
                              name={`experiences.${fieldIdx}.company`}
                              render={({ field }) => (
                                <FormItem className="w-1/2">
                                  <FormControl>
                                    <Input
                                      placeholder="Company name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex items-center gap-3">
                              <Controller
                                name={`experiences.${fieldIdx}.from`}
                                control={form.control}
                                render={({ field }) => (
                                  <DatePicker
                                    label="From"
                                    date={field.value as any}
                                    onSelect={field.onChange}
                                  />
                                )}
                              />
                              <Controller
                                name={`experiences.${fieldIdx}.present`}
                                control={form.control}
                                render={({ field }) => (
                                  <Fragment>
                                    <Checkbox
                                      id={`experiences.${fieldIdx}.present`}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <Label
                                      htmlFor={`experiences.${fieldIdx}.present`}
                                    >
                                      Present
                                    </Label>
                                  </Fragment>
                                )}
                              />
                              {!form.watch(
                                `experiences.${fieldIdx}.present`
                              ) && (
                                <Controller
                                  name={`experiences.${fieldIdx}.to`}
                                  control={form.control}
                                  render={({ field }) => (
                                    <div>
                                      <DatePicker
                                        label="To"
                                        date={field.value}
                                        onSelect={field.onChange}
                                      />
                                      {formErrors?.experiences?.[fieldIdx]
                                        ?.to && (
                                        <FormMessage>
                                          {
                                            formErrors?.experiences?.[fieldIdx]
                                              ?.to?.message as string
                                          }
                                        </FormMessage>
                                      )}
                                    </div>
                                  )}
                                />
                              )}
                            </div>
                            <FormField
                              control={form.control}
                              name={`experiences.${fieldIdx}.description`}
                              render={({ field }) => (
                                <FormItem className="w-3/4">
                                  <FormControl>
                                    <Textarea
                                      rows={10}
                                      placeholder="Write job description...(optional)"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400">
                          No experiences added
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size={experienceField.fields.length ? "default" : "icon"}
                    className={cn("rounded-full", {
                      "mt-3 rounded-md": experienceField.fields.length
                    })}
                    onClick={() => {
                      experienceField.append({
                        role: "",
                        company: "",
                        from: null as any,
                        present: true
                      });
                    }}
                  >
                    <PlusIcon />
                    {experienceField.fields.length ? "Add Experience" : null}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {user?.type === UserType.DEVELOPER ? (
              <>
                <Separator className="my-2" />
                <Card className="border-dashed bg-zinc-700/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={cn(
                        "flex w-full items-center justify-between",
                        {
                          "flex-col items-start": projectField.fields.length
                        }
                      )}
                    >
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex flex-col gap-5">
                          {projectField.fields.length ? (
                            projectField.fields.map((field, fieldIdx) => (
                              <div
                                key={field.id}
                                className="flex flex-col gap-4 rounded-md border border-dashed p-3"
                              >
                                <div className="flex items-center justify-between">
                                  <FormField
                                    control={form.control}
                                    name={`projects.${fieldIdx}.name`}
                                    render={({ field }) => (
                                      <FormItem className="w-1/2">
                                        <FormControl>
                                          <Input
                                            placeholder="Project name"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() =>
                                      projectField.remove(fieldIdx)
                                    }
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                                <FormField
                                  control={form.control}
                                  name={`projects.${fieldIdx}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Write project description...(optional)"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`projects.${fieldIdx}.url`}
                                  render={({ field }) => (
                                    <FormItem className="w-3/4">
                                      <FormControl>
                                        <Input
                                          placeholder="Project url (optional)"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-zinc-400">
                              No projects added
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size={projectField.fields.length ? "default" : "icon"}
                        className={cn("rounded-full", {
                          "mt-3 rounded-md": projectField.fields.length
                        })}
                        onClick={() => {
                          projectField.append({ name: "" });
                        }}
                      >
                        <PlusIcon />
                        {projectField.fields.length ? "Add Project" : null}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}
            <Separator className="my-2" />
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn("flex w-full items-center justify-between", {
                    "flex-col items-start": educationField.fields.length
                  })}
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-5">
                      {educationField.fields.length ? (
                        educationField.fields.map((field, fieldIdx) => (
                          <div
                            key={field.id}
                            className="flex flex-col gap-4 rounded-md border border-dashed p-3"
                          >
                            <div className="flex items-center justify-between">
                              <FormField
                                control={form.control}
                                name={`educations.${fieldIdx}.institute`}
                                render={({ field }) => (
                                  <FormItem className="w-1/2">
                                    <FormControl>
                                      <Input
                                        placeholder="Institute name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => educationField.remove(fieldIdx)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <div className="flex items-center gap-3">
                              <Controller
                                name={`educations.${fieldIdx}.from`}
                                control={form.control}
                                render={({ field }) => (
                                  <div>
                                    <DatePicker
                                      label="From"
                                      date={field.value as any}
                                      onSelect={field.onChange}
                                    />
                                    {formErrors?.educations?.[fieldIdx]?.from
                                      ?.message ? (
                                      <p className="mt-2 text-[0.8rem] font-medium text-destructive">
                                        {
                                          formErrors?.educations?.[fieldIdx]
                                            ?.from.message
                                        }
                                      </p>
                                    ) : null}
                                  </div>
                                )}
                              />
                              <Controller
                                name={`educations.${fieldIdx}.present`}
                                control={form.control}
                                render={({ field }) => (
                                  <Fragment>
                                    <Checkbox
                                      id={`educations.${fieldIdx}.present`}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <Label
                                      htmlFor={`educations.${fieldIdx}.present`}
                                    >
                                      Present
                                    </Label>
                                  </Fragment>
                                )}
                              />
                              {!form.watch(
                                `educations.${fieldIdx}.present`
                              ) && (
                                <Controller
                                  name={`educations.${fieldIdx}.to`}
                                  control={form.control}
                                  render={({ field }) => (
                                    <div>
                                      <DatePicker
                                        label="To"
                                        date={field.value}
                                        onSelect={field.onChange}
                                      />
                                      {formErrors?.educations?.[fieldIdx]
                                        ?.to && (
                                        <FormMessage>
                                          {
                                            formErrors?.educations?.[fieldIdx]
                                              ?.to?.message as string
                                          }
                                        </FormMessage>
                                      )}
                                    </div>
                                  )}
                                />
                              )}
                            </div>
                            <FormField
                              control={form.control}
                              name={`educations.${fieldIdx}.description`}
                              render={({ field }) => (
                                <FormItem className="w-3/4">
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Write description...(optional)"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400">
                          No educations added
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size={educationField.fields.length ? "default" : "icon"}
                    className={cn("rounded-full", {
                      "mt-3 rounded-md": educationField.fields.length
                    })}
                    onClick={() => {
                      educationField.append({
                        institute: "",
                        from: null as any
                      });
                    }}
                  >
                    <PlusIcon />
                    {educationField.fields.length ? "Add Education" : null}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Separator className="my-2" />
            <Card className="border-dashed bg-zinc-700/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn("flex w-full items-center justify-between", {
                    "flex-col items-start": socialLinksField.fields.length
                  })}
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-5">
                      {socialLinksField.fields.length ? (
                        socialLinksField.fields.map((field, fieldIdx) => (
                          <div
                            key={field.id}
                            className="flex flex-col gap-4 rounded-md border border-dashed p-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex flex-1 items-center gap-3">
                                <FormField
                                  control={form.control}
                                  name={`socialLinks.${fieldIdx}.platform`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        value={field.value}
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select platform" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="github">
                                            GitHub
                                          </SelectItem>
                                          <SelectItem value="linkedin">
                                            LinkedIn
                                          </SelectItem>
                                          <SelectItem value="facebook">
                                            Facebook
                                          </SelectItem>
                                          <SelectItem value="instagram">
                                            Instagram
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`socialLinks.${fieldIdx}.url`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder="Enter link"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() =>
                                  socialLinksField.remove(fieldIdx)
                                }
                              >
                                <Trash />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400">No links added</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size={socialLinksField.fields.length ? "default" : "icon"}
                    className={cn("rounded-full", {
                      "mt-3 rounded-md": socialLinksField.fields.length
                    })}
                    onClick={() => {
                      socialLinksField.append({ platform: "", url: "" });
                    }}
                  >
                    <PlusIcon />
                    {socialLinksField.fields.length ? "Add Link" : null}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="sticky bottom-0 right-0 -mx-4 mt-4 flex justify-end border-t border-dashed bg-gradient-to-r from-zinc-950 to-zinc-900 p-3">
              <Button isLoading={isLoading} type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
        {isLoading ? (
          <div className="absolute inset-0 z-50 bg-zinc-800 bg-opacity-80" />
        ) : null}
      </div>
    </div>
  );
}

export default Page;
