/**
 *  Ler pequenas partes de alguma arquivo (video, musica) e usar esses dados para alguma coisa
 *  
 *  Exemplos:
 *  - Importacao de clientes via CSV
 *    . Sem stream: Ler todo o arquivo primeiro, depois passar por todas as informacoes do arquivo e salvar no banco de dados
 *    . Com stream: Processar o arquivo enquanto ele ainda estiver sendo enviado pelo servidor
 * 
 * 
 *  Readable Streams = Recebendo um arquivo
 *  Writable Streams = Enviando um arquivo
 */

import { Readable, Writable, Transform } from "node:stream"
 class OneToHundredReadStream extends Readable {
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
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(transformed.toString()));
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk) * 10);
        callback();
    }
}

new OneToHundredReadStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())