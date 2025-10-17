export default function Unauthorized() {
  // ab tu hi bata de
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold text-red-500">Access Denied 🚫</h1>
        <p className="mt-3">You are not authorized to view this page.</p>
      </div>
    </div>
  );
}
