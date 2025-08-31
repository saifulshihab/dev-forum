function Page() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="inline-flex flex-col items-center gap-5">
        <p className="text-center text-xl text-muted-foreground">
          <span className="font-bold">404</span>
          <br />
          <span className="font-light">Question not found!</span>
        </p>
      </div>
    </div>
  );
}

export default Page;
