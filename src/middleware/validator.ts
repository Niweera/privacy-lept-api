import crypto from "crypto";
import type {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { AuthenticationError } from "../errors";
import Keys from "../keys";

const verifyGetRequest: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { crc_token, nonce } = req?.query || {};
  const hostType: string | string[] = req.headers["privacy-lept-host-type"];
  const signature: string | string[] = req.headers["privacy-lept-signature"];

  if (!crc_token || !nonce || !hostType || !signature)
    throw new AuthenticationError("Required parameters are missing");

  const regex: RegExp = new RegExp(/(DESKTOP)|(MOBILE)/g);
  if (!regex.test(hostType.toString()))
    throw new AuthenticationError("Host type mismatches");

  const hmac: string = crypto
    .createHmac("sha256", Keys.SECRET)
    .update(`crc_token=${crc_token}&nonce=${nonce}`)
    .digest("base64");

  if (`sha256=${hmac}` !== signature)
    throw new AuthenticationError(
      "Request is not originated from Privacy-Lept"
    );

  next();
};

export default (app: Application): void => {
  app.get(`/`, verifyGetRequest);
};
