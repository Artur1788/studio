export function getName(name: string) {
  return name.split('/').slice(-1)[0].split('.')[0];
}
