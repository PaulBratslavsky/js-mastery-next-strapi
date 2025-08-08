import { loaders } from "@/data/api/loaders";

export default async function CommunityRoute() {
  const { data } = await loaders.users.getAllUsers(1);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div>
        <h1 className="h1-bold text-white invert-colors">Community</h1>
        {data &&
          data.map((user) => <div key={user.documentId}>{user.name}</div>)}
      </div>
    </div>
  );
}
