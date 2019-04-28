export class Utils {
    static urlService: string = "http://localhost:8084/CotacaoWeb/messagebroker/amf";
    static urlCEPService: string = "https://viacep.com.br/ws/";
    static urlCEPService2: string = "http://cep.republicavirtual.com.br/web_cep.php?cep=";


    public static check_cnpj(numcnpj: String): Object {
        let CNPJ: String = numcnpj;
        let erro: String = "";

        if (CNPJ == "00.000.000/0000-00") {
            return { status: false, message: "Preencha corretamente o número do C.N.P.J.!!!" };
        }

        /* verifica o posicionamento das mascaras */
        if ((CNPJ.charAt(2) != ".") || (CNPJ.charAt(6) != ".") || (CNPJ.charAt(10) != "/") || (CNPJ.charAt(15) != "-")) {
            return { status: false, message: "Preencha corretamente o número do C.N.P.J.!!!" };
        }

        /* verifica o tamanho do cnpj */
        if (CNPJ.length != 18) {
            return { status: false, message: "Preencha corretamente o número do C.N.P.J.!!!" };
        }

        /* retirar os caracteres da mascara */
        CNPJ = CNPJ.replace(".", "");
        CNPJ = CNPJ.replace(".", "");
        CNPJ = CNPJ.replace("-", "");
        CNPJ = CNPJ.replace("/", "");

        let a: any[] = [];
        let b: number;

        let c: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        for (let i = 0; i < 12; i++) {
            a.push(CNPJ.charAt(i));
            isNaN(b) ? b = 0 : b = b;
            b += parseInt(a[i]) * c[i + 1];
        }

        let x: number;
        x = (b % 11);

        if (x < 2) {
            a[12] = 0;
        } else {
            a[12] = 11 - x;
        }

        b = 0;

        for (let y = 0; y < 13; y++) {
            b += (a[y] * c[y]);
        }

        x = (b % 11);

        if (x < 2) {
            a[13] = 0;
        } else {
            a[13] = 11 - x;
        }

        if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])) {
            erro += "Digito verificador com problema!";
        }

        if (erro.length > 0) {
            return { status: false, message: `CNPJ Inválido : ${erro}` };
        }

        return { status: true, message: "" };
    }
}