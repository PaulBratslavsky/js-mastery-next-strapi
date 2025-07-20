// Types
interface UserProfile {
  documentId: string;
  name: string;
  bio?: string;
  image?: any;
  reputation?: number;
  public?: boolean;
}

interface User {
  id: number;
  username: string;
  email: string;
  referenceId?: string;
}

interface LifecycleEvent {
  result?: User;
  params?: {
    where?: {
      id?: number;
    };
  };
}

// Constants
const USERNAME_ADJECTIVES = [
  "Swift",
  "Brave",
  "Clever",
  "Mighty",
  "Silent",
  "Witty",
  "Bold",
  "Eager",
] as const;

const USERNAME_NOUNS = [
  "Tiger",
  "Eagle",
  "Shark",
  "Wolf",
  "Falcon",
  "Panda",
  "Dragon",
  "Hawk",
] as const;

const USER_PROFILE_API = "api::user-profile.user-profile";
const USERS_PERMISSIONS_SERVICE = "plugin::users-permissions.user";

// Utility functions
function generateUsername(): string {
  const randomAdjective =
    USERNAME_ADJECTIVES[Math.floor(Math.random() * USERNAME_ADJECTIVES.length)];
  const randomNoun =
    USERNAME_NOUNS[Math.floor(Math.random() * USERNAME_NOUNS.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

// User Profile functions
async function findUserProfileById(
  referenceId: string
): Promise<UserProfile | null> {
  if (!referenceId) return null;
  try {
    const profile = await strapi.documents(USER_PROFILE_API).findOne({
      documentId: referenceId,
    });
    
    if (!profile?.name) {
      return null;
    }

    return profile as UserProfile;
  } catch (error) {
    console.error("Error finding user profile:", error);
    return null;
  }
}

async function createUserProfile(name: string): Promise<string | null> {
  try {
    const newUserProfile = await strapi.documents(USER_PROFILE_API).create({
      data: { name },
    });

    return newUserProfile.documentId;
  } catch (error) {
    console.error("Error creating user profile:", error);
    return null;
  }
}

async function deleteUserProfile(referenceId: string): Promise<void> {
  try {
    await strapi.documents(USER_PROFILE_API).delete({
      documentId: referenceId,
    });
  } catch (error) {
    console.error("Error deleting user profile:", error);
  }
}

// User functions
async function findUserById(userId: number): Promise<User | null> {
  try {
    return await strapi.service(USERS_PERMISSIONS_SERVICE).fetch(userId);
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

async function updateUserReferenceId(
  userId: number,
  referenceId: string
): Promise<User | null> {
  try {
    return await strapi.service(USERS_PERMISSIONS_SERVICE).edit(userId, {
      referenceId,
    });
  } catch (error) {
    console.error("Error updating user reference ID:", error);
    return null;
  }
}

// Lifecycle handlers
async function handleUserCreation(user: User): Promise<void> {
  try {
    // Check if user profile already exists
    const existingProfile = await findUserProfileById(user.id.toString());
    if (existingProfile) {
      console.log(`User profile already exists for user ${user.id}`);
      return;
    }

    // Create new user profile
    const username = user.username || generateUsername();
    const referenceId = await createUserProfile(username);

    if (!referenceId) {
      console.error(`Failed to create user profile for user ${user.id}`);
      return;
    }

    // Update user with reference ID
    await updateUserReferenceId(user.id, referenceId);
    console.log(`Successfully created user profile for user ${user.id}`);
  } catch (error) {
    console.error("Error in user creation lifecycle:", error);
  }
}

async function handleUserDeletion(userId: number): Promise<void> {
  try {
    // Find user to get reference ID
    const user = await findUserById(userId);
    if (!user?.referenceId) {
      console.log(`No reference ID found for user ${userId}`);
      return;
    }

    // Check if user profile exists
    const userProfile = await findUserProfileById(user.referenceId);
    if (!userProfile) {
      console.log(`No user profile found for user ${userId}`);
      return;
    }

    // Delete user profile
    await deleteUserProfile(userProfile.documentId);
    console.log(`Successfully deleted user profile for user ${userId}`);
  } catch (error) {
    console.error("Error in user deletion lifecycle:", error);
  }
}

// Lifecycle configuration
export const userLifecycle = {
  models: [USERS_PERMISSIONS_SERVICE],

  async afterCreate(event: LifecycleEvent): Promise<void> {
    const { result } = event;
    if (!result) {
      console.error("No user result in afterCreate event");
      return;
    }

    await handleUserCreation(result);
  },

  async beforeDelete(event: LifecycleEvent): Promise<void> {
    const userId = event.params?.where?.id;
    if (!userId) {
      console.error("No user ID in beforeDelete event");
      return;
    }

    await handleUserDeletion(userId);
  },
};
