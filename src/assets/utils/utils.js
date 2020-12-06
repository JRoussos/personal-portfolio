const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

const invlerp = (x, y, a) => clamp((a - x) / (y - x));

const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const calculateDistance = (elem, mouseX, mouseY) => Math.floor(Math.sqrt(Math.pow(mouseX - (elem.getBoundingClientRect().left+(elem.clientWidth/2)), 2) + Math.pow(mouseY - (elem.getBoundingClientRect().top+(elem.clientHeight/2)), 2)));

export { lerp, clamp, invlerp, range, calculateDistance }