import { type Accessor, createContext } from "solid-js";

export type ProfileControls = {
  profileNames: Accessor<string[]>;
  currentProfileName: Accessor<string>;
  addProfile: (name: string, duplicateFrom?: string) => void;
  editProfile: (name: string) => void;
  removeProfile: () => void;
  setCurrentProfile: (name: string) => void;
};

export const ProfileControlsContext = createContext<ProfileControls>({} as unknown as ProfileControls);
