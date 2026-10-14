// Cloudflare Worker: leitet Flugdaten-Abfragen weiter und erlaubt sie für deine Seite.
export default {
  async fetch(req) {
    const u = new URL(req.url).searchParams.get("url") || "";
    const ok = /^https:\/\/(api\.adsb\.lol|opendata\.adsb\.fi|api\.airplanes\.live)\//.test(u);
    const cors = { "Access-Control-Allow-Origin": "*" };
    if (!ok) return new Response("Nicht erlaubt", { status: 400, headers: cors });
    const r = await fetch(u, { cf: { cacheTtl: 5 } });
    return new Response(r.body, { status: r.status, headers: { ...cors, "Content-Type": "application/json" } });
  }
};
