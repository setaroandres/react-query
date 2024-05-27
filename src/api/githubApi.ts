import axios from "axios";

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',//url constante para los api
  headers: {
    Authorization: 'Bearer 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'
  }
})
