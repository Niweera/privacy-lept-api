import request from "supertest";
import { app } from "../server";
import crypto from "crypto";
import Keys from "../keys";

describe("GET /", () => {
  it("Should return HTTP 204", async () => {
    const crc_token = crypto.randomBytes(32).toString("base64url");
    const nonce = crypto.randomBytes(32).toString("base64url");

    const hmac: string = crypto
      .createHmac("sha256", Keys.SECRET)
      .update(`crc_token=${crc_token}&nonce=${nonce}`)
      .digest("base64");

    const res = await request(app)
      .get("/")
      .query({ crc_token, nonce })
      .set("privacy-lept-host-type", "DESKTOP")
      .set("privacy-lept-signature", `sha256=${hmac}`);

    expect(res.statusCode).toBe(204);
  });
});
