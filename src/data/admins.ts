export interface AdminUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export const ADMIN_PASSWORD = "admin";

export const admins: AdminUser[] = [
  {
    name: "Mithun",
    email: "mithunhalder.dev@gmail.com",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
  },
  {
    name: "Ansh",
    email: "anshpandey7836@gmail.com",
    avatarUrl: "https://avatars.githubusercontent.com/u/245109270?v=4",
  },
  {
    name: "Harsh",
    email: "wanderlytrails.in@gmail.com",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
  },
];

export function validateAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const admin = admins.find((item) => item.email.toLowerCase() === normalizedEmail);
  if (!admin) { 
    return false;
  }

  return password === ADMIN_PASSWORD;
}

export function getAdminByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return admins.find((item) => item.email.toLowerCase() === normalizedEmail) ?? null;
}
