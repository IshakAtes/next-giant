const formSubmitEndpoint =
  "https://formsubmit.co/ajax/e1bea07f132c79a6fcdbf67b4d43cf6c";
const recipient = "office@nextgiant.de";

function readField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const siteUrl = new URL(request.url).origin;
  const body = (await request.json()) as Record<string, unknown>;
  const name = readField(body.name, 120);
  const email = readField(body.email, 254);
  const message = readField(body.message, 5000);
  const inspirations = readField(body.inspirationswebsites, 2000);
  const website = readField(body.website, 200);

  if (website) return Response.json({ success: true });

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json(
      { error: "Bitte prüfen Sie Ihre Angaben." },
      { status: 400 },
    );
  }

  let response: Response;
  try {
    response = await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/`,
      },
      body: JSON.stringify({
        _subject: `Neue Projektanfrage von ${name}`,
        _template: "table",
        _captcha: "false",
        _honey: website,
        _url: `${siteUrl}/`,
        Name: name,
        "E-Mail": email,
        Projektanfrage: message,
        Inspirationswebsites: inspirations || "Keine angegeben",
      }),
    });
  } catch {
    return Response.json(
      { error: "Der E-Mail-Dienst ist momentan nicht erreichbar." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return Response.json(
      { error: "Die Anfrage konnte nicht versendet werden." },
      { status: 502 },
    );
  }

  const result = (await response.json()) as { success?: string | boolean };
  if (result.success === false || result.success === "false") {
    return Response.json(
      { error: `Die Anfrage an ${recipient} konnte nicht versendet werden.` },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
