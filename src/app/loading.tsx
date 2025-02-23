export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
      </div>
    </div>
  );
}
