import type {
  GetInviteResponseBody,
  GetSessionResponse,
  PostInviteRequestBody,
  PostLoginRequest,
} from '@translation/api-types';
import ApiClient from './client';

export default class Auth {
  constructor(private readonly client: ApiClient) {}

  session(): Promise<GetSessionResponse> {
    return this.client.get({
      path: '/api/auth/session',
    });
  }

  login({ email, password }: PostLoginRequest): Promise<void> {
    return this.client.post({
      path: '/api/auth/login',
      body: { email, password },
    });
  }

  logout(): Promise<void> {
    return this.client.post({
      path: '/api/auth/logout',
    });
  }

  getInvite(token: string): Promise<GetInviteResponseBody> {
    return this.client.get({
      path: '/api/auth/invite',
      query: { token },
    });
  }

  acceptInvite({
    token,
    name,
    password,
  }: PostInviteRequestBody): Promise<void> {
    return this.client.post({
      path: '/api/auth/invite',
      body: { token, name, password },
    });
  }
}