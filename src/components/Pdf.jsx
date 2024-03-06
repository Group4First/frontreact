import { Page, Document, Image, StyleSheet, Text } from '@react-pdf/renderer';
import { getPrintWork } from "../requests/getPrintObras";
import { useState,useEffect } from 'react';



export function Pdf({idwork}) {

    const [info, setInfo] = useState('');

    useEffect(() => {
        async function imprimirpdfobras() {
           
                try {
                    const infoprint = await getPrintWork(idwork);
                    setInfo(infoprint);
                } catch (error) {
                    console.log(error.message)
                }
            
        }
        imprimirpdfobras();
    }, []);


    const styles = StyleSheet.create({
        page: { backgroundColor: 'yellow' },
        section: { color: 'white', textAlign: 'center', margin: 30 }
      });
      
    return (
        <Document>
            <Page>
                <Text style={styles.page}>{info.razonsocialemp}</Text>
                <Text>{info.tipodocumentoemp}</Text>
                <Text>{info.numidentificacionemp}</Text>
                <Text>{info.ciiuemp}</Text>
                <Text>{info.actividadeconomicaemp}</Text>
                <Text>{info.direccionemp}</Text>
                <Text>{info.municipioemp}</Text>
                <Text>{info.faxemp}</Text>
                <Text>{info.correoemp}</Text>
                <Text>{info.telefonoemp}</Text>
                <Text>{info.numescrituraconstitucionemp}</Text>
                <Text>{info.numnotariaemp}</Text>
                <Text>{info.ciudademp}</Text>
                <Text>{info.fechaemp}</Text>
                <Text>{info.descripcion}</Text>
                <Text>{info.tipo}</Text>
                <Text>{info.fechainicio}</Text>
                <Text>{info.fechafin}</Text>
                <Text>{info.estado}</Text>
                <Text>{info.valorfic}</Text>
                <Text>{info.valorintereses}</Text>
                <Text>{info.valortotal}</Text>
            </Page>
        </Document>
    );
}