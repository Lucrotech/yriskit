const FROM = process.env.EMAIL_FROM || "Y Risk It <noreply@yriskit.co.za>";

export async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[email:dev]", { to, subject });
    return { mocked: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    console.error("Resend error", await res.text());
  }
  return { mocked: false };
}

export function renewalHtml(name: string, company: string, renewsOn: string, url: string) {
  return `
    <div style="font-family:Georgia,serif;color:#1c1917;line-height:1.5">
      <p>Dear ${name},</p>
      <p>The Risk Management and Compliance Programme for <strong>${company}</strong> is due for review on <strong>${renewsOn}</strong>.</p>
      <p>FIC Guidance Note 7A requires an RMCP to remain current. Please log in to review and regenerate your programme.</p>
      <p><a href="${url}" style="background:#0e1b33;color:#c9a227;padding:10px 16px;text-decoration:none">Open your RMCP dashboard</a></p>
      <p>Y Risk It</p>
    </div>
  `;
}
