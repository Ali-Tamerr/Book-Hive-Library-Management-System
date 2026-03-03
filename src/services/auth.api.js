import { getAllUsers, createUser } from "./users.api";

const normalizeUsersArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;

  if (payload.data && typeof payload.data === "object") {
    if (Array.isArray(payload.data.items)) return payload.data.items;
    if (Array.isArray(payload.data.users)) return payload.data.users;
    if (Array.isArray(payload.data.results)) return payload.data.results;
  }

  return [];
};

const getPagingMeta = (payload, fallbackPage, fallbackLimit) => {
  const source =
    payload &&
    typeof payload === "object" &&
    payload.data &&
    typeof payload.data === "object"
      ? payload.data
      : payload;

  const page = Number(source?.page ?? source?.currentPage ?? fallbackPage);
  const limit = Number(source?.limit ?? source?.pageSize ?? fallbackLimit);
  const total = Number(
    source?.total ?? source?.totalCount ?? source?.count ?? 0,
  );

  return {
    page: Number.isFinite(page) && page > 0 ? page : fallbackPage,
    limit: Number.isFinite(limit) && limit > 0 ? limit : fallbackLimit,
    total: Number.isFinite(total) && total >= 0 ? total : 0,
  };
};

const getAllUsersForAuth = async () => {
  const firstPage = 1;
  const pageSize = 50;
  const maxPages = 200;

  const fetchPageWithFallback = async (page, preferredLimit) => {
    const limitsToTry = [preferredLimit, 25, 12];
    let lastError = null;

    for (const limit of limitsToTry) {
      try {
        const response = await getAllUsers({ page, limit });
        return { response, usedLimit: limit };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };

  const { response: firstResponse, usedLimit: firstUsedLimit } =
    await fetchPageWithFallback(firstPage, pageSize);
  const firstUsers = normalizeUsersArray(firstResponse);

  if (Array.isArray(firstResponse)) {
    return firstUsers;
  }

  const { page, limit, total } = getPagingMeta(
    firstResponse,
    firstPage,
    firstUsedLimit,
  );
  const users = [...firstUsers];

  if (total > 0 && users.length >= total) {
    return users;
  }

  if (firstUsers.length < limit && total === 0) {
    return users;
  }

  let currentPage = page + 1;
  while (currentPage <= maxPages) {
    const { response } = await fetchPageWithFallback(currentPage, limit);
    const pageUsers = normalizeUsersArray(response);

    if (!pageUsers.length) break;

    users.push(...pageUsers);

    const pageMeta = getPagingMeta(response, currentPage, limit);
    if (pageMeta.total > 0 && users.length >= pageMeta.total) {
      break;
    }

    if (pageUsers.length < pageMeta.limit) {
      break;
    }

    currentPage += 1;
  }

  return users;
};

const persistAuthSession = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));

  const token =
    typeof user?.token === "string"
      ? user.token
      : typeof user?.accessToken === "string"
        ? user.accessToken
        : null;

  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }

  window.dispatchEvent(new Event("userUpdated"));
};

export const login = async (email, password) => {
  try {
    const users = await getAllUsersForAuth();

    if (!Array.isArray(users)) {
      throw new Error("Failed to fetch users. Please try again.");
    }

    console.log("Total users fetched:", users.length);

    const normalizedEmail = String(email || "")
      .toLowerCase()
      .trim();
    const user = users.find(
      (u) =>
        String(u.email || "")
          .toLowerCase()
          .trim() === normalizedEmail,
    );

    if (!user) {
      console.error("User not found for email:", email);
      throw new Error("User not found. Please check your email address.");
    }

    console.log("User found:", { email: user.email, role: user.role });

    const storedPassword = user.password_hash || user.password || "";
    if (storedPassword !== password) {
      console.error("Password mismatch for user:", email);
      throw new Error("Incorrect password. Please try again.");
    }

    console.log("Password verified successfully");

    persistAuthSession(user);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const users = await getAllUsersForAuth();
    if (!Array.isArray(users)) {
      throw new Error("Failed to fetch users. Please try again.");
    }
    const existingUser = users.find(
      (u) =>
        String(u.phone_number || "").trim() ===
        String(userData.contact || "").trim(),
    );

    if (existingUser) {
      throw new Error(
        "This phone number is already linked to another account.",
      );
    }

    console.log("Creating user with data:", {
      user_id: userData.user_id,
      name: userData.name,
      phone_number: userData.contact,
      email: userData.email,
      password_hash: userData.password,
      role: "User",
      status: "Active",
    });

    const createdUser = await createUser({
      user_id: userData.user_id,
      name: userData.name,
      phone_number: userData.contact,
      email: userData.email,
      password_hash: userData.password,
      role: "User",
      status: "Active",
    });

    console.log("API response after createUser:", createdUser);

    let user = createdUser;

    if (!createdUser || createdUser === "" || typeof createdUser === "string") {
      console.log(
        "API returned empty/invalid response, fetching user by phone number...",
      );
      const allUsers = await getAllUsersForAuth();
      user = Array.isArray(allUsers)
        ? allUsers.find(
            (u) =>
              String(u.phone_number || "").trim() ===
              String(userData.contact || "").trim(),
          )
        : null;
      console.log("Found user after fetch:", user);
    }

    if (!user || !user.user_id) {
      throw new Error("Failed to create or retrieve user account");
    }

    persistAuthSession(user);

    console.log("User saved to localStorage:", user);

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  window.dispatchEvent(new Event("userUpdated"));
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
  persistAuthSession(user);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};
