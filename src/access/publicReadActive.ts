import type { Access } from "payload";

export const publicReadActive: Access = ({ req }) => {
  if (req.user) {
    return true;
  }

  return {
    isActive: {
      equals: true,
    },
  };
};
