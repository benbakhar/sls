import fetch, { Response, FetchError } from 'node-fetch';

interface IFetchPageResponse {
  html: string;
  ok: boolean;
  status: number;
  statusText: string;
}

const parsePage = (response: Response): Promise<IFetchPageResponse> =>
  response.text().then(html => ({
    html,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  }))

const onSuccess = (response: IFetchPageResponse) => {
  if (!response.ok) {
    throw new FetchError(response.statusText, response.status.toString())
  }

  return response.html;
}

const onError = (error: FetchError) => {
  throw error
}

export default function fetchPage(url: string, options = {}): Promise<string> {
  return fetch(url, options)
    .then(parsePage)
    .then(onSuccess)
    .catch(onError)
}