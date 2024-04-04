import { Terminal } from "./terminal.js";

const terminal = new Terminal();
terminal.register("clear", () => terminal.clear());
terminal.register("whoami", async () => terminal.printHtml(await (await fetch("info/whoami.htm")).text()));
terminal.register("jobs", async () => terminal.printHtml(await (await fetch("info/jobs.htm")).text()));
terminal.register("blog", async () => terminal.printHtml(await (await fetch("info/blog.htm")).text()));
terminal.register("contact", async () => terminal.printHtml(await (await fetch("info/contact.htm")).text()));

setTimeout(async () => 
{
    terminal.clear();
    terminal.print("$ whoami");
    terminal.printHtml(await (await fetch("info/whoami.htm")).text());
    terminal.ready();
});