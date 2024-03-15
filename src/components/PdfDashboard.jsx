import { Page, Document, Image, View, StyleSheet, Text } from '@react-pdf/renderer';
import { getPrintWork } from "../requests/getPrintObras";
import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import Logosena from "/Logosenapng.png";

export function PdfDashboard({ datainitialtra, datagraprincipaltra, datagrafpagostra, datatablausuariostra }) {

    const [data, setData] = useState([]);
    const [datagrafprincipal, setDatagrafprincipal] = useState([]);
    const [datagrafpagos, setDatagrafpagos] = useState([]);
    const [datatablausuarios, setDatatablausuarios] = useState([]);

    useEffect(() => {

        setData(datainitialtra);
        setDatagrafprincipal(datagraprincipaltra);
        setDatagrafpagos(datagrafpagostra);
        setDatatablausuarios(datatablausuariostra);

    }, [datainitialtra, datagraprincipaltra, datagrafpagostra, datatablausuariostra]);


    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column', padding: 30 },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

        spaceAround: { flex: 1, flexDirection: 'row', alignItems: 'center' },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        reportTitle: { fontSize: 16, textAlign: 'center', fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoicetittle: { fontSize: 11, fontWeight: 'bold', marginTop: 2, color: '#787878' },

        invoicedata: { fontSize: 11, fontWeight: 'bold', marginTop: 2, color: '#000000' },

        theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, flex: 1, height: 40, width: 70, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' },

        text: { fontStyle: 'bold', paddingTop: 4, flex: 1, height: '100%', width: 60, borderColor: 'whitesmoke', textAlign: 'center', verticalAlign: 'sub' },

        tbody: { fontSize: 9, paddingTop: 4, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center' },

        total: { fontSize: 9, paddingTop: 4, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

        text2: { marginRight: 10 },

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
                    <Text style={styles.reportTitle}>Hola1</Text>
                </View>
                <View>
                    <Text style={styles.invoicedata}>{formattedDate}</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Text style={styles.invoice}>{"Hola"}</Text>
                </View>
            </View>
        </View>
    );

    const Bussinfo = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceAround}>
                <View>
                    <Text style={styles.reportTitle}>Información de empresa</Text>
                    <Text style={styles.invoicetittle}>Tipo de documento</Text>
                    <Text style={styles.invoicetittle}>Numero identificación</Text>
                    <Text style={styles.invoicetittle}>Ciiu</Text>
                    <Text style={styles.invoicetittle}>Actividad económica</Text>
                    <Text style={styles.invoicetittle}>Municipio</Text>
                    <Text style={styles.invoicetittle}>Fax</Text>
                    <Text style={styles.invoicetittle}>Correo</Text>
                    <Text style={styles.invoicetittle}>Teléfono</Text>
                    <Text style={styles.invoicetittle}>Numero de escritura</Text>
                    <Text style={styles.invoicetittle}>Notaria</Text>
                    <Text style={styles.invoicetittle}>Ciudad notaria</Text>
                    <Text style={styles.invoicetittle}>Fecha de constitución</Text>
                </View>
                <View style={styles.text2}>
                    <Text>  </Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                    <Text style={styles.invoicedata}>: {"Hola"}</Text>
                </View>
            </View>
        </View>
    );

    const Workinfo = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.reportTitle}>Información de obra</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                    <Text style={styles.invoicedata}>Tipo</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                </View>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.invoicedata}>Fecha de inicio</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                    <Text style={styles.invoicedata}>Fecha fin aprox</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                </View>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.invoicedata}>Fecha fin real</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                    <Text style={styles.invoicedata}>Estado</Text>
                    <Text style={styles.invoicetittle}>{"Hola"}</Text>
                </View>
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
                <Bussinfo />
                <Workinfo />
                <TableHead />
                <TableBody />
                <TableTotal />
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`} fixed />
            </Page>
        </Document>

    )
}