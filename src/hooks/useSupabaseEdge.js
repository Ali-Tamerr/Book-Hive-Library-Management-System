import { useMutation } from "@tanstack/react-query";
import {
  checkBook,
  checkUser,
  startRegisterMode,
} from "../services/supabaseEdge.api";

export const useCheckBook = () => {
  return useMutation({
    mutationFn: ({ userId, bookCopyId }) => checkBook(userId, bookCopyId),
  });
};

export const useCheckUser = () => {
  return useMutation({
    mutationFn: (userId) => checkUser(userId),
  });
};

export const useStartRegisterMode = () => {
  return useMutation({
    mutationFn: ({ deviceId, bookId }) => startRegisterMode(deviceId, bookId),
  });
};
