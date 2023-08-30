import type {
  GetLanguageMembersResponseBody,
  GetLanguageResponseBody,
  GetLanguagesResponseBody,
  LanguageRole,
  PatchLanguageMemberRequestBody,
  PatchLanguageRequestBody,
  PostLanguageMemberRequestBody,
  PostLanguageRequestBody,
  StartLanguageImportStatusRequestBody,
} from '@translation/api-types';
import type ApiClient from './client';

export {
  GetLanguageResponseBody,
  GetLanguagesResponseBody,
  PatchLanguageRequestBody,
  PostLanguageRequestBody,
  StartLanguageImportStatusRequestBody,
};

export default class Languages {
  constructor(private readonly client: ApiClient) {}

  findAll(): Promise<GetLanguagesResponseBody> {
    return this.client.get({
      path: '/api/languages',
    });
  }

  async create(language: PostLanguageRequestBody): Promise<void> {
    await this.client.post({
      path: '/api/languages',
      body: language,
    });
  }

  async startImport(
    code: string,
    body: StartLanguageImportStatusRequestBody
  ): Promise<void> {
    await this.client.post({
      path: `/api/languages/${code}/import`,
      body,
    });
  }

  async importStatus(code: string): Promise<void> {
    await this.client.get({ path: `/api/languages/${code}/import` });
  }

  findByCode(code: string): Promise<GetLanguageResponseBody> {
    return this.client.get({
      path: `/api/languages/${code}`,
    });
  }

  async update(
    code: string,
    language: PatchLanguageRequestBody
  ): Promise<void> {
    await this.client.patch({
      path: `/api/languages/${code}`,
      body: language,
    });
  }

  findMembers(code: string): Promise<GetLanguageMembersResponseBody> {
    return this.client.get({
      path: `/api/languages/${code}/members`,
    });
  }

  inviteMember(
    code: string,
    request: PostLanguageMemberRequestBody
  ): Promise<void> {
    return this.client.post({
      path: `/api/languages/${code}/members`,
      body: request,
    });
  }

  updateMember(
    code: string,
    userId: string,
    roles: LanguageRole[]
  ): Promise<void> {
    const body: PatchLanguageMemberRequestBody = {
      roles,
    };
    return this.client.patch({
      path: `/api/languages/${code}/members/${userId}`,
      body,
    });
  }

  removeMember(code: string, userId: string): Promise<void> {
    return this.client.delete({
      path: `/api/languages/${code}/members/${userId}`,
    });
  }
}
