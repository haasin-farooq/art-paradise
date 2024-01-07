import IconLoader from "@/svgs/icons/loader";

const Loader = () => (
  <div className="flex h-full min-h-[calc(100vh-144px)] w-full items-center justify-center p-2">
    <IconLoader className="h-20 w-20 animate-spin" />
  </div>
);

export default Loader;
