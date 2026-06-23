export async function pingIndexNow(url: string) {
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: window.location.hostname,
        key: "ibot-indexnow-key",
        keyLocation: `${window.location.origin}/ibot-indexnow-key.txt`,
        urlList: [url]
      })
    });
  } catch (e) {
    // Sessiz hata — hiçbir şey bozmaz
  }
}
