import  React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";


import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import { set } from "react-hook-form";
import { Button } from "@rneui/themed";

import tw from 'twrnc'




const Calendrier = (props) => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [dispo, setDispo] = useState([]);
    const [ran, setRan] = useState([]);
    const minDate = new Date();
    const startDate = selectedStartDate ? moment(selectedStartDate).format('yyyy-MM-DD') : '';
    const endDate = selectedEndDate ? moment(selectedEndDate).format('YYYY-MM-DD') : '' ;
    // const NbreDate = endDate ? moment(endDate).diff(startDate, 'day'): '';
    const NbreDate = moment(endDate).diff(startDate, 'day');
    const maxDate  = moment(minDate).add(3,'month').format('YYYY-MM-DD');
    // const rang = dispo ? moment(startDate).add
    // const dur = endDate ? moment().startOf(startDate, 'day').from(endDate, 'day'): "";
    // const [disable, setDisable] = useState([])
    // ran.map( (dat) => (
    //     dat.map((d) => (
    //         disable.push(d.jour,)
    //     ))
    // ))
    const CalendarRef = useRef(null)
    
    ////*****//////////////// */
    const DisableDay = []
    ran.map( (dat) => (
        dat.Tab.map((d) => (
            DisableDay.push(d.jour)   
        ))
    ))
    // const test = [
    // "2022-11-25",
    // "2022-11-26",
    // "2022-11-27",
    // "2022-11-28",
    // "2022-11-29",
    // "2022-11-30",]

    // const test2 = ['James', 'John', 'Paul', 'Ringo', 'George'];
    // pour le Css des date selecionne
    const CustumStyleDate = [] 
    ran.map( (dat) => (
        dat.Tab.map((d) => (
            CustumStyleDate.push({
                date: d.jour,
                style: {
                    backgroundColor: 'red'
                },
                textStyle: {
                    color: 'white'
                }, 
                containerStyle: {
                    // backgroundColor: 'red'
                },
                allowDisabled: true

            })
        ))
    ))

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
        let Tab = [] // Modif
        let nombre = 0
        let range = {}
        // let plus = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
        // if (PrDate < DrDate) {
        //     // setRange(PrDate)
        //     console.log('bon')
        //     // PrDate = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
        // }
        while (PrDate <= DrDate) {
            nombre = nombre + 1
            // console.log("bonnnnplus")
            console.log("PRR", PrDate)
            
            let rg = {
                "jour" : PrDate
            }
            
            console.log("eee", rg)
            Tab = [...Tab, rg] // Modif
            range ={
                Tab
            }
            // console.log("range", range)
            PrDate = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
            // nombre = nombre + 1
             
        }
        console.log("jour", Tab)
        setRan([...ran, range])  
        // if (endDate) {
            // let rang = {
            //     "debut" : startDate,
            //     "fin" : endDate 
            // }
            // setDispo([...dispo, rang])
        // }
        console.log("raaann", ran)
        ValideRan()
        CalendarRef.current.resetSelections()
        
    }

    const Sup = (d) => {
        // DisableDay.filter(j => j !== jour)
        // ran.filter(j => j.jour != d)
        // console.log('dd', d) 

        // setRan(ran.filter(tab1 => tab1.find(jo => jo.jour !==  d)))
        // DisableDay.filter(tab => tab != d)
        // console.log("filt", DisableDay)
        // console.lo
        // test.filter(tab => tab !== d.jour)
        // let franc = test2.filter(tab => tab == "James")
        // console.log("Dise", DisableDay)
        // let franc = DisableDay.filter(tab => tab !== d)
        // console.log("Desdd", DisableDay)
        // console.log("test", test)
        // console.log("test1222", test2)
        // console.log("franc", franc)
        // console.log("ddd", d)
        // if (d) {
        //     ran.map((m, key) => { 
        //         m.filter(dis => dis !== d)
        //     })
        // }
        let cc = []
        let Tab
        console.log("ranSupp", ran)
        ran.map((dis, key) => {
            Tab = dis.Tab.filter(di => di.jour !== d)
            cc = [...cc, {Tab}]
        })
        // console.log("cc", cc)
        console.log("Tab11111", cc)
        // let ccc = ran.filter(
        //     dis => {
        //        console.log("filtre", dis[0])
        //     }
        // )
        // console.log("ccc", ccc)
        // console.log("ccc", ccc)
        setRan(cc)
        ValideRan()
    } 
    
    const ValideRan = () => {
        props.onChange(ran)
    }
    // props.onChange(ran);

    useEffect(() => (
        ValideRan()
    ), [ran])

    return (
        <View>
            <View style={tw`items-center`}>
                
                <Text style={{fontWeight: "500"}}> Selection des jours ou la chambre est occupee</Text>
            </View>
            <CalendarPicker 
                ref={CalendarRef}
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor='blue'
                selectedDayTextColor="yellow"
                onDateChange={onDateChange}
                previousTitle="Precedent"
                nextTitle="Suivant"
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'sam', 'Dim']}
                months={['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Otobre', 'Novembre', 'Decembre']}
                customDatesStyles={CustumStyleDate}
                
                disabledDates={DisableDay} 
            />

            <View>
                <Text> Debut de jours:  {startDate}</Text>
                <Text> Fin de jours:  {endDate}</Text>
                {<Text> nombre de jour : {NbreDate}</Text>}
                {/* <Text> durrrr: {dur}</Text> */}
                 {/* { NbreDate ? <Text onPress={() => Ajout()}> Ajouter sur tableau</Text> : null } */}
                <View style={tw`items-center`}>
                    <Button 
                        title={"Ajouter sur tableau"}
                        onPress={() => [Ajout(), ValideRan()]}
                        buttonStyle={tw`bg-transparent border rounded-xl`}
                        titleStyle={{
                            color: "black"
                        }}
                        
                    />
                </View>
                {/* <Text onPress={() => [Ajout(), ValideRan()]}> Ajouter sur tableau</Text>  */}
                { dispo.map((d, key) => (
                    <View key={key}>
                        <Text > du: {d.debut}</Text>
                        <Text > au: {d.fin}</Text> 
                    </View>
                ))}
                {/* <Text>{ran.length}</Text> */}
                {/* { DisableDay.map((d, key) => (
                    <View key={key}>
                        <View key={key} style={tw`flex-row pt-2`}>
                                <Text> jour: {d}</Text>  
                                <Text style={tw`bg-red-300 ml-2`} onPress={() => Sup(d)}>Supprimer </Text>
                            </View>
                    </View>
                ))} */}

                
                { ran.map((d, key) => (
                    <View key={key}>
                        <View>
                            {/* <Text>jour {d.jour}</Text> */}
                            {d.Tab.map((r,key) => (
                            <View key={key} style={tw`flex-row pt-2`}>
                                <Text> jour: {r.jour}</Text>  
                                <Text style={tw`bg-red-300 ml-2`} onPress={() => Sup(r.jour)}>Supprimer </Text>
                            </View>
                            ))}
                        </View>
                    </View>
                ))}
                {console.log("teste obje", ran)}



                {/* <View>
                    <Text> ICICCI test filte</Text>
                    {DisableDay.map((t, key) => (
                        <View key={key} style={tw`flex-row`}> 
                            <Text> -{t} </Text>
                            <Text style={tw`bg-red-300 ml-2`} onPress={() => Sup(t)}>Supprimer </Text>
                        </View>
                    ))}
                </View> */}
            </View>
        </View>
    )
}


export default Calendrier; 




const Styles = StyleSheet.create({

})