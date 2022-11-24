import  React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";


import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import { set } from "react-hook-form";






const Calendrier = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [dispo, setDispo] = useState([]);
    const [ran, setRan] = useState([]);
    const minDate = new Date();
    const startDate = selectedStartDate ? moment(selectedStartDate).format('yyyy-MM-DD') : '';
    const endDate = selectedEndDate ? moment(selectedEndDate).format('YYYY-MM-DD') : '' ;
    // const NbreDate = endDate ? moment(endDate).diff(startDate, 'day'): '';
    const NbreDate = moment(endDate).diff(startDate, 'day');
    // const rang = dispo ? moment(startDate).add
    // const dur = endDate ? moment().startOf(startDate, 'day').from(endDate, 'day'): "";


    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date)
            // console.log(selectedEndDate);
            console.log("type", type);
            // console.log("dureee", dur)
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null)
            console.log("type", type);
        }
        
    }

    const Ajout = () => {
        let PrDate = startDate
        let DrDate = endDate
        let jour = []
        let nombre = 0
        // let plus = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
        // if (PrDate < DrDate) {
        //     // setRange(PrDate)
        //     console.log('bon')
        //     // PrDate = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
        // }
        while (PrDate <= DrDate) {
            
            // console.log("bonnnnplus")
            console.log("PRR", PrDate)
            
            let rg = {
                "jour" : PrDate
            }
            
            console.log("eee", rg)
            jour = [...jour, rg]
            
            // console.log("range", range)
            PrDate = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
            // nombre = nombre + 1
             
        }
        console.log("jour", jour)
        setRan([...ran, jour])  
        // if (endDate) {
            // let rang = {
            //     "debut" : startDate,
            //     "fin" : endDate 
            // }
            // setDispo([...dispo, rang])
        // }
        console.log("raaann", ran)
    }


    return (
        <View>
            <Text> Calendier</Text>
            <CalendarPicker 
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                todayBackgroundColor='blue'
                selectedDayTextColor="yellow"
                onDateChange={onDateChange}
                previousTitle="Precedent"
                nextTitle="Suivant"
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'sam', 'Dim']}
                customDatesStyles={[{
                    date: '2022-11-26',
                    style: {
                        backgroundColor: 'red'
                    },
                    textStyle: {
                        color: 'white'
                    }, 
                    containerStyle: {
                        backgroundColor: 'green'
                    }
                }]}
            />

            <View>
                <Text> Debut de jours:  {startDate}</Text>
                <Text> Fin de jours:  {endDate}</Text>
                {<Text> nombre de jour : {NbreDate}</Text>}
                {/* <Text> durrrr: {dur}</Text> */}
                 {/* { NbreDate ? <Text onPress={() => Ajout()}> Ajouter sur tableau</Text> : null } */}
                 { NbreDate ? <Text onPress={() => Ajout()}> Ajouter sur tableau</Text> : null }
                { dispo.map((d, key) => (
                    <View key={key}>
                        <Text > du: {d.debut}</Text>
                        <Text > au: {d.fin}</Text>
                    </View>
                ))}
                {/* <Text>{ran.length}</Text> */}
                { ran.map((d, key) => (
                    <View key={key}>
                        <View>
                            <Text>jour {d.jour}</Text>
                            {d.map((r,key) => (
                            <View key={key}>
                                <Text> jou:2 {r.jour}</Text> 
                            </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}


export default Calendrier; 




const Styles = StyleSheet.create({

})