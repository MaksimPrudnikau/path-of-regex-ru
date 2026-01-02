export type KeyOfType<Type, ValueType> = keyof {
  [Key in keyof Type as Type[Key] extends ValueType ? Key : never]: unknown;
};
