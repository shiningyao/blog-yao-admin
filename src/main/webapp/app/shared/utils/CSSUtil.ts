const MILLISECONDS_MULTIPLIER = 1000;

export function getTransitionDurationFromElement(element: HTMLElement) {
    let transitionDuration = element.style.transitionDuration;
    const floatTransitionDuration = parseFloat(transitionDuration)

    if (!floatTransitionDuration) {
        return 0;
    }

    transitionDuration = transitionDuration.split(',')[0];

    return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
}