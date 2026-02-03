export default async function handler(req, res) {
  try {
    const r = await fetch(
      "https://contract.mexc.com/api/v1/contract/ticker"
    );

    if (!r.ok) {
      return res.status(r.status).json({ error: "MEXC error" });
    }

    const data = await r.json();
    
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Cache-Control", "public, s-maxage=30");
    
    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
