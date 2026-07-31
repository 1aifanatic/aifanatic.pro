import axios from "axios";

export default async function getRepoMetrics(repository, token) {
  try {
    const [owner, repo] = String(repository).split("/");
    if (!owner || !repo) return null;

    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "aifanatic.pro-portfolio",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await axios.get(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      { headers }
    );

    return {
      stars: Number(response.data?.stargazers_count) || 0,
      forks: Number(response.data?.forks_count) || 0,
      updatedAt: response.data?.updated_at || null,
    };
  } catch (error) {
    console.error(
      "Unable to load GitHub repository metrics:",
      error?.response?.data?.message || error?.message || error
    );
    return null;
  }
}
