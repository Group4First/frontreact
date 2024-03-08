import { Page, Document, Image, View, StyleSheet, Text } from '@react-pdf/renderer';
import { getPrintWork } from "../requests/getPrintObras";
import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import Logosena from "/Logosenapng.png";



export function Pdf({ idwork }) {

    const [info, setInfo] = useState([]);
    const [infopagos, setInfoPagos] = useState([]);

    useEffect(() => {
        async function imprimirpdfobras() {
            try {
                const infoprint = await getPrintWork(idwork);
                setInfo(infoprint);
                setInfoPagos(infoprint.listapagos)
                console.log("infoprint:" + infoprint);

            } catch (error) {
                console.log(error.message)
            }
        }
        imprimirpdfobras();
    }, []);

    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column', padding: 30 },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

        spaceAround: { flex: 1, flexDirection: 'row', alignItems: 'center' },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        logo: { width: 90 },

        reportTitle: { fontSize: 16, textAlign: 'center' },

        addressTitle: { fontSize: 16, fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoicetittle: { fontSize: 11, fontWeight: 'bold', marginTop: 2, color: '#787878' },

        invoicedata: { fontSize: 11, fontWeight: 'bold', marginTop: 2, color: '#000000' },

        address: { fontWeight: 400, fontSize: 10 },

        theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, flex: 1, height: 40, width: 70, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' },

        text: {
            fontStyle: 'bold',
            paddingTop: 4,
            flex: 1,
            height: '100%', // Ajusta el texto para ocupar todo el espacio vertical disponible
            width: 60,
            borderColor: 'whitesmoke',
            textAlign: 'center',
            verticalAlign: 'sub'
        },

        theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

        tbody: { fontSize: 9, paddingTop: 4, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1, alignItems: 'center' },

        total: { fontSize: 9, paddingTop: 4, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

        tbody2: { flex: 2, borderRightWidth: 1, },

        text2: { marginRight: 10 },

        image: {
            width: 50, // Ajusta el ancho según tus necesidades
            height: 50, // Ajusta la altura según tus necesidades
            marginTop: 10, // Opcional: ajusta el margen superior según tus necesidades
        },

        pagenumber: {
            position: 'absolute',
            bottom: 10, // Margen inferior de la página
            left: 10, // Margen izquierdo de la página
        },
    });

    const InvoiceTitle = () => (
        <View>
            <Image style={styles.image} src={Logosena}></Image>

            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Text style={styles.reportTitle}>Informe de pagos</Text>
                </View>
                <View>
                    <Text style={styles.invoicedata}>{new Date().toISOString().slice(0, 10)}</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Text style={styles.invoice}>{info.razonsocialemp}</Text>
                </View>
            </View>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceAround}>
                <View>
                    <Text style={styles.reportTitle}>Informacion de empresa</Text>
                    <Text style={styles.invoicetittle}>Tipo de documento</Text>
                    <Text style={styles.invoicetittle}>Numero identificacion</Text>
                    <Text style={styles.invoicetittle}>Ciiu</Text>
                    <Text style={styles.invoicetittle}>Actividad economica</Text>
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
                    <Text style={styles.invoicedata}>: {info.tipodocumentoemp}</Text>
                    <Text style={styles.invoicedata}>: {info.numidentificacionemp}</Text>
                    <Text style={styles.invoicedata}>: {info.ciiuemp}</Text>
                    <Text style={styles.invoicedata}>: {info.actividadeconomicaemp}</Text>
                    <Text style={styles.invoicedata}>: {info.municipioemp}</Text>
                    <Text style={styles.invoicedata}>: {info.faxemp}</Text>
                    <Text style={styles.invoicedata}>: {info.correoemp}</Text>
                    <Text style={styles.invoicedata}>: {info.telefonoemp}</Text>
                    <Text style={styles.invoicedata}>: {info.numescrituraconstitucionemp}</Text>
                    <Text style={styles.invoicedata}>: {info.numnotariaemp}</Text>
                    <Text style={styles.invoicedata}>: {info.ciudademp}</Text>
                    <Text style={styles.invoicedata}>: {info.fechaemp}</Text>
                </View>
            </View>
        </View>
    );

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.addressTitle}>Información de obras</Text>
                    <Text style={styles.invoicetittle}>{info.descripcion}</Text>
                </View>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.invoicedata}>Fecha de inicio</Text>
                    <Text style={styles.invoicetittle}>{info.fechainicio}</Text>
                    <Text style={styles.invoicedata}>Tipo</Text>
                    <Text style={styles.invoicetittle}>{info.tipo}</Text>
                </View>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.invoicedata}>Fecha de fin</Text>
                    <Text style={styles.invoicetittle}>{info.fechafin ? info.fechafin : "Aun no ha finalizado"}</Text>
                    <Text style={styles.invoicedata}>Estado</Text>
                    <Text style={styles.invoicetittle}>{info.estado}</Text>
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
                <Text>Tipo de pago</Text>
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
        infopagos.map((receipt) => (
            <Fragment key={receipt.id}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.tbody]}>
                        <Text >{receipt.fechapago}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{`${receipt.mes}-${receipt.anio}`}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.tipopago}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.numtrabajadores}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.valorfic}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.valorintereses}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.valortotal}</Text>
                    </View>
                </View>
            </Fragment>
        ))
    );


    const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text >Total</Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {info.valorfic ? info.valorfic.toFixed(2) : info.valorfic}
                </Text>
            </View>
            <View style={(styles.tbody)}>
                <Text>
                    {info.valorintereses ? info.valorintereses.toFixed(2) : info.valorintereses}
                </Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {info.valortotal ? info.valortotal.toFixed(2) : info.valortotal}
                </Text>
            </View>
        </View>
    );

    return (
        <Document>
            <Page wrap size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                
                <TableHead />

                <TableBody />
                <TableTotal />

            </Page>

        </Document>

    )
}