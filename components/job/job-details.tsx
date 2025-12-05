import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "@/lib/dayjs";
import { toSnakeCase } from "@/lib/utils";
import { FullJob } from "@/types";
import {
  AlertCircleIcon,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-provider";
import { Alert, AlertDescription } from "../ui/alert";
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
import { Textarea } from "../ui/textarea";

type Props = {
  isLoading: boolean;
  isApplying: boolean;
  onClose?: () => void;
  job: FullJob | undefined;
  onApply?: (jobId: string, coverLetter?: string, cb?: () => void) => void;
};

function JobDetails(props: Props) {
  const { isLoading, job, isApplying, onApply, onClose } = props;
  const { user } = useAuth();
  const [coverLetter, setCoverLetter] = useState<string | undefined>();
  const [isApplicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const isJobOpen = job && dayjs(job.applicationDeadline).isAfter(dayjs());
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl rounded-lg bg-zinc-900 p-8 shadow-lg">
        <div className="mb-6 border-b pb-4">
          <Skeleton className="mb-2 h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <div className="mt-2 flex flex-col gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="mt-2 h-5 w-5/6" />
        </div>
        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>
        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>
        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Skeleton className="mx-auto h-10 w-32" />
        </div>
      </div>
    );
  }

  if (!job) return <Empty text="Job details not found" />;

  return (
    <div className="w-full max-w-2xl rounded-lg bg-zinc-900 p-6 shadow-lg">
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-zinc-400 transition active:scale-95"
          >
            <X size={16} />
          </button>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">{job.title}</h1>
        <p className="text-lg text-zinc-400">{job.company}</p>
        <div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <div className="flex items-center text-zinc-500">
              <MapPin size={14} className="mr-2" />
              <span>
                <span className="text-white">Location : </span>
                {job.location}
              </span>
            </div>
            <div className="flex items-center text-zinc-500">
              <Briefcase size={14} className="mr-2" />
              <span>
                <span className="text-white">Job Type : </span>
                {toSnakeCase(job.employmentType)}
              </span>
            </div>
            <div className="flex items-center text-zinc-500">
              <DollarSign size={14} className="mr-2" />
              <span>
                <span className="text-white">Salary : </span>
                {job.salaryCurrency} {job.salaryMin} - {job.salaryMax} /{" "}
                {toSnakeCase(job.salaryPeriod)}
              </span>
            </div>
            <div className="flex items-center text-zinc-500">
              <Users size={14} className="mr-2" />
              <span>
                <span className="text-white">Experience Level : </span>
                {toSnakeCase(job.experienceLevel)}
              </span>
            </div>
            <div className="flex items-center text-zinc-500">
              <Calendar size={14} className="mr-2" />
              <span>
                <span className="text-white">Job Type : </span>
                {job.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center text-zinc-500">
              <Clock size={14} className="mr-2" />
              <span>
                Posted{" "}
                {job.createdAt ? dayjs(job.createdAt).fromNow(false) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold text-white">Description</h2>
        <p className="whitespace-pre-line text-sm text-zinc-300">
          {job.description}
        </p>
      </div>
      {job.responsibilities?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold text-white">
            Responsibilities
          </h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.responsibilities.map((r) => (
              <li key={r.id}>{r.detail}</li>
            ))}
          </ul>
        </div>
      )}
      {job.requirements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold text-white">
            Requirements
          </h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.requirements.map((r) => (
              <li key={r.id}>{r.detail}</li>
            ))}
          </ul>
        </div>
      )}
      {job.benefits?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-white">Benefits</h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.benefits.map((b) => (
              <li key={b.id}>{b.detail}</li>
            ))}
          </ul>
        </div>
      )}
      {job.tags?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-white">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
      {job.userId !== user?.id ? (
        <div className="mt-8 flex justify-end">
          {!isJobOpen && (
            <span className="mr-4 self-center text-sm text-orange-400">
              The application deadline has passed.
            </span>
          )}
          <Button
            size="lg"
            variant="default"
            isLoading={isApplying}
            disabled={!isJobOpen || isApplying}
            onClick={() => setApplicationDialogOpen(true)}
          >
            Apply
          </Button>
        </div>
      ) : null}
      <AlertDialog
        open={isApplicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apply to {job.company}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you ready to submit your application? Please review all
            information before proceeding.
          </AlertDialogDescription>
          <Alert className="text-orange-400">
            <AlertCircleIcon size={14} />
            <AlertDescription>
              Once submitted, you won&apos;t be able to make changes to your
              application.
            </AlertDescription>
          </Alert>
          <div className="space-y-1">
            <Label>Cover Letter</Label>
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write cover letter...(Optional)"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setApplicationDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isApplying}
              onClick={() =>
                onApply &&
                onApply(job.id, coverLetter, () => {
                  setCoverLetter(undefined);
                })
              }
            >
              Submit Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default JobDetails;
