const BASE_URL = "http://localhost:80";

const URL = {
    LOGIN_URL : "/auth/login",
    GOOGLE_OAUTH_CALLBACK_URL:"/auth/google/oauth/callback", // todo: change this to /auth/google/callback
    SIGNUP_URL: "/auth/register",
    HOME_URL : "/",
    BASE_URL : "http://localhost:80",
    REFRESH_URL:"/auth/refresh-token",
    SPECIES_SEARCH_URL : "/search",
    SPECIES_REACT_URL:"/search/result",
    MEDICINE_URL: "/search",
    LOCATION_SEARCH_URL : "/dev/search",
    DOC_URL: "https://github.com/mr2space/decipher/blob/stable_v1/README.md",
    DOWNLOAD_URL: "/app-download",
}


export default URL;