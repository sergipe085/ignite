
import { Duplex } from "node:stream"
class OneToHundredReadStream extends Duplex {
    index = 1;

    _read() {
        const i = this.index++;

        
        if (this.index > 101) {
            this.push(null)
        }
        else {
            setTimeout(() => {
                const buf = Buffer.from(i.toString())
                this.push(buf)

            }, 100)
        }
    }

    _write() {

    }

    _final() {
        this.push(null)
    }
}

fetch("http://localhost:3334/", {
    method: "POST",
    body: new OneToHundredReadStream(),
    duplex: "half"
}).then(response => {
    return response.text();
}).then(data => console.log(data))