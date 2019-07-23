const frame = /** @type {HTMLIFrameElement} */ (document.querySelector("#content"));

frame.width = window.innerWidth
frame.height = window.innerHeight

const query = new URLSearchParams(location.search)

if (!query.has("url"))
{
    query.set("url", "https://www.example.com")
}

if (isNaN(Number(query.get("interval"))) || Number(query.get("interval") < 1000))
{
    query.set("interval", "10000")
}

window.history.replaceState(null, null, "?" + decodeURIComponent(query.toString()));

const src = decodeURIComponent(query.get("url"))

console.log(src)

const interval = Number(query.get("interval"))
const deviation = 0.25

console.log(interval)

function getRandomInterval()
{
    const dv = interval * deviation
    const r = getRandomInt(0, dv)
    return interval + (Math.random() >= 0.5 ? r : -r)
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

frame.src = src

let countdown = interval
let nextInterval = interval

setInterval(() =>
{
    frame.src = src

    nextInterval = getRandomInterval()
    countdown = nextInterval
}, nextInterval)

let previousTime = performance.now()

const counter = document.querySelector("#count-down")

function update()
{
    const now = performance.now()
    const deltaTime = now - previousTime
    previousTime = now

    countdown -= deltaTime
    counter.innerHTML = countdown <= 0 ? 0 : countdown

    requestAnimationFrame(update)
}

update()
