import { describe, expect, test } from "vitest";
import "./server";
import { User, UserData } from "../types";

let response: Response;

describe("Testing server status codes", () => {
  test("Should have response status 200 and correct Content type", async () => {
    response = await fetch("http://localhost:3000/api/users");

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });

  test("Should have response status 404 and corresponding error msg when using an unsupported method", async () => {
    response = await fetch("http://localhost:3000/api/users", {
      method: "PATCH",
    });
    const body = (await response.json()) as unknown as { error: string };

    expect(response.status).toBe(404);
    expect(body.error).toBe("The endpoint does not support this method.");
  });

  test("Should have response status 404 and corresponding error msg on incorrect endpoint", async () => {
    response = await fetch("http://localhost:3000/api/wrong-url");
    const body = (await response.json()) as unknown as { error: string };

    expect(response.status).toBe(404);
    expect(body.error).toBe("Wrong endpoint.");
  });
});

describe("Testing server's behaviour on CRUD", () => {
  const newUserData: UserData = {
    age: 18,
    hobbies: ["sit", "walk"],
    username: "Awesome user",
  };
  let savedUserRecord: User;

  test("Should return all records with a GET api/users request (an empty array is expected)", async () => {
    response = await fetch("http://localhost:3000/api/users");
    const body = (await response.json()) as unknown as object;

    expect(body).toEqual({ data: [] });
  });

  test("Should create new object by a POST api/users request", async () => {
    response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(newUserData),
    });
    const body = (await response.json()) as unknown as { data: User };
    savedUserRecord = { ...body.data };

    expect(body.data.age).toEqual(newUserData.age);
    expect(body.data.hobbies).toEqual(newUserData.hobbies);
    expect(body.data.username).toEqual(newUserData.username);
  });

  test("Should return all records with a GET api/users request (an array with one record expected)", async () => {
    response = await fetch("http://localhost:3000/api/users");
    const body = (await response.json()) as unknown as { data: User[] };

    expect(body.data.length).toEqual(1);
  });

  test("Should delete user's record with a DELETE api/users/{userId} request", async () => {
    response = await fetch(
      `http://localhost:3000/api/users/${savedUserRecord.id}`,
      { method: "DELETE" },
    );

    expect(response.status).toEqual(204);
  });

  test("Should answer that there is no such record with a GET api/users/{userId} request", async () => {
    response = await fetch(
      `http://localhost:3000/api/users/${savedUserRecord.id}`,
    );
    const body = (await response.json()) as unknown as { error: string };

    expect(response.status).toEqual(404);
    expect(body.error).toBe("User with provided UUID not found.");
  });
});
