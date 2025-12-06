import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "@/lib/dayjs";
import { toSnakeCase } from "@/lib/utils";
import { FullJob } from "@/types";
import {
  AlertCircleIcon,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import Empty from "../ui/empty";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

type Props = {
  isLoading: boolean;
  isApplying: boolean;
  onClose?: () => void;
  job: FullJob | undefined;
  onApply?: (jobId: string, coverLetter?: string, cb?: () => void) => void;
};

function JobDetails(props: Props) {
  const { user } = useAuth();
  const { isLoading, job, isApplying, onApply, onClose } = props;
  const [coverLetter, setCoverLetter] = useState<string | undefined>();
  const [isApplicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const isJobOpen = job && dayjs(job.applicationDeadline).isAfter(dayjs());

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
        <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <Skeleton className="mb-3 h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <Skeleton className="mb-3 h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
          <div>
            <Skeleton className="mb-3 h-6 w-40" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) return <Empty text="Job details not found" />;

  return (
    <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
      {/* Header Section */}
      <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-white">{job.title}</h1>
            <div className="flex items-center gap-2 text-lg text-zinc-400">
              <Building2 size={18} className="text-zinc-500" />
              <span>{job.company}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white active:scale-95"
            aria-label="Close job details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <Badge
            variant={isJobOpen ? "default" : "destructive"}
            className={
              isJobOpen
                ? "border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-400/10"
                : "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-400/10"
            }
          >
            {isJobOpen ? "Open for Applications" : "Application Closed"}
          </Badge>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <MapPin size={14} />
              <span>Location</span>
            </div>
            <p className="text-sm font-semibold text-white">{job.location}</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Briefcase size={14} />
              <span>Type</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {toSnakeCase(job.employmentType)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Users size={14} />
              <span>Level</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {toSnakeCase(job.experienceLevel)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <DollarSign size={14} />
              <span>Salary</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {job.salaryCurrency} {job.salaryMin.toLocaleString()} -{" "}
              {job.salaryMax.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-500">
              / {toSnakeCase(job.salaryPeriod)}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Calendar size={14} />
              <span>Deadline</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {job.applicationDeadline
                ? dayjs(job.applicationDeadline).format("MMM DD, YYYY")
                : "N/A"}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Clock size={14} />
              <span>Posted</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {job.createdAt ? dayjs(job.createdAt).fromNow(false) : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6 p-6">
        {/* Description */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Description</h2>
          <div className="rounded-lg bg-zinc-800/30 p-4">
            <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
              {job.description}
            </p>
          </div>
        </div>

        {/* Responsibilities */}
        {job.responsibilities?.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Responsibilities
            </h2>
            <div className="rounded-lg bg-zinc-800/30 p-4">
              <ul className="space-y-2 text-sm text-zinc-300">
                {job.responsibilities.map((responsibility) => (
                  <li
                    key={responsibility.id}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{responsibility.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Requirements
            </h2>
            <div className="rounded-lg bg-zinc-800/30 p-4">
              <ul className="space-y-2 text-sm text-zinc-300">
                {job.requirements.map((requirement) => (
                  <li key={requirement.id} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{requirement.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Benefits */}
        {job.benefits?.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Benefits</h2>
            <div className="rounded-lg bg-zinc-800/30 p-4">
              <ul className="space-y-2 text-sm text-zinc-300">
                {job.benefits.map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{benefit.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tags */}
        {job.tags?.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Separator className="my-6" />
        {/* Apply Section */}
        {job.userId !== user?.id && (
          <div className="space-y-4">
            {!isJobOpen && (
              <Alert
                variant="destructive"
                className="border-red-500/20 bg-red-500/10 text-red-400"
              >
                <AlertCircleIcon size={16} />
                <AlertTitle className="text-red-400">
                  Application Deadline Passed
                </AlertTitle>
                <AlertDescription className="text-red-300/90">
                  The application deadline for this position was{" "}
                  {job.applicationDeadline
                    ? dayjs(job.applicationDeadline).format("MMMM DD, YYYY")
                    : "not specified"}
                  . This job is no longer accepting applications.
                </AlertDescription>
              </Alert>
            )}
            <div
              className={`flex items-center ${
                !isJobOpen ? "justify-center" : "justify-end"
              }`}
            >
              <Button
                size="lg"
                isLoading={isApplying}
                variant={isJobOpen ? "default" : "outline"}
                disabled={!isJobOpen || isApplying}
                onClick={() => setApplicationDialogOpen(true)}
                className={`min-w-[140px] ${
                  !isJobOpen
                    ? "cursor-not-allowed border-zinc-700 bg-zinc-800/50 text-zinc-500 opacity-60"
                    : ""
                }`}
              >
                {isJobOpen ? "Apply Now" : "Application Closed"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <AlertDialog
        open={isApplicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase size={20} className="text-primary" />
              </div>
              <div>
                <AlertDialogTitle className="text-2xl">
                  Apply to {job.company}
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  Submit your application for the {job.title} position
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-6">
            {/* Job Summary */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">
                  Job Position
                </h4>
                <p className="text-sm text-zinc-300">{job.title}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={14} />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Alert */}
            <Alert className="border-orange-500/20 bg-orange-500/10 text-orange-400">
              <AlertCircleIcon size={16} />
              <AlertTitle className="text-orange-400">
                Important Notice
              </AlertTitle>
              <AlertDescription className="text-orange-300/90">
                Once you submit your application, you won&apos;t be able to make
                any changes. Please review all information carefully before
                proceeding.
              </AlertDescription>
            </Alert>

            {/* Cover Letter Section */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-white">
                  Cover Letter
                </Label>
                <p className="text-xs text-zinc-400">
                  Introduce yourself and explain why you&apos;re a good fit for
                  this position (Optional)
                </p>
              </div>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter here... (Optional)"
                className="min-h-[120px] resize-none bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                rows={6}
              />
              {coverLetter && (
                <p className="text-xs text-zinc-500">
                  {coverLetter.length} characters
                </p>
              )}
            </div>

            <Separator className="bg-zinc-800" />
          </div>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel
              onClick={() => {
                setApplicationDialogOpen(false);
                setCoverLetter(undefined);
              }}
              className="sm:mr-2"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isApplying}
              onClick={() =>
                onApply &&
                onApply(job.id, coverLetter, () => {
                  setCoverLetter(undefined);
                  setApplicationDialogOpen(false);
                })
              }
              className="min-w-[140px]"
            >
              {isApplying ? "Submitting..." : "Submit Application"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default JobDetails;
