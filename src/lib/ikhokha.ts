import { createHmac } from "node:crypto";

const API = "https://api.ikhokha.com/public-api/v1/api/payment";

export type PaylinkRequest = {
  amountCents: number;
  description: string;
  externalTransactionId: string;
  successUrl: string;
  failureUrl: string;
  cancelUrl: string;
  callbackUrl: string;
};

export type PaylinkResult = {
  mock: boolean;
  paylinkId: string;
  paylinkUrl: string;
  externalTransactionId: string;
  raw?: unknown;
};

function jsStringEscape(str: string) {
  return str.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}

function sign(urlPath: string, body: string, secret: string) {
  const parsed = new URL(urlPath);
  const payload = jsStringEscape(parsed.pathname + body);
  return createHmac("sha256", secret.trim()).update(payload).digest("hex");
}

export function ikhokhaConfigured() {
  return Boolean(
    process.env.IKHOKHA_APP_ID &&
      process.env.IKHOKHA_APP_SECRET &&
      process.env.IKHOKHA_ENTITY_ID,
  );
}

export async function createPaymentLink(
  input: PaylinkRequest,
): Promise<PaylinkResult> {
  if (!ikhokhaConfigured()) {
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return {
      mock: true,
      paylinkId: `mock_${input.externalTransactionId}`,
      paylinkUrl: `${origin}/api/ikhokha/mock?tx=${encodeURIComponent(input.externalTransactionId)}`,
      externalTransactionId: input.externalTransactionId,
    };
  }

  const appId = process.env.IKHOKHA_APP_ID!;
  const appSecret = process.env.IKHOKHA_APP_SECRET!;
  const entityId = process.env.IKHOKHA_ENTITY_ID!;
  const mode = process.env.IKHOKHA_MODE === "live" ? "live" : "test";

  const request = {
    entityID: entityId,
    externalEntityID: entityId,
    amount: input.amountCents,
    currency: "ZAR",
    requesterUrl: input.successUrl,
    description: input.description,
    paymentReference: input.externalTransactionId,
    mode,
    externalTransactionID: input.externalTransactionId,
    urls: {
      callbackUrl: input.callbackUrl,
      successPageUrl: input.successUrl,
      failurePageUrl: input.failureUrl,
      cancelUrl: input.cancelUrl,
    },
  };

  const body = JSON.stringify(request);
  const signature = sign(API, body, appSecret);

  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "IK-APPID": appId.trim(),
      "IK-SIGN": signature.trim(),
    },
    body,
  });

  const json = (await res.json()) as {
    responseCode?: string;
    paylinkUrl?: string;
    paylinkID?: string;
    message?: string;
  };

  if (!res.ok || json.responseCode !== "00" || !json.paylinkUrl) {
    throw new Error(json.message || `iKhokha error (${res.status})`);
  }

  return {
    mock: false,
    paylinkId: json.paylinkID || input.externalTransactionId,
    paylinkUrl: json.paylinkUrl,
    externalTransactionId: input.externalTransactionId,
    raw: json,
  };
}

export function verifyWebhookSignature(rawBody: string, headerSign: string | null) {
  if (!ikhokhaConfigured()) return true;
  if (!headerSign) return false;
  const secret = process.env.IKHOKHA_APP_SECRET!;
  const expected = createHmac("sha256", secret.trim()).update(rawBody).digest("hex");
  return expected.toLowerCase() === headerSign.trim().toLowerCase();
}

export async function getPaymentStatus(paylinkId: string) {
  if (!ikhokhaConfigured()) {
    return { status: "PAID", paylinkID: paylinkId };
  }
  const appId = process.env.IKHOKHA_APP_ID!;
  const appSecret = process.env.IKHOKHA_APP_SECRET!;
  const url = `https://api.ikhokha.com/public-api/v1/api/getStatus/${encodeURIComponent(paylinkId)}`;
  const signature = sign(url, "", appSecret);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "IK-APPID": appId.trim(),
      "IK-SIGN": signature.trim(),
    },
  });
  return res.json() as Promise<{ status?: string; paylinkID?: string }>;
}
