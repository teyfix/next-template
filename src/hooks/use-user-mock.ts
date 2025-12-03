import { useQuery } from "@tanstack/react-query";
import { sleep } from "@/lib/sleep";

export const userModel = {
  name: "Halil Teyfik",
  image: "https://avatars.githubusercontent.com/u/49863255",
  isAdmin: true,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["/api/user/me"],
    queryFn: async () => sleep(1000).then(() => userModel),
  });
};
