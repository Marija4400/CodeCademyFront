import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./api/slices/authSlice";
import parentReducer from "./api/slices/parentSLice";
import courseReducer from "./api/slices/courseSlice";
import courseCReducer from "./api/slices/childSlice";
import quizChildReducer from "./api/slices/quizChildSlice";
import childCourseSectionReducer from "./api/slices/childCourseSectionSlice";
import testChildReducer from "./api/slices/testChildSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isAuthenticated"], // Only persist these fields
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    parent: parentReducer,
    course: courseReducer,
    courseC: courseCReducer,
    quizChild: quizChildReducer,
    childCourseSection: childCourseSectionReducer,
    testChild: testChildReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
        ignoredPaths: ["_persist"], // Ignore the _persist field in state
      },
    }),
});

export const persistor = persistStore(store);
