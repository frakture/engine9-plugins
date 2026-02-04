export async function waitForENReady(timeout = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (document.querySelector(".en__component")) return;
    await new Promise(r => setTimeout(r, 50));
  }
}
