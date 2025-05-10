function Page() {
  return (
    <div className="grid h-[calc(100vh-6.25rem)] w-full place-items-center">
      <div className="inline-flex flex-col items-center gap-5">
        <p className="text-center text-xl">
          <span className="font-bold">404</span>
          <br />
          <span className="font-thin">Page not found</span>
        </p>
      </div>
    </div>
  );
}

export default Page;
