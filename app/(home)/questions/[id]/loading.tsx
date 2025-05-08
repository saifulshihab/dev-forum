import Spinner from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;
