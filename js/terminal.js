export class Terminal
{
    /** @type {HTMLDivElement} */
    body;
    
    /** @type {HTMLDivElement} */
    inputBody;
    
    /** @type {HTMLInputElement} */
    input;

    /** @type {Map<string, VoidFunction>} */
    commands = new Map();

    constructor()
    {
        this.body = document.getElementById("terminal-body");
        this.inputBody = document.getElementById("terminal-input-body");
        this.input = document.getElementById("terminal-input");

        document.body.addEventListener("keydown", (event) => this.handleKeyPress(event));
    }

    ready()
    {
        setTimeout(() => 
        {
            this.inputBody.style = "";
            this.focus();
        }, 250 + Math.random() * 750);
    }
    
    /**
     * 
     * @param {string} name 
     * @param {any} fn 
     */
    register(name, fn)
    {
        this.commands.set(name, fn);
    }

    clear()
    {
        this.body.innerText = "";
    }

    /**
     * 
     * @param {string} text 
     */
    print(text) 
    {
        this.printHtml(`${text}<br>`);
    }

    /**
     * 
     * @param {string} text 
     */
    printHtml(html) 
    { 
        this.body.innerHTML += html;
        this.focus();
    }

    focus()
    {
        this.input.focus();
        this.input.scrollIntoView();
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    handleKeyPress(event)
    {
        switch(event.key)
        {
            case "Enter":
                this.print(`$ ${this.input.value}`);

                if(this.input.value === "" || this.input.value === undefined)
                    break;

                const command = this.input.value.split(" ")[0];
                const fnptr = this.commands.get(command);
                switch(fnptr)
                {
                    case undefined:
                    case null:
                        this.print(`/usr/bin/4sh: ${command}: command not found`);
                        break;

                    default:
                        fnptr();
                        break;
                }

                this.input.value = "";
                break;

            case "C":
            case "c":
                if(!event.getModifierState("Control"))
                    break;
                
                this.print(`$ ${this.input.value}^C`);
                this.input.value = "";
                break;
        }

        this.focus();
    }
}