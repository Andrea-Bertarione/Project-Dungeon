import { initServer } from "./src/server"

initServer((process.argv[2] == "debug"));