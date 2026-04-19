import axios from "axios";

/**
 * List public repos for a user (avoids Search API 10 req/hr limit and invalid `q=...+sort:` syntax).
 * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
 */
const buildReposUrl = (username) => {
  const params = new URLSearchParams({
    sort: "pushed",
    direction: "desc",
    per_page: "6",
  });
  return `https://api.github.com/users/${encodeURIComponent(username)}/repos?${params.toString()}`;
};

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;
    if (!username) {
      return [];
    }

    const url = buildReposUrl(username);
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "aifanatic.pro-portfolio",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await axios.get(url, { headers });
    const items = res.data;
    if (!Array.isArray(items)) {
      return [];
    }
    return items.slice(0, 6);
  } catch (err) {
    console.error(err?.response?.data ?? err?.message ?? err);
    return [];
  }
};

export default getLatestRepos;
