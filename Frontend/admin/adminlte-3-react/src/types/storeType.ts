import store from "@app/store/store";

export type RootType = ReturnType<typeof store.getState>;
