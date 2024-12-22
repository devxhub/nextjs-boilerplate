export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin text-gray-500 dark:text-gray-400 border-4 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    </div>
  );
}
