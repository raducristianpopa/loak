import { XCircleIcon } from "@heroicons/react/20/solid";

type ErrorPanelProps = {
  message: string;
};

export const ErrorPanel = ({ message }: ErrorPanelProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-red-800">Something went wrong!</h3>
          <div className="mt-2 text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              <li>{message}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
