import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AlertPage } from "../../alert/alert.page";
import { Intermediario } from "../../model/intermediario.model";
import { User } from "../../model/user.model";
import { Publicidad } from "../../model/publicidad.model";
import { AuthService } from "../../services/auth.service";
import { CargadorService } from "../../services/cargador.services";
import { ServidorCorreoService } from "../../services/servidorcorreo.service";
import { RouterPage } from "../../util/router.page";
@Component({
    selector: "app-bandeja",
    templateUrl: "bandeja.page.html",
    styleUrls: ["bandeja.page.scss"]
})
export class BandejaPage implements OnInit {
    user: User = JSON.parse(sessionStorage.getItem("userSession"));
    saldo: string = "0";
    creditosreportador: string = "0";
    garantiacobrada: string = "0";
    saldocreditocobrado: string = "0";
    cantidadcreditocolocado: string = "0";
    intermediario: Intermediario = new Intermediario();
    tipovideo: string;
    nombrevideo: string;
    optionuser: string;
    @ViewChild("videoPlayer") videoPlayer: ElementRef;
    @ViewChild("imgPlayer") imgPlayer: ElementRef;
    constructor(
        private cargador: CargadorService,
        private alertPage: AlertPage,
        private auth: AuthService,
        private cert: ServidorCorreoService
    ) {
        this.cargador.getCargador(1500);
    }

    ngOnInit() {


        this.auth.loginUser(this.user).then(
            (res) => {
                this.getIntermediarios();
                this.auth
                    .getAfs()
                    .collection("publicidad")
                    .doc("No6as123A15Xfy1tMMWkJq")
                    .get()
                    .subscribe((doc) => {
                        if (doc.exists) {
                            try {
                                let data = <Publicidad>doc.data();

                                this.tipovideo = data.tipovideo;
                                if (data.tipovideo === "mp4") {
                                    this.auth
                                        .getStorage()
                                        .ref(data.nombrevideo)
                                        .getDownloadURL()
                                        .subscribe((url) => {
                                            this.nombrevideo = url;
                                        });
                                }
                                if (data.tipovideo === "img") {
                                    this.auth
                                        .getStorage()
                                        .ref(data.nombrevideo)
                                        .getDownloadURL()
                                        .subscribe((url) => {
                                            this.imgPlayer.nativeElement.src =
                                                url;
                                        });
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
            },
            (error) => {
                if (error.status === 304) {
                } else if (error.status === 400) {
                    this.alertPage.presentAlert("Clave incorrecta.");
                } else {
                    this.alertPage.presentAlert(
                        `Clave o correo incorrectos. /${error.message}.`
                    );
                }
            }
        );
    }

    /**
 * Consulta Intermediario metodo unico software. 
 * Metodo principal:getDatesBetweenYear(startDate, endDate); 
 * @param startDate 
 * @param endDate 
 * @return dates[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
    getDatesBetweenYear(startDate, endDate) {
        const currentDate = new Date(startDate.getTime());
        const dates = [];
        while (currentDate <= endDate) {
            dates.push(currentDate.getFullYear());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    /**
    * Consulta Intermediario metodo unico software. 
    * Metodo principal:getIntermediarios(); 
    * @param user 
    * @return Intermediario[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
    getIntermediarios() {
        this.intermediario = new Intermediario();
        this.saldo = "0";
        this.creditosreportador = "0";
        this.saldocreditocobrado = "0";
        this.intermediario.optionsearchintermediario = "searchintermediario";
        this.intermediario.intermediarios = new Array<Intermediario>();
        var userToLogin = this.auth
            .getIntermediarios()
            .get()
            .subscribe((event) => {
                if (this.user.role === "Super Maestro") {
                    event.forEach((element) => {
                        let validate = true;
                        let intermediario: Intermediario = new Intermediario();
                        intermediario = JSON.parse(JSON.stringify(element.data()));
                        (intermediario.validatesaldocreditocobrado == undefined || intermediario.validatesaldocreditocobrado == null) ? validate = false : null;
                        if (validate) {
                            var datevalide = new Date(intermediario.validatesaldocreditocobrado.seconds * 1000)
                            var currentdate = new Date();
                            var dates: any[] = this.getDatesBetweenYear(datevalide, currentdate);
                            if(dates.length > 30){
                                this.auth.getAfsFire().collection("intermediarios").doc(intermediario.email).update({
                                    validatesaldocreditocobrado: new Date,
                                    saldocreditocobrado: 0
                                })  
                            }
                        } else {
                            this.auth.getAfsFire().collection("intermediarios").doc(intermediario.email).update({
                                validatesaldocreditocobrado: new Date
                            })
                        }
                        this.intermediario.intermediarios.push(
                            JSON.parse(JSON.stringify(element.data()))
                        );
                        return this.intermediario.intermediarios;
                    });
                } else if (this.user.role === "Intermediario") {
                    event.forEach((element) => {
                        let intermediario: Intermediario = new Intermediario();
                        intermediario = JSON.parse(
                            JSON.stringify(element.data())
                        );
                        if (intermediario.email === this.user.email) {
                            this.intermediario.intermediarios.push(
                                intermediario
                            );
                        }
                        return this.intermediario.intermediarios;
                    });
                } else if (this.user.role === "Maestro") {
                    event.forEach((element) => {
                        let intermediario: Intermediario = new Intermediario();
                        intermediario = JSON.parse(
                            JSON.stringify(element.data())
                        );
                        if (intermediario.nit === this.user.maestro) {
                            this.intermediario.intermediarios.push(
                                intermediario
                            );
                        }
                        return this.intermediario.intermediarios;
                    });
                }

                // Se eliminan los intermediarios que vienen vacios
                this.intermediario.intermediarios =
                    this.intermediario.intermediarios.filter((item) => {
                        return Object.keys(item).length !== 0;
                    });

                if (this.intermediario.intermediarios.length > 0) {
                    this.intermediario.intermediarios.forEach((element) => {
                        this.saldocreditocobrado = (
                            parseFloat(this.saldocreditocobrado) +
                            element.saldocreditocobrado
                        ).toString();
                        this.saldo = (
                            parseFloat(this.saldo) +
                            element.coberturacreditomora
                        ).toString();
                        this.creditosreportador = (
                            parseFloat(this.creditosreportador) +
                            element.cantidadgarantias
                        ).toString();
                        this.cantidadcreditocolocado = (
                            parseFloat(this.cantidadcreditocolocado) +
                            element.saldototal
                        ).toString();
                    });
                } else {
                    this.alertPage.presentAlert(
                        "Por favor ingresar intermediario."
                    );
                }
                return userToLogin;
            });
    }
    /**
    * Consulta Intermediario metodo unico software. 
    * Metodo principal:getIntermediarios(); 
    * @param user 
    * @return Intermediario[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
    generateReport() {
        this.intermediario.intermediarios.forEach((element) => {
            this.cert.getCert(element).subscribe(
                (response) => {
                    var res: any = response;
                    const byteCharacters = atob(res.response);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const file = new Blob([byteArray], {
                        type: "application/pdf"
                    });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                },
                (error) => console.log(error)
            );
        });
    }
}
