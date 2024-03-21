import React from "react";

export interface UserGame {
  id: number;
  avatar: string;
  name: string;
  bgColor?: string;
  score?: number;
}
[];

export const UserGamee: UserGame[] = [
  {
    id: 1,
    avatar: require("../../assets/avatar/AvatarD1.png"),
    name: "Dimasheru",
    score: 3000,
  },

  {
    id: 2,
    avatar: require("../../assets/avatar/AvatarD4.png"),
    name: "Navila_Ayu",
    score: 2000,
  },

  {
    id: 3,
    avatar: require("../../assets/avatar/avatar3.jpg"),
    name: "Molusca",
  },

  {
    id: 4,
    avatar: require("../../assets/avatar/avatar1.jpg"),
    name: "SahaAing",
  },

  {
    id: 5,
    avatar: require("../../assets/avatar/avatar5.jpg"),
    name: "Sandika",
  },
];