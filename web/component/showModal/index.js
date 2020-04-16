import { getInstance } from "./modal";

let instance = null;
export function showModal(config) {
  if (!instance) {
    instance = getInstance(config);
  }
  instance.show(config);
}
