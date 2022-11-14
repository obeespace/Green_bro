import { fetchUser } from "../utils/fetchStorageData";

const userInfo = fetchUser()

export const initialState = {
    user: userInfo,
    items: []
}