export class UserAccountCreationData {
    /**
     * Instanciado na Controller.
     * 
     * Captura [request.body (tipo "any")] como um objeto tipado
     * contendo os dados que serão utilizados para as etapas de
     * validação e persistencia.
    */

    username: string;
    password: string;

    constructor(data: any){
        const { username, password } = data;
        this.username = username || "";
        this.password = password || "";
    }
}