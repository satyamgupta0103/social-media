import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

interface Community {
  name: string;
}

export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) throw new Error(error.message);
  return data as PostWithCommunity[];
};

export const fetchCommunityName = async (
  communityId: number
): Promise<Community> => {
  const { data, error } = await supabase
    .from("communities")
    .select("name")
    .eq("id", communityId)
    .single();

  if (error) throw new Error(error.message);
  return data as Community;
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  const {
    data: communityInfo,
    error: communityError,
    isLoading: communityLoading,
  } = useQuery<Community, Error>({
    queryKey: ["communityInfo", communityId],
    queryFn: () => fetchCommunityName(communityId),
  });

  if (isLoading || communityLoading)
    return <div className="text-center py-4">Loading communities...</div>;

  if (error || communityError)
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error?.message || communityError?.message}
      </div>
    );

  return (
    <div>
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data?.[0]?.communities?.name || communityInfo?.name || "Community"}{" "}
        Community Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};
