export function checkElementsClientRectDistance(
  wrapper: React.RefObject<HTMLElement>,
  targetElement: HTMLElement,
  distanceFromTargetToWrapper: number,
) {
  const wrapperLeft = wrapper?.current?.getBoundingClientRect().left;
  const targetLeft = targetElement.getBoundingClientRect().left;

  return (
    targetLeft - wrapperLeft! + distanceFromTargetToWrapper >=
    wrapper.current!.offsetWidth
  );
}
