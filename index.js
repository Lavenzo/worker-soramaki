export default {
  async fetch(request, env, ctx) {
    // Handle preflight CORS requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Handle GET requests (for fetching Sora Maki orders)
    if (request.method === "GET") {
      const gscriptGetURL = env.SORAMAKI_ORDERS_GET_URL;
      const resp = await fetch(gscriptGetURL);
      const result = await resp.text();
      return new Response(result, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    // Default: method not allowed
    return new Response("Method not allowed", { status: 405 });
  },
};
