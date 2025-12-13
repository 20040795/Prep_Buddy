export async function fetchCompanyLogo(name) {
  try {
    const domain = name.toLowerCase().replace(/\s+/g, "") + ".com";

    // 1) Try Clearbit (best)
    const clearbitUrl = `https://logo.clearbit.com/${domain}`;

    const clearbitRes = await fetch(clearbitUrl);

    if (clearbitRes.ok) {
      return clearbitUrl;
    }

    // 2) Try Google Favicon API
    const googleUrl = `https://www.google.com/s2/favicons?sz=256&domain=${domain}`;
    return googleUrl;

  } catch (err) {
    console.log("Logo fetch error:", err);

    // 3) Final fallback: JS generic avatar
    return "https://cdn-icons-png.flaticon.com/512/5968/5968292.png";
  }
}
