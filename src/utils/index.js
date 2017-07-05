export function randomNumber ({ min = 0, max = 10 } = {}) {
    return Math.random() * (max - min + 1) + min;
}
