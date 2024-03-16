import { Page, Document, Image, View, StyleSheet, Text } from '@react-pdf/renderer';
import { getinitialdata } from "../requests/getReportsInitialdata";
import { getgraphicmoney } from "../requests/getReportsGraphicMoney";
import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import Logosena from "/Logosenapng.png";

export function PdfDashboard() {

    const [data, setData] = useState([]);
    const [dataempresas, setDataempresas] = useState([]);
    const [datadonaaportes, setDatadonaaportes] = useState([]);
    const [datadonacantidad, setDatadonacantidad] = useState([]);

    const [datagrafprincipalmeses, setDatagrafprincipalmeses] = useState([]);
    const [datagrafprincipalaños, setDatagrafprincipalaños] = useState([]);

    const [datagrafpagos, setDatagrafpagos] = useState([]);
    const [datatablausuarios, setDatatablausuarios] = useState([]);

    useEffect(() => {
        async function getreportfirst() {
            try {
                const datatra = await getinitialdata();
                setData(datatra)
                setDataempresas(datatra.infografempresasconaportes)
                setDatadonaaportes(datatra.infografcomposicionfic.infografxvalores)
                setDatadonacantidad(datatra.infografcomposicionfic.infografxnumero)

                const data = await getgraphicmoney(0);
                setDatagrafprincipalmeses(data.infomensualList);
            } catch (error) {
                if (error.status == 401) {
                    Cookies.remove('session')
                    activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }
            }
        }
        getreportfirst();
    }, []);



    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column', padding: 30 },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

        spaceAround: { marginRight: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

        titleContainer: { flexDirection: 'row', justifyContent: 'center' },

        reportTitle: { fontSize: 16, textAlign: 'center', fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoicetittle: { fontSize: 11, fontWeight: 'bold', color: '#787878' },

        invoicedata: { fontSize: 11, fontWeight: 'bold', color: '#000000', marginLeft: 10 },

        theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, flex: 1, height: 40, width: 70, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' },

        text: { fontStyle: 'bold', paddingTop: 4, flex: 1, height: '100%', width: 60, borderColor: 'whitesmoke', textAlign: 'center', verticalAlign: 'sub' },

        tbody: { fontSize: 9, paddingTop: 4, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center' },

        total: { fontSize: 9, paddingTop: 4, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

        image: { width: 50, height: 50, marginTop: 10, },

        pageNumber: { position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', color: '#787878' },
    });

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    var day = currentDate.getDate();

    // Formatear la fecha como "YYYY-MM-DD"
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;


    const Headerpdf = () => (
        <View>
            <Image style={styles.image} src={Logosena}></Image>

            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Text style={styles.invoice}>Reporte general</Text>
                </View>
                <View>
                    <Text style={styles.invoicedata}>{formattedDate}</Text>
                </View>
            </View>

        </View>
    );

    const Primaryinfo = () => (
        <View>
            <View style={[styles.titleContainer, { marginTop: 24 }]}>
                <View>
                    <Text style={styles.invoicetittle}>Total empresas</Text>
                    <Text style={styles.invoicetittle}>Total obras</Text>
                    <Text style={[styles.invoicetittle, { marginBottom: 15 }]}>Total empresas con obras activas</Text>

                    <Text style={styles.invoicetittle}>Total Recaudo fic</Text>
                    <Text style={styles.invoicetittle}>Total Recaudo intereses</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                    <Text style={[styles.invoicedata, { marginBottom: 15 }]}>: {data.empresasconobrasactivas}</Text>

                    <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                </View>
            </View>
        </View>
    );


    const Recaudofic = () => (
        <View style={{ marginTop: 15 }}>
            <View>
                <Text style={styles.reportTitle}>Informacion sobre el recaudo fic</Text>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por meses</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View style={styles.spaceAround}>
                    <View>
                        <Text>Mensual</Text>
                        <Text style={styles.invoicetittle}>Enero</Text>
                        <Text style={styles.invoicetittle}>Febrero</Text>
                        <Text style={styles.invoicetittle}>Marzo</Text>
                        <Text style={styles.invoicetittle}>Abril</Text>
                        <Text style={styles.invoicetittle}>Mayo</Text>
                        <Text style={styles.invoicetittle}>Junio</Text>
                        <Text style={styles.invoicetittle}>Julio</Text>
                        <Text style={styles.invoicetittle}>Agosto</Text>
                        <Text style={styles.invoicetittle}>Septiembre</Text>
                        <Text style={styles.invoicetittle}>Octubre</Text>
                        <Text style={styles.invoicetittle}>Noviembre</Text>
                        <Text style={styles.invoicetittle}>Diciembre</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        <Text style={styles.invoicedata}>: 1000000000</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View>
                        <Text>Presuntiva</Text>
                        <Text style={styles.invoicetittle}>Enero</Text>
                        <Text style={styles.invoicetittle}>Febrero</Text>
                        <Text style={styles.invoicetittle}>Marzo</Text>
                        <Text style={styles.invoicetittle}>Abril</Text>
                        <Text style={styles.invoicetittle}>Mayo</Text>
                        <Text style={styles.invoicetittle}>Junio</Text>
                        <Text style={styles.invoicetittle}>Julio</Text>
                        <Text style={styles.invoicetittle}>Agosto</Text>
                        <Text style={styles.invoicetittle}>Septiembre</Text>
                        <Text style={styles.invoicetittle}>Octubre</Text>
                        <Text style={styles.invoicetittle}>Noviembre</Text>
                        <Text style={styles.invoicetittle}>Diciembre</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    </View>
                </View>
                
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por ultimos 5 años</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View>
                    <Text style={styles.invoicetittle}>2024</Text>
                    <Text style={styles.invoicetittle}>2023</Text>
                    <Text style={styles.invoicetittle}>2022</Text>
                    <Text style={styles.invoicetittle}>2021</Text>
                    <Text style={styles.invoicetittle}>2020</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                </View>
            </View>
        </View>
    );

    const Topempresas = () => (
        <View style={{ marginTop: 15 }}>
            <View>
                <Text style={styles.reportTitle}>Empresas que mas han aportado al fic</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View>
                    <Text style={styles.invoicetittle}>{dataempresas.nombreempresa1}</Text>
                    <Text style={styles.invoicetittle}>{dataempresas.nombreempresa2}</Text>
                    <Text style={styles.invoicetittle}>{dataempresas.nombreempresa3}</Text>
                    <Text style={styles.invoicetittle}>{dataempresas.nombreempresa4}</Text>
                    <Text style={styles.invoicetittle}>{dataempresas.nombreempresa5}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>: {dataempresas.valoraportadoempresa1}</Text>
                    <Text style={styles.invoicedata}>: {dataempresas.valoraportadoempresa2}</Text>
                    <Text style={styles.invoicedata}>: {dataempresas.valoraportadoempresa3}</Text>
                    <Text style={styles.invoicedata}>: {dataempresas.valoraportadoempresa4}</Text>
                    <Text style={styles.invoicedata}>: {dataempresas.valoraportadoempresa5}</Text>
                </View>
            </View>
        </View>
    );

    const Composicionfic = () => (
        <View style={{ marginTop: 15 }}>
            <View>
                <Text style={styles.reportTitle}>Información sobre la composicion del fic</Text>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por Aportes</Text>
            </View>

            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View>
                    <Text style={styles.invoicetittle}></Text>
                    <Text style={styles.invoicetittle}>Mensual</Text>
                    <Text style={styles.invoicetittle}>A todo costo</Text>
                    <Text style={styles.invoicetittle}>Mano de obra</Text>
                    <Text style={styles.invoicetittle}>intereses</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}></Text>
                    <Text style={styles.invoicedata}>: {datadonaaportes.valormensual}</Text>
                    <Text style={styles.invoicedata}>: {datadonaaportes.valoratodocosto}</Text>
                    <Text style={styles.invoicedata}>: {datadonaaportes.valormanodeobra}</Text>
                    <Text style={styles.invoicedata}>: {datadonaaportes.valorintereses}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>{datadonaaportes.porcentadinmensual}%</Text>
                    <Text style={styles.invoicedata}>{datadonaaportes.porcentadinatodocosto}%</Text>
                    <Text style={styles.invoicedata}>{datadonaaportes.porcentadinmanoobra}%</Text>
                    <Text style={styles.invoicedata}>{datadonaaportes.porcentadinintereses}%</Text>
                </View>
            </View>

            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por Cantidad</Text>
            </View>

            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View>
                    <Text style={styles.invoicetittle}></Text>
                    <Text style={styles.invoicetittle}>Mensual</Text>
                    <Text style={styles.invoicetittle}>A todo costo</Text>
                    <Text style={styles.invoicetittle}>Mano de obra</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}></Text>
                    <Text style={styles.invoicedata}>: {datadonacantidad.conteonummensual}</Text>
                    <Text style={styles.invoicedata}>: {datadonacantidad.conteonumatodocosto}</Text>
                    <Text style={styles.invoicedata}>: {datadonacantidad.conteonummanodeobra}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>{datadonacantidad.porcentanummensual}%</Text>
                    <Text style={styles.invoicedata}>{datadonacantidad.porcentanumatodocosto}%</Text>
                    <Text style={styles.invoicedata}>{datadonacantidad.porcentanummanoobra}%</Text>
                </View>
            </View>

        </View>
    );

    const Pagosregistrados = () => (
        <View style={{ marginTop: 15 }}>
            <View>
                <Text style={styles.reportTitle}>Pagos registrados</Text>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por meses</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>

                <View style={styles.spaceAround}>

                    <View>
                        <Text style={styles.invoicetittle}>Enero</Text>
                        <Text style={styles.invoicetittle}>Febrero</Text>
                        <Text style={styles.invoicetittle}>Marzo</Text>
                        <Text style={styles.invoicetittle}>Abril</Text>
                        <Text style={styles.invoicetittle}>Mayo</Text>
                        <Text style={styles.invoicetittle}>Junio</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View>
                        <Text style={styles.invoicetittle}>Julio</Text>
                        <Text style={styles.invoicetittle}>Agosto</Text>
                        <Text style={styles.invoicetittle}>Septiembre</Text>
                        <Text style={styles.invoicetittle}>Octubre</Text>
                        <Text style={styles.invoicetittle}>Noviembre</Text>
                        <Text style={styles.invoicetittle}>Diciembre</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                        <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                        <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                        <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    </View>
                </View>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por ultimos 5 años</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View>
                    <Text style={styles.invoicetittle}>2024</Text>
                    <Text style={styles.invoicetittle}>2023</Text>
                    <Text style={styles.invoicetittle}>2022</Text>
                    <Text style={styles.invoicetittle}>2021</Text>
                    <Text style={styles.invoicetittle}>2020</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.invoicedata}>: {data.totalempresas}</Text>
                    <Text style={styles.invoicedata}>: {data.totalkobras}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorfictotalhis}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                    <Text style={styles.invoicedata}>: {data.sumavalorficintereses}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.reportTitle}>Usuarios en el sistema</Text>
            </View>
        </View>

    );


    const TableHead = () => (

        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader]}>
                <Text>Fecha de pago</Text>
            </View>


            <View style={styles.theader}>
                <Text style={styles.text}>Mes-año {'\n'} Pagado</Text>
            </View>


            <View style={styles.theader}>
                <Text style={styles.text}>N.º {'\n'}Trabajadores</Text>
            </View>

            <View style={styles.theader}>
                <Text>FIC</Text>
            </View>


            <View style={styles.theader}>
                <Text>Intereses</Text>
            </View>

            <View style={styles.theader}>
                <Text>Total</Text>
            </View>
        </View>
    );

    const TableBody = () => (

        <Fragment>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody]}>
                    <Text >{"Hola"}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{"Hola"}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{"Hola"}</Text>
                </View>

                <View style={styles.tbody}>
                    <Text>{"Hola"}</Text>
                </View>

                <View style={styles.tbody}>
                    <Text>{"Hola"}</Text>
                </View>

                <View style={styles.tbody}>
                    <Text>{"Hola"}</Text>
                </View>

            </View>
        </Fragment>

    );

    const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>

            <View style={styles.tbody}>
                <Text></Text>
            </View>
            <View style={styles.tbody}>
                <Text></Text>
            </View>

            <View style={styles.tbody}>
                <Text >Total</Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {"Hola"}
                </Text>
            </View>

            <View style={(styles.tbody)}>
                <Text>
                    {"Hola"}
                </Text>
            </View>

            <View style={styles.tbody}>
                <Text>
                    {"Hola"}
                </Text>
            </View>
        </View>
    );

    return (
        <Document>
            <Page wrap size="A4" style={styles.page}>
                <Headerpdf />
                <Primaryinfo />
                <Recaudofic />
                <Topempresas />
                <Composicionfic />
                <Pagosregistrados />
                <TableHead />
                <TableBody />
                <TableTotal />
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`} fixed />
            </Page>
        </Document>

    )
}