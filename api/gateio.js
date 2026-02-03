export default async function handler(req, res) {
  try {
    const r = await fetch(
      "https://api.gateio.ws/api/v4/futures/usdt/contracts"
    );

    if (!r.ok) {
      return res.status(r.status).json({ error: "Gate.io error" });
    }

    const data = await r.json();
    
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Cache-Control", "public, s-maxage=60");
    
    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}