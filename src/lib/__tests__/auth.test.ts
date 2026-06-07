import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("jose", () => ({
  SignJWT: vi.fn().mockImplementation(() => ({
    setProtectedHeader: vi.fn().mockReturnThis(),
    setExpirationTime: vi.fn().mockReturnThis(),
    setIssuedAt: vi.fn().mockReturnThis(),
    sign: vi.fn().mockResolvedValue("mock-jwt-token"),
  })),
  jwtVerify: vi.fn(),
}));

const mockCookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const { createSession } = await import("@/lib/auth");

describe("createSession", () => {
  test("sets an httpOnly cookie with the auth token", async () => {
    await createSession("user-123", "test@example.com");

    expect(mockCookieStore.set).toHaveBeenCalledOnce();
    const [cookieName, , cookieOptions] = mockCookieStore.set.mock.calls[0];
    expect(cookieName).toBe("auth-token");
    expect(cookieOptions.httpOnly).toBe(true);
  });
});
