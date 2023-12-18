import  React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebase";
import { db } from '../../../../firebase';
import { query, addDoc, collection, onSnapshot, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import moment from "moment";
import tw from 'twrnc'
import { Button, Icon } from "@rneui/base";
import { async } from "@firebase/util";





const CalendrierModif = (props) => {

    const Navigation = useNavigation();

    // recuperation des donnes de route 
    const idDoc = props.route.params.idDoc
    const idDocUser = props.route.params.idDocUser

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
    

    const CalendarRef = useRef(null)
    
    ////*****//////////////// */
    const DisableDay = []
    ran.map( (dat) => (
        dat.Tab.map((d) => (
            DisableDay.push(d.jour)   
        ))
    ))
   

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
            
            PrDate = moment(PrDate).add(1, "day").format('yyyy-MM-DD')
            
             
        }
        console.log("jour", Tab)
        setRan([...ran, range])  
        
        console.log("raaann", ran)
        // ValideRan()
        CalendarRef.current.resetSelections()
        
    }

    const Sup = (d) => {
        
        let cc = []
        let cc2 = []
        let Tab
        console.log("ranSupp", ran)
        ran.map((dis, key) => {
            Tab = dis.Tab.filter(di => di.jour !== d)
            cc = [...cc, {Tab}]
            // cc2 = [...cc2, {Tab}]
        })
        
        console.log("Tab11111", cc)
        console.log("CC2", cc2)
        
        setRan(cc)
        // ValideRan()
    } 
    
    const ValideRan = async() => {
        // props.onChange(ran)
        // console.log("rang a valide", ran)

        try {
                
            if (ran) {
                
                
               await updateDoc(doc(db, `residences`, idDoc),{
                    Calendrier: ran,
                
                 })
               console.log("Calendrier ajouter")
            }

       
     

            } catch (e) {
                console.log(e)
            }
        


        Navigation.navigate('Residence')
    }
    // props.onChange(ran);

    // useEffect(() => (
    //     ValideRan()
    // ), [ran])



    return (

        <View style={tw`pt-10`}>
            <View style={tw` absolute  p-2`} >   
                <Icon  name="arrow-left-circle" type="feather" size={32} onPress={() => Navigation.goBack()} />
                
            </View>
            <View style={tw`items-center`}>
                <Text style={{ fontSize: 25, fontWeight: "600"}}> Calendier</Text>
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
                <View style={tw`items-center`}>
                    <Text style={{ fontSize: 20, fontWeight: "400"}}> Debut de jours:  {startDate}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "400"}}> Fin de jours:  {endDate}</Text>
                    {<Text style={{ fontSize: 20, fontWeight: "400"}}> nombre de jour : {NbreDate}</Text>}
                </View>
                {/* <Text> durrrr: {dur}</Text> */}
                 {/* { NbreDate ? <Text onPress={() => Ajout()}> Ajouter sur tableau</Text> : null } */}
                
                    <View style={tw`items-center`}>
                        <Button title="Ajouter au tableau"  onPress={() => Ajout()}
                        containerStyle={[tw`rounded-lg`]}
                        buttonStyle={[tw`bg-green-300`]}/>
                        {/* <Text onPress={() => [Ajout(), ValideRan()]}> Ajouter sur tableau</Text>  */}
                    </View>
                {/* { dispo.map((d, key) => (
                    <View key={key}>
                        <Text > du: {d.debut}</Text>
                        <Text > au: {d.fin}</Text> 
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


               
                    <View style={tw`pt-5`}>
                        {
                            ran.length != 0 ? 
                            <Button title="enregister" 
                            onPress={() => ValideRan()}/> : null 
                        }
                    </View>
            </View>
        </View>
    )
}



export default CalendrierModif;




const styles = StyleSheet.create({

})