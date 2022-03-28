interface User {
  id: string;
  name: string;
  login: string;
  email: string;
  avatarUrl: string;
  url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
}

export default User;
