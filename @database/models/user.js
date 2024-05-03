import { Model, Blueprint } from "@vendor/lib/database";

export default function section() {
  return Model(
    "Users",
    class extends Blueprint {
      constructor() {
        this.useId();
      }
      title = String();
      description = String();
      slug = String();
      active = Boolean();
    }
  );
}