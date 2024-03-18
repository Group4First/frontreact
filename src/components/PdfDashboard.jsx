import { Page, Document, Image, View, StyleSheet, Text } from '@react-pdf/renderer';
import { getinitialdata } from "../requests/getReportsInitialdata";
import { getgraphicmoney } from "../requests/getReportsGraphicMoney";
import { getgraphicpays } from "../requests/getReportsGraphicPays";
import { getReportsUserPays } from "../requests/getReportsUserPays";


import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import Logosena from "/Logosenapng.png";

export function PdfDashboard({ setloading }) {

    const [data, setData] = useState([]);
    const [dataempresas, setDataempresas] = useState([]);
    const [datadonaaportes, setDatadonaaportes] = useState([]);
    const [datadonacantidad, setDatadonacantidad] = useState([]);

    const [datagrafprincipal1, setDatagrafprincipal1] = useState([]);
    const [datagrafprincipal2, setDatagrafprincipal2] = useState([]);
    const [datagrafprincipalmeses, setDatagrafprincipalmeses] = useState([]);
    const [datagrafprincipalaños, setDatagrafprincipalaños] = useState([]);

    const [datagrafpagos1, setDatagrafpagos1] = useState([]);
    const [datagrafpagos2, setDatagrafpagos2] = useState([]);
    const [datagrafpagosmeses, setDatagrafpagosmeses] = useState([]);
    const [datagrafpagosaños, setDatagrafpagosaños] = useState([]);

    const [datatablausuarios, setDatatablausuarios] = useState([]);

    useEffect(() => {
        async function getreportfirst() {
            try {
                // Realiza las solicitudes de fetch
                const datatra = await getinitialdata();
                setData(datatra)
                setDataempresas(datatra.infografempresasconaportes)
                setDatadonaaportes(datatra.infografcomposicionfic.infografxvalores)
                setDatadonacantidad(datatra.infografcomposicionfic.infografxnumero)

                const datames = await getgraphicmoney(0);
                setDatagrafprincipal1(datames);
                setDatagrafprincipalmeses(datames.infomensualList);

                const dataanio = await getgraphicmoney(1);
                setDatagrafprincipal2(dataanio);
                setDatagrafprincipalaños(dataanio.infoanualList);

                const datamespays = await getgraphicpays(0);
                setDatagrafpagos1(datamespays);
                setDatagrafpagosmeses(datamespays.infomensualList);

                const dataaniopays = await getgraphicpays(1);
                setDatagrafpagos2(dataaniopays)
                setDatagrafpagosaños(dataaniopays.infoanualList);

                const datauserpays = await getReportsUserPays(0, 0);
                setDatatablausuarios(datauserpays.reportinfo);

            } catch (error) {

            } finally {
                setloading(true); // Finaliza el indicador de carga una vez que se completan todas las solicitudes de fetch
            }
        }
        getreportfirst();
    }, []);



    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column', padding: 30 },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

        spaceAround: { marginRight: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 },

        titleContainer: { flexDirection: 'row', justifyContent: 'center' },

        reportTitle: { fontSize: 16, textAlign: 'center', fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoicetittle: { fontSize: 11, fontWeight: 'bold', color: '#787878' },

        invoicedata: { fontSize: 11, fontWeight: 'bold', color: '#000000', marginLeft: 10 },

        theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, flex: 1, height: 40, width: 70, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' },

        tbody: { fontSize: 9, paddingTop: 4, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center' },

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
            <View style={[styles.titleContainer, { marginTop: 15 }]}>
                <View>
                    <Text style={styles.invoicetittle}>Total empresas</Text>
                    <Text style={styles.invoicetittle}>Total obras</Text>
                    <Text style={[styles.invoicetittle, { marginBottom: 15 }]}>Total empresas con obras activas</Text>

                    <Text style={styles.invoicetittle}>Total Recaudo fic (con intereses)</Text>
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
                <Text style={styles.reportTitle}>Información sobre el recaudo fic</Text>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>{`Por meses (${datagrafprincipal1.anio})`}</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>

                <View style={styles.spaceAround}>
                    <View>
                        <Text>Mensual</Text>
                        {datagrafprincipalmeses.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.mes}>{receipt.mes}</Text>
                        ))}
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafprincipalmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>: {receipt.valorpagosme}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.spaceAround}>
                    <View>
                        <Text>Presuntiva</Text>
                        {datagrafprincipalmeses.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.mes}>{receipt.mes}</Text>
                        ))}


                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafprincipalmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>: {receipt.valorpagospr}</Text>
                        ))}
                    </View>
                    <View style={{ marginRight: 10, marginLeft: 15 }}>
                        <Text style={styles.invoicedata}>{'Total'}</Text>
                        {datagrafprincipalmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>  {receipt.valortotalpagos}</Text>
                        ))}
                    </View>
                </View>
            </View>

            <Text style={{ textAlign: 'center', marginTop: 10 }}>{`Total recaudo anual: ${datagrafprincipal1.totalrecaudoporaño}`}</Text>

            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por ultimos 5 años</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View style={styles.spaceAround}>
                    <View>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafprincipalaños.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.anio}>{receipt.anio}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Mensual'}</Text>
                        {datagrafprincipalaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 7 }]} key={receipt.anio}> {receipt.valorpagosme}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Presuntiva'}</Text>
                        {datagrafprincipalaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 7 }]} key={receipt.anio}> {receipt.valorpagospr}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Total por año'}</Text>
                        {datagrafprincipalaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 8 }]} key={receipt.anio}> {receipt.valortotalpagosanual}</Text>
                        ))}
                    </View>
                </View>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>{`Total recaudo de los últimos 5 años: ${datagrafprincipal2.valortotalhistorico}`}</Text>

        </View >
    );

    const Topempresas = () => (
        <View style={{ marginTop: 90 }}>
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
        <View style={{ marginTop: 25 }}>
            <View>
                <Text style={styles.reportTitle}>Información sobre la composición del FIC</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: 1, marginLeft: 60 }}>
                    <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                        <Text style={[styles.invoiceTitle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por Aportes</Text>
                    </View>
                    <View style={[styles.titleContainer, { marginTop: 10 }]}>
                        <View>
                            <Text style={styles.invoiceTitle}>Mensual</Text>
                            <Text style={styles.invoiceTitle}>A todo costo</Text>
                            <Text style={styles.invoiceTitle}>Mano de obra</Text>
                            <Text style={styles.invoiceTitle}>Intereses</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={styles.invoiceData}>: {datadonaaportes.valormensual}</Text>
                            <Text style={styles.invoiceData}>: {datadonaaportes.valoratodocosto}</Text>
                            <Text style={styles.invoiceData}>: {datadonaaportes.valormanodeobra}</Text>
                            <Text style={styles.invoiceData}>: {datadonaaportes.valorintereses}</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={styles.invoiceData}>{datadonaaportes.porcentadinmensual}%</Text>
                            <Text style={styles.invoiceData}>{datadonaaportes.porcentadinatodocosto}%</Text>
                            <Text style={styles.invoiceData}>{datadonaaportes.porcentadinmanoobra}%</Text>
                            <Text style={styles.invoiceData}>{datadonaaportes.porcentadinintereses}%</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, marginRight: 60 }}>
                    <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                        <Text style={[styles.invoiceTitle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por Cantidad</Text>
                    </View>
                    <View style={[styles.titleContainer, { marginTop: 10 }]}>
                        <View>
                            <Text style={styles.invoiceTitle}>Mensual</Text>
                            <Text style={styles.invoiceTitle}>A todo costo</Text>
                            <Text style={styles.invoiceTitle}>Mano de obra</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={styles.invoiceData}>: {datadonacantidad.conteonummensual}</Text>
                            <Text style={styles.invoiceData}>: {datadonacantidad.conteonumatodocosto}</Text>
                            <Text style={styles.invoiceData}>: {datadonacantidad.conteonummanodeobra}</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={styles.invoiceData}>{datadonacantidad.porcentanummensual}%</Text>
                            <Text style={styles.invoiceData}>{datadonacantidad.porcentanumatodocosto}%</Text>
                            <Text style={styles.invoiceData}>{datadonacantidad.porcentanummanoobra}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>


    );

    const Pagosregistrados = () => (
        <View style={{ marginTop:  5}}>
            <View>
                <Text style={styles.reportTitle}>Pagos registrados</Text>
            </View>
            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>{`Por meses (${datagrafpagos1.anio})`}</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>

                <View style={styles.spaceAround}>
                    <View>
                        <Text>Mensual</Text>
                        {datagrafpagosmeses.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.mes}>{receipt.mes}</Text>
                        ))}
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafpagosmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>: {receipt.numpagosme}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.spaceAround}>
                    <View>
                        <Text>Presuntiva</Text>
                        {datagrafpagosmeses.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.mes}>{receipt.mes}</Text>
                        ))}


                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafpagosmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>: {receipt.numpagospr}</Text>
                        ))}
                    </View>
                    <View style={{ marginRight: 10, marginLeft: 15 }}>
                        <Text style={styles.invoicedata}>{'Total'}</Text>
                        {datagrafpagosmeses.map((receipt) => (
                            <Text style={styles.invoicedata} key={receipt.valorpagosme}>  {receipt.numerospagostotalxmes}</Text>
                        ))}
                    </View>
                </View>
            </View>

            <Text style={{ textAlign: 'center', marginTop: 10 }}>{`Total de pagos registrados en el año: ${datagrafpagos1.totalporaño}`}</Text>

            <View style={[{ textAlign: 'center', marginTop: 10 }]}>
                <Text style={[styles.invoicetittle, { fontSize: 13, fontStyle: 'bold', color: '#000000' }]}>Por ultimos 5 años</Text>
            </View>
            <View style={[styles.titleContainer, { marginTop: 10 }]}>
                <View style={styles.spaceAround}>
                    <View>
                        <Text style={styles.invoicedata}>{' '}</Text>
                        {datagrafpagosaños.map((receipt) => (
                            <Text style={styles.invoicetittle} key={receipt.anio}>{receipt.anio}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Mensual'}</Text>
                        {datagrafpagosaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 7 }]} key={receipt.anio}> {receipt.numpagosmehis}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Presuntiva'}</Text>
                        {datagrafpagosaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 7 }]} key={receipt.anio}> {receipt.numpagosprhis}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.spaceAround}>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Text style={styles.invoicedata}>{'Total por año'}</Text>
                        {datagrafpagosaños.map((receipt) => (
                            <Text style={[styles.invoicetittle, { marginLeft: 8 }]} key={receipt.anio}> {receipt.numerospagostotalhis}</Text>
                        ))}
                    </View>
                </View>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>{`Total pagos de los ultimos 5 años: ${datagrafpagos2.totalhistorico}`}</Text>
            <View style={{ textAlign: 'center', marginTop: 100 }}>
                <Text style={styles.reportTitle}>Usuarios del sistema</Text>
            </View>
        </View>

    );


    const TableHead = () => (

        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader]}>
                <Text>Usuario</Text>
            </View>
            <View style={styles.theader}>
                <Text >Pagos realizados</Text>
            </View>
            <View style={styles.theader}>
                <Text >Empresas</Text>
            </View>
            <View style={styles.theader}>
                <Text>Total</Text>
            </View>
        </View>
    );

    const TableBody = () => (
        datatablausuarios.map((receipt) => (
            <Fragment key={receipt.id}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.tbody]}>
                        <Text >{receipt.usuario}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.pagos}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.empresas}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.valortotal}</Text>
                    </View>
                </View>
            </Fragment>
        ))
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
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`} fixed />
            </Page>
        </Document>

    )
}