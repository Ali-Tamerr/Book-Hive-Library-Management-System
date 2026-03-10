import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/Branches';

export const getBranchesManagementSummary = async () => {
    return await apiGet(`${BASE_ENDPOINT}/management`);
};

export const getBranches = async () => {
    return await apiGet(BASE_ENDPOINT);
};

export const createBranch = async (branch) => {
    return await apiPost(BASE_ENDPOINT, branch);
};

export const updateBranch = async (id, branch) => {
    return await apiPut(`${BASE_ENDPOINT}/${id}`, branch);
};

export const deleteBranch = async (id) => {
    return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};